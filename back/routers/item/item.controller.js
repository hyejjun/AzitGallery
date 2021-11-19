const { sequelize, User, ItemInfo, ItemDetail, ItemImg, Auction, DirectDeal, AuctionHistory, Category, SubCategory} = require('../../models/index')
//const { generate_url } = require('../../s3')
const express = require('express')

const upload_pics = async (req, res) => {
    console.log('uploadpics')
    try{
        //const link = await generate_url();
        const link =`https://dfassf-bucket-test.s3.ap-northeast-2.amazonaws.com/a6304a2e2ef5267d43afd70bd668bea4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIATLYMKQDTTUOV4MEZ%2F20211119%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20211119T024827Z&X-Amz-Expires=900&X-Amz-Signature=be16c373e26c9805a816636f3910d6581da444a7e328affce9446da724c78f3d&X-Amz-SignedHeaders=host`
        console.log(link,'linkkkkkkkkkkkkkkkkkkkkkkk')
        res.json({ link })
    } catch(e) {
        console.log(e)
        let data = {result_msg: 'Fail', msg:'사진 업로드 실패'}
        res.json(data)
    }
}

const get_uploaded_pics = async (req, res) => {
    console.log("여기 =======",req.body)

}

const get_category = async (req, res) => {
    try{
        let get_category = await Category.findAll({})
        let get_subcategory = await SubCategory.findAll({})
        console.log('get_category')
        res.send([get_category, get_subcategory])
    }catch(e){
        console.log(e)
        let data = {result_msg: 'Fail', msg:'카테고리 정보 로드 실패'}
        res.send(data)
    }
}




module.exports = {
    upload_pics, get_uploaded_pics, get_category
}