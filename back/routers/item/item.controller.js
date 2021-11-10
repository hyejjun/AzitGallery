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

}

const upload_data = async (req, res) => {
   
}




module.exports = {
    upload_pics, get_uploaded_pics, upload_data
}