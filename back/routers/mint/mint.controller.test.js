/*

바디값을 받아온다
유저id를 받아온다

s3이미지 링크를 받아온다 -> s3에 업로드 하지 않고 fail띄울 수 있는 방법이 있을까?
ㄴ 이건 아이디어 좀..

getbalance가 제대로 개념이 잡혀야 하는데
현재 Invalid JSON RPC response: {"code":1010009,"message":"The credential you provided does not match in our record."} 
이런 오류가 나는 상태

우선 큰그림은 

1. 바디값으로 받아온 데이터들을 모두 배열에 넣고
2. result를 반환하는 토큰 발행 함수를 만들어(성공시 어드레스, 실패시 실패 유형 반환)
3. 제일 세부 항목들인 컬러 사이즈 항목들이 있는 배열에 대해 for loop을 돌려 토큰 발행을 한다
4. 오류로 인해 토큰 발행이 안되면 result에 어드레스가 떨어지지 않음

지금부터는 미완성인 부분(구상만)
next_step이라는 변수를 만들어 스위치로 이용할 예정
result 값을 넣는 배열을 만들어 위 for loop 중에 어드레스가 하나라도 undefined되면 next_step이 false가 되어 다음 단계인 db입력이 되지 않음
모두 성공적일 때만 진행

이 경우 문제점: 블록체인 상에는 전체 데이터의 일부가 등록되고 나머지는 등록되지 않게 처리가 되나, DB상으론 아예 등록이 되지 않은 것으로 처리됨. 판매자에게 큰 손해를 가져다줄 수 있음
해결법: getbalance 작동법을 제대로 파악하면 프론트에서 등록 버튼 눌렀을 때 getbalance를 이용하여 잔액 - color * size * gas 계산해서 처리하면 s3 이미지 전송도 막을 수 있음



*/

let mint_nft_post = async (req,res) => {
    let data // res.json 리턴용
    try{

        const {ifSell, price, currency, name, desc, itemType, color, size, aucPrice, aucTime, extension, gender, bigCategory, smallCategory, mainImgIdx} = req.body[0]

        const imagesLink = req.body[1]
        const mainImgLink = req.body[2]
        let sell_type
        ifSell == true ? sell_type = false : sell_type = true
        // 우선 유저아이디 받아오기
        let get_user_id = await User.findOne({
            where: {
                user_idx:1// from req.body
        }})

        // 이미지 링크, 현재로서는 어쩔 수 없이 이미지 링크를 넣어주어야 함
        let item_img_arr = []
        let item_img_obj = {}

        imagesLink.forEach(async x=> {
            item_img_obj = {item_img_link: x}
            item_img_arr.push(item_img_obj)
        })

        let item_color_size_arr = []
        // nft 만들 때 필요한 것: 아이템 이름, 색상, 컬러
        for(let i = 0; i<color.length; i++){
            for(let j = 0; j<size.length; j++){
                    // 색과 사이즈를 00~99로 해서 자릿수를 맞춰준다
                    let last_digits_for_detail
                    if(i == 0 && j == 0){
                        last_digits_for_detail = `00`
                    }else if(i*size.length+j<10){
                        last_digits_for_detail = `0${i*size.length+j}`
                    } else if(i*size.length+j>=10 || i*size.length+j+1<100){
                        last_digits_for_detail = `${i*size.length+j}`
                    }
                    // 아래 함수 인자값은 이름, 색상, 사이즈를 바탕으로 토큰 발행을 하기 위함이며
                    item_color_size_arr.push({
                        name: name,
                        color: color[i],
                        size: size[j],
                        item_last_digit: `${last_digits_for_detail}`,
                    })
            }
        }  
        console.log(item_color_size_arr,'item_color_size_arr')

        // 토큰발행함수
        // 본 함수에서 리턴되는 결과값은 result_msg : OK 또는 Fail
        // msg: 실패 이유, 성공시에는 nft 어드레스
        async function getNFT(name, color, size, link, quantity){
            let strname = String(name)
            let strcolor = String(color)
            let strsize = String(size)
            let strqty = String(quantity)
            let privateKey = "0x07ea3560faca009fdbaf6cee2ea6ee87aaf22bd1f381f3afd312e79ff45f122b" // DB에서 가져와야 함
            let accountAddress = "0x89e204fcbad4c4197a9e3971c7bb3c32f46cc458"
            let result = {
                result_msg: '',
                msg: ''
            }
            const keyring = caver.wallet.keyring.createFromPrivateKey(
                privateKey
            )
            if (!caver.wallet.getKeyring(keyring.address)) {
                const singleKeyRing = caver.wallet.keyring.createFromPrivateKey(
                    privateKey
                )
                caver.wallet.add(singleKeyRing)
            } 
            let kip17
            let next_step
            try{
                kip17 = await caver.kct.kip17.deploy(
                    {
                    name: `${strname}${strcolor}${strsize}${strqty}`,
                    symbol: 'EPI',
                    },
                    keyring.address
                )
                next_step = true
            } catch(e){
                let crop_error = e.toString().substr(23,42)
                if(crop_error == 'insufficient funds of the sender for value'){
                    next_step = false
                    result = {
                        result_msg: 'Fail',
                        msg: 'insufficient funds of the sender for value'
                    }
                    return result
                }
            }
            if(next_step == true){
                const kip_17 = new caver.kct.kip17(kip17.options.address)
                randomTokenID = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
                try {
                    console.log('try')
                    owner = await kip_17.ownerOf(randomTokenID)
                } catch (e) {
                    console.log('catch')
                    console.log("we can mint")
                    tokenURI = JSON.stringify({
                        name: strname,
                        color: strcolor,
                        size: strsize,
                        link: link,
                        strqty: `${strqty}`//`out of ${req.body.qty}`
                    })
                    mintResult = await kip_17.mintWithTokenURI(
                        accountAddress,
                        randomTokenID,
                        tokenURI,
                        { from: keyring.address }
                    ).then(async (data)=>{
                        result = {
                            result_msg: 'OK',
                            msg: 'NFTValue received',
                            nft: data.events.Transfer.address
                        }
                        console.log(data.events.Transfer.address)
                        return result
                    })            
                }
            } else{
                result = {
                    result_msg: 'Fail',
                    msg: 'Other errors occured'
                }
                return result
            }
        }

        // 이것들을 바탕으로 토큰이 발행되면
        // 리턴되는 nft값을 받아야 함
        
        // next_step이 true가 되어야 다음게 진행됨
        let next_step
        async function nft_working(){
            let arr_name = item_color_size_arr[i].name
            let arr_color = item_color_size_arr[i].color
            let arr_size = item_color_size_arr[i].size
            let arr_link = mainImgLink
            let arr_qty = item_color_size_arr[i].qty_idx

            for(let i = 0; i<color_size_item.length; i++){
                setTimeout(()=>{
                    // 동시에 실행되면 known transaction 오류가 나기 때문에 setTimeout을 통해 딜레이를 줌
                    // 500ms정도면 괜찮은 것 같음..
                    let result_nft = getNFT(arr_name, arr_color, arr_size, arr_link, arr_qty)
                    if(result_nft.result_msg == 'OK'){
                        next_step_test = true 
                    } else{
                        next_step_test = false 
                    }
                },500*i)
            }
        }

        // 여기부턴 DB에 넣는 작업 하면 되는데, 그 전에 겟밸런스부터 똑바로 해야 함

    } catch(e){
        console.log(e)
        data = {
            result_msg:'Fail',
            msg: e
        }
        res.json({data})
    }
}
