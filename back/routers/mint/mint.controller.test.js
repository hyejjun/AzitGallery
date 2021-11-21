let mint_nft_post = async (req,res) => {
    let data // res.json 리턴용
    try{
        /*
        수량 부분
        꼭 고려        
        */
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
