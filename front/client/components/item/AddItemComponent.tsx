import Styled from 'styled-components'
import React, { useState } from "react"
import SellType from './SellType'
import Agreement from './Agreement'
import CreateNftCh from './CreateNftCh'
import CancelNft from './CancelNft'
import Category from './Category'
import FileUpload from './FileUpload'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react"
import { MintNFT_REQUEST } from "../../reducers/mint";
import { RootState } from "../../reducers"
import axios from 'axios'
import { url } from '../../saga/url'
const AddItemComponent = () => {
    // 남은 NTF 등록 횟수 -> 느낌상 삭제해야 할 컴포넌트 같음
    const [n, setN] = useState<number>(10)
    // 즉판/경매 여부(하위 컴포넌트로 옮겨도 무방할 느낌)
    const [ifSell, setifSell] = useState<boolean>(true)
    // 시간 연장 여부 옵션
    const [extension, setExtension] = useState<boolean>(true)
    // 서비스 이용약관과 개인정보 보호정책 동의 여부 배열(둘 다 true여야 진행됨)
    const [agreed, setAgreed] = useState<Array<boolean>>([false, false])
    // 파일 정보가 담기는 state
    const [file, setFile] = useState<Array<string>>([])
    // 미리보기 렌더링을 위한 state
    const [fileBase, setFileBase] = useState<Array<string>>([])
    // 대표이미지 번호
    const [mainImgIdx, setMainImgIdx] = useState<number>(null)
    // 단위 통화 (won/ether)
    const [currency, setCurrency] = useState<string>('won')
    // 즉판 선택 시 가격 주의: string으로 들어감; input text는 string으로 받기 때문
    // 나중에 필요 시 Number()를 통해 속성 변환 가능
    const [price, setPrice] = useState<string>('')
    // 등록 상품명
    const [name, setName] = useState<string>('')
    // 상품 설명란
    const [desc, setDesc] = useState<string>('')
    // 경매 옵션 선택 시 경매 시작가
    const [aucPrice, setAucPrice] = useState<string>('')
    // 경매 마감 시간
    const [aucTime, setAucTime] = useState<any>('')
    // 색상 배열
    const [color, setColor] = useState<Array<string>>([])
    // 색상 입력값
    const [colorVal, setColorVal] = useState<string>('')
    //사이즈 배열
    const [size, setSize] = useState<Array<string>>([])
    // 사이즈 입력값
    const [sizeVal, setSizeVal] = useState<string>('')
    // 수량 배열
    const [qty, setQty] = useState<Array<string>>([])
    //수량 입력값
    const [qtyVal, setQtyVal] = useState<string>('')

    // 카테고리 배열 로드
    const [category, setCategory] = useState<Array<string>>([])
    const [loadCategory, setLoadCategory] = useState<boolean>(false)
    //카테고리 입력값들
    const [gender, setGender] = useState<string>('female')
    const [bigCategory, setBigCategory] = useState<string>('')
    const [smallCategory, setSmallCategory] = useState<string>('')

    const User = useSelector((state: RootState) => state.user);

    const [totalColorSizeQty, setTotalColorSizeQty] = useState<Array<string>>([])

    useEffect(() => {
        let categoryArr = []
        async function getCategory() {
            let result = await axios.post(`${url}/item/getcategory`)
            categoryArr.push(result.data)
            setLoadCategory(true)
        }
        getCategory().then(() => {
            setCategory(categoryArr[0])
        })
    }, [])
    useEffect(() => {
    }, [smallCategory, bigCategory])
    useEffect(() => {
        // 마지막 순서의 이미지 삭제시 대표사진을 하나 민다
        if (mainImgIdx + 1 > fileBase.length && mainImgIdx !== null) {
            setMainImgIdx(fileBase.length - 1)
            // 최초 화면 로드 시 대표사진 로드가 안되는 문제로
            // 파일 이미지 state에 항목이 있는데도 mainImgIdx가 null값인 경우
            // 강제로 인덱스를 0으로 설정하여 첫 사진이 대표 사진이 되도록 함
        } if (mainImgIdx == null && fileBase.length > 0) {
            setMainImgIdx(0)
        }
    }, [mainImgIdx, fileBase])

    useEffect(() => {

    }, [color, size, qty])

    // 띄어쓰기나 특수문자 포함되었는지 판단하는 함수
    function handleChk(txt) {
        // 특수문자(띄어쓰기 포함) 제외
        let chkLetters = /[a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
        // 입력된 값을 한자 한자 쪼개서 하나라도 특수문자가 있으면 false 리턴
        let text = txt.split('')
        let arr = []
        text.forEach(x => {
            arr.push(chkLetters.test(x))
        })
        let chk
        arr.find(ele => {
            if (ele == false) {
                chk = false
            } else { chk = true }
        })
        return chk
    }

    // input에 대한 handlechange(각 컴포넌트에서 텍스트를 인자값으로 받아
    // 각 컴포넌트마다 인자값에 따라 다르게 응답한다
    function handleTxtChange(e: any, item: string) {
        let { value } = e.target
        if (item == "file") {
            setFile(value)
        } else if (item == "price") {
            // isNaN의 결과값이 false인 경우는 숫자, true는 문자열 포함
            // 입력값에 따라 달라지는 것이지 string/integer와는 관계 없음. 
            // if (isNaN(value) !== false || handleChk(value) == false) {
            //     alert('숫자만 입력해주세요.')
            //     // 이유는 모르지만 value로 적으면 작동하지 않음(이하 나오는 경우도 동일)
            //     e.target.value = ''
            //     setPrice('')
            // } else {
            //     setPrice(value)
            // }
            setPrice(value)
        } else if (item == "name") {
            setName(value)
        } else if (item == "desc") {
            setDesc(value)
        } else if (item == "aucPrice") {
            // if (isNaN(value) !== false || handleChk(value) == false) {
            //     alert('숫자만 입력해주세요.')
            //     e.target.value = ''
            //     setPrice('')
            // }
            setAucPrice(value)
        } else if (item == "aucTime") {
            if (new Date(value) > new Date()) {
                setAucTime(value)
            } else {
                alert('현재보다 과거의 시간으로 설정할 수 없습니다.')
                e.target.value = aucTime
            }
        }
    }
    // 파일 업로드 핸들링+미리보기 핸들링
    const fileChange = (e: any) => {
        let { files } = e.target
        if (files.length + file.length > 10) { //추후 수정
            alert('한 번에 올릴 수 있는 파일 갯수는 최대 10개입니다.')
        } else {
            for (let i = 0; i < files.length; i++) {
                if (files[i]) {
                    setFile(newFile => [...newFile, files[i]])
                    let reader = new FileReader()
                    reader.readAsDataURL(files[i])
                    reader.onloadend = () => {
                        const base64 = reader.result
                        if (base64) {
                            let base64Sub = base64.toString()
                            setFileBase(imgBase64 => [...imgBase64, base64Sub])
                        }
                    }
                }
            }
        }
    }
    // 등록된 파일 삭제하는 핸들러
    function deleteFile(key: number) {
        if (confirm('정말 삭제하시겠습니까?')) {
            let newFileArray = [...file]
            let newFileBaseArray = [...fileBase]
            newFileArray.splice(key, 1)
            newFileBaseArray.splice(key, 1)
            setFile(newFileArray)
            setFileBase(newFileBaseArray)
        } else {
            console.log('취소')
        }
    }
    // 대표사진 클릭
    function setMainImage(index: number) {
        if (file.length > 0) {
            setMainImgIdx(index)
        }
    }
    // 직판/경매 선택
    const sellToggle = (value: boolean) => {
        setifSell(value)
    }
    // 경매 선택 시 연장 여부 선택
    const extensionToggle = (value: boolean) => {
        setExtension(value)
    }
    // 동의 항목 관련
    const ifAgreed = (value: number) => {
        if (value === 1) {
            setAgreed([!agreed[0], agreed[1]])
        } else if (value === 2) {
            setAgreed([agreed[0], !agreed[1]])
        }
    }
    // 통화 선택
    const handleCurrency = (e: any) => {
        let { value } = e.target
        setCurrency('klay')
    }
    // 옷 카테고리 선택
    function handleCategory(e: any, type: string) {
        let { value } = e.target
        if (type == "gender") {
            setGender(value)
        }
        if (type == "bigc") {
            setBigCategory(value)
        }
        if (type == "smallc") {
            setSmallCategory(value)
        }
    }
    // 사이즈, 컬러에 대한 onChange
    function handleTags(e: any, item: string) {
        let { value } = e.target
        // 컬러와 사이즈에서 입력받은 각각의 경우에 대해
        // 위의 유효성검사 함수 실행, false 리턴받으면 경고메시지 표출
        // 및 해당 값 밸류를 직전 state로 회귀시킴
        if (item == 'color') {
            if (handleChk(value) === false) {
                alert('특수문자나 띄어쓰기 없이 입력해 주세요.')
                e.target.value = colorVal
            } else {
                if (value.length > 30) {
                    alert('30자 이상 입력할 수 없습니다.')
                } else {
                    setColorVal(value)
                }
            }
        }
        else if (item == 'size') {
            if (handleChk(value) === false) {
                alert('특수문자나 띄어쓰기 없이 입력해 주세요.')
                e.target.value = sizeVal
            } else {
                if (value.length > 30) {
                    alert('30자 이상 입력할 수 없습니다.')
                } else {
                    setSizeVal(value)
                }
            }
        } else if (item == 'number') {
            if (isNaN(value) !== false || handleChk(value) == false) {
                alert('숫자만 입력해주세요.')
                // 이유는 모르지만 value로 적으면 작동하지 않음(이하 나오는 경우도 동일)
                e.target.value = ''
                setQtyVal('')
            } else { setQtyVal(value) }
        }
    }

    function addItem() {
        if (colorVal !== '' && sizeVal !== '' && qtyVal !== '') {
            let newColArr = [...color]
            let newSizeArr = [...size]
            let newQtyArr = [...qty]
            newColArr.push(colorVal)
            newSizeArr.push(sizeVal)
            newQtyArr.push(qtyVal)
            setColor(newColArr)
            setSize(newSizeArr)
            setQty(newQtyArr)
            setColorVal('')
            setSizeVal('')
            setQtyVal('')
        } else {
            alert('항목을 모두 입력해주세요.')
        }

        // color size qty 를 한번에 담은 배열 생성
        let copyArr = [...totalColorSizeQty]

        function colorSizeQty(color, size, qty) {
            this.color = color;
            this.size = size;
            this.qty = qty;
        }

        let bal = new colorSizeQty(colorVal, sizeVal, qtyVal)
        copyArr.push(bal)

        setTotalColorSizeQty(copyArr)

    }
    
    useEffect(()=>{
   
        
    },[totalColorSizeQty])


    function deleteItem(key: number) {
        let newColArr = [...color]
        newColArr.splice(key, 1)
        setColor(newColArr)
        let newSizeArr = [...size]
        newSizeArr.splice(key, 1)
        setSize(newSizeArr)
        let newQtyArr = [...qty]
        newQtyArr.splice(key, 1)
        setQty(newQtyArr)


        let copyArr = [...totalColorSizeQty]
        copyArr.splice(key,1)
        setTotalColorSizeQty(copyArr)
    }



    // 모든 value 최종 submit 전, 미입력 항목이 있는지 검증(nft관련 팝업 전 단계)
    const handleConfirm = () => {
        if (agreed[0] !== true || agreed[1] !== true) { //미동의시
            alert('모든 항목에 동의해주세요.')
            return false
        }
        else if ((ifSell === true &&
            (name == '' || desc == '' || price == '' || gender == '' ||
                bigCategory == '' || smallCategory == '' ||
                color.length == 0 || size.length == 0)) ||
            (ifSell === false &&
                (name == '' || desc == '' || aucPrice == '' || aucTime == '' || gender == '' ||
                    bigCategory == '' || smallCategory == '' ||
                    color.length == 0 || size.length == 0))) {
            alert('모든 칸을 입력해주세요.')
            return false
        } else if (file.length == 0) {
            alert('파일을 첨부해주세요.')
            return false
        } else if (mainImgIdx == null || mainImgIdx == undefined) {
            alert('대표 사진을 설정해 주세요.')
        } else {
            createNftCh()
            return true
        }
    }
    // 최종 밸류 submit, nft 팝업에서 예 누른 이후
    /* mint saga쪽에서 핸들링
    const handleSubmit = async () => { 
        let data = {}
        if(ifSell === true){
            data = {ifSell, price, currency, name, desc, gender, bigCategory, smallCategory, color, size, mainImgIdx}
            sendDataToServer([data,file])
            console.log(data,'handleSubmit')
        } else{
            data = {ifSell, name, desc, aucPrice, currency, aucTime, extension, gender, bigCategory, smallCategory, color, size, mainImgIdx}
            sendDataToServer([data,file])
            console.log(data,'handleSubmit')
        }
    }
    */
    /* mint saga쪽에서 핸들링
        function sendDataToServer(data:Array<any>){
            // s3에서 리턴받은 주소를 넣을 배열
            let fileArr = []
            // 이미지를 배열에 넣는 함수
            async function putImagesLink(){
                // data[1]의 파일들을 s3에 각각 올리고 업로드 주소값을 받아 배열에 넣는다
                let fileArray = data[1].map(async (items)=>{
                    const response = await fetch(`${url}/item/uploadpics`)
                    const { link, result_msg } = await response.json()
                    if(result_msg === undefined){
                        await fetch(link, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "multipart/form-data"
                            },
                            body: items
                        })
                        const imageURL = link.split('?')[0];
                        fileArr.push(imageURL)
                    } else{
                        // s3 업로드 실패 시 
                        alert('사진 업로드에 실패하였습니다. 잠시 후 다시 시도해주세요.')
                    }
                })
                // 모든 파일에 대해 값을 받아온 뒤 시행한다
                await Promise.all(fileArray)
            }
            // then으로 강제로 await을 시켜 전송
            putImagesLink().then(x=>{
                let result = axios.post(`${url}/item/uploaddata`,[data[0],fileArr])
                if(result.data.data.result_msg == "Fail" && result.data.data.msg == "잔액이 충분하지 않습니다"){
                    console.log('asd')
                }
            })
        }
    */
    // 새 NFT발행 시 그냥 새로고침 ->테스트 완료 후 주석 해제
    const resetState = () => {
        // window.location.reload() 
    }
    const dispatch = useDispatch()
    const mint = useSelector((state: RootState) => state.mint);
    const [nftCreateState, setnftCreateState] = useState<boolean>(false);
    const createNftCh = () => {
        setnftCreateState(prev => !prev)
    }

    const createNFTconfirmed = () => {
        let data = {}
        if (ifSell == true) {
            data = { ifSell, price, currency, name, desc, gender, bigCategory, smallCategory, totalColorSizeQty, mainImgIdx, userAddress:User.UserAddress}
        } else {
            data = { ifSell, name, desc, aucPrice, currency, aucTime, extension, gender, bigCategory, smallCategory, totalColorSizeQty, mainImgIdx, userAddress:User.UserAddress}
        }
        dispatch(MintNFT_REQUEST([data, file]))
    }
    const [cancelNft, setcancelNft] = useState<boolean>(false);
    const cancelNftCh = () => {
        setcancelNft(prev => !prev)
    }
    const closeBtn = () => {
        setcancelNft(false)
        setnftCreateState(false)
    }

    const ItemDetailRow = () => {

        // color, size, qty
        return (
            <>
                {color.map((x, k) => {
                    return (
                        <ItemDetailDiv key={k}>
                            <ItemDetailInserted>
                                {x}
                            </ItemDetailInserted>
                            <ItemDetailInserted>
                                {size[k]}
                            </ItemDetailInserted>
                            <ItemDetailInserted>
                                {qty[k]}
                            </ItemDetailInserted>
                            <AddRmvBtn onClick={() => deleteItem(k)}>-</AddRmvBtn>
                        </ItemDetailDiv>
                    )
                })}
            </>
        )
    }

    return (
        <>
            {nftCreateState
                ? < CreateNftCh
                    flag={nftCreateState}
                    closeBtn={closeBtn}
                    createNFTconfirmed={createNFTconfirmed}
                    resetState={resetState}
                /> : <></>}
            {cancelNft ? < CancelNft flag={cancelNft} closeBtn={closeBtn} /> : <></>}
            <TopWrapper>
                <BigTitle>
                    새로운 NFT 발행하기
                </BigTitle>
                <SectionWrapper>
                    <FileUpload
                        fileChange={fileChange}
                        fileBase={fileBase}
                        deleteFile={deleteFile}
                        setMainImage={setMainImage}
                        mainImgIdx={mainImgIdx}
                    />
                </SectionWrapper>
                <SectionWrapper>
                    <SellType
                        ifSell={ifSell}
                        extension={extension}
                        sellToggle={sellToggle}
                        extensionToggle={extensionToggle}
                        handleTxtChange={handleTxtChange}
                        handleCurrency={handleCurrency}
                    />
                </SectionWrapper>
                <SectionWrapper>
                    <SmallTitle>
                        이름
                    </SmallTitle>
                    <InputBox
                        onChange={(e) => handleTxtChange(e, "name")}
                    />
                </SectionWrapper>
                <SectionWrapper>
                    <Category
                        handleCategory={handleCategory}
                        category={category}
                        bigCategory={bigCategory}
                        smallCategory={smallCategory}
                    />
                </SectionWrapper>
                <SectionWrapper>
                    <SmallTitle>
                        제품별 상세 정보 입력
                    </SmallTitle>
                    <DescText>색상, 사이즈, 수량을 입력해 주세요.</DescText>
                    <SmallerTitle>색상 / 사이즈 / 수량 </SmallerTitle>
                    {ItemDetailRow()}
                    <ItemDetailBox
                        onChange={(e) => handleTags(e, "color")}
                        value={colorVal}
                        placeholder="색상"
                    />
                    <ItemDetailBox
                        onChange={(e) => handleTags(e, "size")}
                        value={sizeVal}
                        placeholder="사이즈"
                    />
                    <ItemDetailBox
                        onChange={(e) => handleTags(e, "number")}
                        value={qtyVal}
                        placeholder="수량"
                    />

                    <AddRmvBtn
                        onClick={addItem}
                    >+</AddRmvBtn>

                </SectionWrapper>
                <SectionWrapper>
                    <SmallTitle>
                        설명
                    </SmallTitle>
                    <TextBox
                        onChange={(e) => handleTxtChange(e, "desc")}
                    />
                </SectionWrapper>
            </TopWrapper>
            <Agreement
                ifAgreed={ifAgreed}
            />
            <BottomBtnWrapper>
                <LeftBtn onClick={() => { cancelNftCh() }}>취소</LeftBtn>
                <RightBtn onClick={() => { handleConfirm() }}>NFT 발행하기<br />(오늘{n}개 발행 가능)</RightBtn>
            </BottomBtnWrapper>
        </>
    )
}
export default AddItemComponent
const TopWrapper = Styled.div`
    width: 1000px;
    margin: 0 auto;
`
const SectionWrapper = Styled.div`
    margin-bottom: 50px;
    display: block;
`
const BigTitle = Styled.h3`
    font-size:42px;
`
const SmallTitle = Styled.h4`
    margin-top: 30px;
    font-size:24px;
    margin-bottom:20px;
    display: block;
`
const SmallerTitle = Styled.div`
    color:#2d3741; 
    font-size:20px;
    margin-top:20px;
    display: block;
    margin-bottom: 10px;
`
const DescText = Styled.div`
    color:gray;
    font-size:16px;
`
const InputBox = Styled.input`
    width: 690px;
    height: 30px;
    font-size: 25px;
    display: block;
    margin-bottom: 20px;
`

const ItemDetailBox = Styled.input`
    width: 150px;
    height: 30px;
    font-size: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
    float: left;
`

const ItemDetailDiv = Styled.div`
    width: 690px;
    height: 30px;
    font-size: 25px;
    display: block;
    margin-bottom: 20px;
`

const ItemDetailInserted = Styled.div`
    width: 154px;
    height: 30px;
    font-size: 25px;
    margin-right: 20px;
    margin-bottom: 20px;
    float: left;
`

const AddRmvBtn = Styled.div`
    width: 35px;
    height: 35px;
    background: lightgray;
    cursor: pointer;
    display: inline-block;
    padding: 2px 0 0 8px;
    font-size: 30px;
    box-sizing: border-box;
    margin-right: 10px;
    line-height: 28px;
`

const TextBox = Styled.textarea`
    width:690px;
    height: 200px;
    font-size : 22px;
`
const BottomBtnWrapper = Styled.div`
    display: block;
    margin-bottom: 50px;
    width:1150px;
    height: 100px;
    position: relative;
`
const LeftBtn = Styled.button`   
    background-color: #9597981f;
    border-radius:5px;
    width: 100px;
    height: 60px;
    border: none;
    outline: none;
    color: #2d3741;   
    position: absolute;
    left: 43%; 
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
`
const RightBtn = Styled.button`   
    background-color: #2d3741;
    border-radius:5px;
    width: 150px;
    height: 60px;
    border: none;
    outline: none;
    color: white;   
    position: absolute;
    left: 56%; 
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
`
const BarWrapper = Styled.div`
    padding-top: 20px;
    padding-left: 10px;
    width: 695px;
    display: block;
    overflow: hidden;
`
const ColorSizeItem = Styled.div`
    background: lightgray;
    padding: 5px 20px 5px 20px;
    margin-right: 10px;
    margin-bottom: 10px;
    float: left;
    display: block;
    position: relative;
    border-radius: 5px;
`
const CloseButton = Styled.div`
    position: absolute;
    right: -10px;
    top: -10px;
    width: 20px;
    height:20px;
    border-radius: 10px;
    background-color:white;
    padding-left:4px;
    line-height:23px;
    box-sizing: border-box;
    cursor: pointer;
    -ms-user-select: none; 
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    opacity: 0.6;
`