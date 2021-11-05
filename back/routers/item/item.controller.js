const { sequelize, ItemInfo, Item, } = require('../../models/index')
const { generate_url } = require('../../s3')
const express = require('express')

const upload_pics = async (req, res) => {
    const link = await generate_url();
    res.json({ link })
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
        let addToItem = await Item.create({
            creator: 1, // 나중에 로그인 정보 가져오게 하기
            gender: itemType,
            item_id: 1 // 나중에는 카테고리에서 가져오기? 근데 무슨 방법으로..
        }).then(async (newItem)=>{
            console.log(newItem,'newItem')
            let addToItemInfo = await ItemInfo.create({
                description: desc,
                title: name,
                sell_type
            })
        }).then(async (data)=>{
            console.log(data,'data')
        })
               
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