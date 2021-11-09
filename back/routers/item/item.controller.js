const { sequelize, User, ItemInfo, ItemDetail, ItemImg, Auction, DirectDeal, AuctionHistory} = require('../../models/index')
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
    // 나중에는 creator 도 가져와야함..
    const {ifSell, price, currency, name, desc, itemType, color, size, aucPrice, aucTime, extension} = req.body[0]
    //      bool    str    str       str   str    str      obj     obj   str       str      bool
    const imagesLink = req.body[1]
    let sell_type

    ifSell == true ? sell_type = false : sell_type = true

    // user_idx 받아오기
    let get_user_id = await User.findOne({
        where: {
            user_idx:1// from req.body
    }})

    // 일반구매일 때
    if(ifSell == true && get_user_id.length !== 0){
       // 받은 id로 item_info table에 추가
       let add_to_item_info = await ItemInfo.create({
            creator: get_user_id.dataValues.user_idx, 
            item_code: Number(`${new Date().getTime()}101`), // 임시로
            description: desc,
            title: name,
            sell_type,
            category_id: 1, // // 임시로
       })

       // direct deal에 추가하기
       let add_to_direct_deal = await DirectDeal.create({
            direct_deal_idx: add_to_item_info.dataValues.item_id,
            price: Number(price),
            currency
       })

       // 다시 생각해보기
       for(let i = 0; i<imagesLink.length; i++){
           console.log('asd')
           let add_to_item_img = await ItemImg.create({
               item_img_idx: add_to_item_info.dataValues.item_id,
               item_img_link: imagesLink[i]
           })
       }
       
       // 색과 사이즈 별로 넣기
       for(let i = 0; i<color.length; i++){
           for(let j = 0; j<size.length; j++){
                let add_to_item_detail = await ItemDetail.create({
                    item_detail_idx: i*size.length+j+1,  
                    item_info_idx: add_to_item_info.dataValues.item_id,
                    size:size[j],
                    color: color[i],
                    nft:`${Number(`${new Date().getTime()}101`)}${i}${j}${color[i]}`, // 임시로
                    qty:1 , //임시로
                    item_code:`${add_to_item_info.dataValues.item_code}${color[i]}${j}`, // 임시로
                    product_status:'ready' //임시로
                })    
           }
       }      
       
       res.send({
        success: true,
        msg: 'item 등록 성공'
    })
    
    } else if( ifSell == false && get_user_id.length !== 0){
        //경매일 때
        // 받은 id로 item_info table에 추가
       let add_to_item_info = await ItemInfo.create({
            creator: get_user_id.dataValues.user_idx, 
            item_code: Number(`${new Date().getTime()}101`), // 임시로
            description: desc,
            title: name,
            sell_type,
            category_id: 1,// 임시로
        })

        for(let i = 0; i<imagesLink.length; i++){
            let add_to_item_img = await ItemImg.create({
                item_img_idx: add_to_item_info.dataValues.item_id,
                item_img_link: imagesLink[i]
            })
        }

        // 경매 테이블에 데이터 넣기...
        // 경매는 디테일 테이블이 아니라 아이템인포 테이블로 한다
        
        let add_to_auction = await Auction.create({
            auction_idx: add_to_item_info.dataValues.item_id,
            end_date: aucTime,
            if_extended: extension,
        })

        // 경매 히스토리 최상단에도 넣어주어야 함
        let add_to_auction_history = await AuctionHistory.create({
            auc_history_idx: add_to_item_info.dataValues.item_id,
            bidder: get_user_id.dataValues.user_idx,
            bid_price: Number(aucPrice),
            currency
        })

        // 색과 사이즈 별로 넣기
        for(let i = 0; i<color.length; i++){
            for(let j = 0; j<size.length; j++){
                let add_to_item_detail = await ItemDetail.create({
                    item_detail_idx: i*size.length+j+1,  // item_detail_idx 넣기
                    item_info_idx: add_to_item_info.dataValues.item_id,
                    size:size[j],
                    color: color[i],
                    nft:`${Number(`${new Date().getTime()}101`)}${i}${j}${color[i]}`, //임시로
                    qty:1 , //임시로
                    item_code:`${add_to_item_info.dataValues.item_code}${color[i]}${j}`, //임시로
                    product_status:'ready' //임시로
                })    
            }
        }   
        
        res.send({
            success: true,
            msg: 'item 등록 성공'
        })

    } else{
        // get_user_id가 없는 경우. 다른 경우가 있다면 
        res.send({
            success: false,
            msg: '존재하지 않는 유저입니다. 로그인 상태를 다시 확인해주세요.'
        })
    }
}




module.exports = {
    upload_pics, get_uploaded_pics, upload_data
}