const { sequelize, User, ItemInfo, ItemDetail, ItemImg, Auction, DirectDeal, AuctionHistory, Category, SubCategory} = require('../../models/index')
const { generate_url } = require('../../s3')
const express = require('express')

const upload_pics = async (req, res) => {
    try{
        const link = await generate_url();
        res.json({ link })
    } catch(e) {
        console.log(e)
        let data = {result_msg: 'Fail', msg:'사진 업로드 실패'}
        res.json(data)
    }
}


const get_category = async (req, res) => {
    try{
        let get_category = await Category.findAll({})
        let get_subcategory = await SubCategory.findAll({})
        res.send([get_category, get_subcategory])
    }catch(e){
        console.log(e)
        let data = {result_msg: 'Fail', msg:'카테고리 정보 로드 실패'}
        res.send(data)
    }
}




module.exports = {
    upload_pics,
    get_category
}