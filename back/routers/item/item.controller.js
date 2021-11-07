const { sequelize, ItemInfo, Item, ItemDetail, ItemImg, } = require('../../models/index')
const { generate_url } = require('../../s3')
const express = require('express')

const upload_pics = async (req, res) => {
    console.log('uploadpics')
    const link = await generate_url();
    res.json({ link })
    console.log('link')
}

const get_uploaded_pics = async (req, res) => {
    console.log("여기 =======",req.body)
    res.json({success: true})
}

const upload_data = async (req, res) => {
    console.log("여기2 =======",req.body)
    // 나중에는 creator 도 가져와야함..
    const {ifSell, price, currency, name, desc, itemType, color, size, aucPrice, aucTime, extension} = req.body[0]
    const imagesLink = req.body[1]
    let sell_type
    console.log(ifSell, price, currency, name, desc, itemType, color, size, aucPrice, aucTime, extension)
    console.log(imagesLink)
    
    ifSell == true ? sell_type = false : sell_type = true
    
    if(ifSell == true){
        // 일반구매일 때

        // item 추가시
        /*
        대분류: item 중분류:item_info 소분류: item_detail
        item table: 상품의 큰 정보를 넣는다. color 등에 따라 디테일이 달라질 수 있음
        creator: user_idx넣는다. // user_idx랑 엮임
        item_id: category의 idx랑 엮이지만 item_id가 더 하위 개념, category id는 하나, item_id는 여러개가 붙을 수 있음
        item_id: item_info_idx 랑 엮이지만 item_id가 더 상위 개념 item_id는 하나, item_info_idx는 여러개가 붙을 수 있음
        gender: gender 받아온거 넣는다
        item_code: 어디서 받아옴?
        
        item_info table: 경매테이블과 엮임.
        item_info_idx: item_detail 테이블과 엮임
        description, title, reg, sell_type: 대충 정보
    
        item_detail table: 아이템의 디테일을 넣는다.
        item_detail:idx: nft_img_idx랑 엮임.
        item_info_idx: item_info 테이블의 인덱스와 엮임.
        size, color: 사이즈와 컬러별로 for문돌려서 하나씩 만들어줌
        nft: 이것들을 바탕으로 코드를 만들어 줄 것임.
        
        */

        // item table에 우선 추가
       let add_to_item = await Item.create({
           creator: 1, // 나중에 로그인 정보 가져오게 하기
           item_code: itemType,
       })

       // 받은 id로 item_info table에 추가
       let add_to_item_info = await ItemInfo.create({
           item_info_idx: add_to_item.dataValues.item_id,
           description: desc,
           title: name,
           sell_type
       })

       for(let i = 0; i<add_to_item_info.length; i++){
           let add_to_item_img = await ItemImg.create({
               item_img_idx: add_to_item.dataValues.item_id,
               item_img_link: imagesLink[i]
           })
       }

       for(let i = 0; i<color.length; i++){
           for(let j = 0; j<size.length; j++){
                let add_to_item_detail = await ItemDetail.create({
                    item_info_idx: add_to_item.dataValues.item_id,
                    item_detail_idx: 1 ,//auto_increment 아닌가
                    size:size[j],
                    color: color[i],
                    nft:`${i}${j}${i+j}${color[i]}`, //임시로
                    qty:1 , //임시로
                    item_code:`${i}${j}${i+j}${color[i]}`, //임시로
                    product_status:'ready' //임시로
                })    
           }
       }

               
    } else{
        //경매일 때
        let addToItemInfo = 
        
        
        await ItemInfo.create({
            description: desc,
            title: name,
            sell_type
        }).then(()=>{
            console.log(addToItemInfo)
        })
    }











    // let result = {};
    // try {
    //     await Board.create({ creator: 'youki', title: name, price})
    //     result = {
    //         result: 'OK',
    //         msg: 'NFT 성공'
    //     }
    //     let resu =  await Board.findAndCountAll({})
    //     await Like.create({likeBoardIdx:resu.count})
    // } catch (error) {
    //     console.log(error)
    //     result = {
    //         result: 'Fail',
    //         msg: 'NFT 실패..'
    //     }
    // }
    // res.json(result)
    res.send({zzz:'zzz'})
}




module.exports = {
    upload_pics, get_uploaded_pics, upload_data
}