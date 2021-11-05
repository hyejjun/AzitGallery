const axios = require('axios');
const qs = require('qs');
const nodemailer = require('nodemailer');
const smtpTransporter = require('nodemailer-smtp-transport');
require('dotenv').config()
const { auction, deliver, item, user } = require("../../models");
const { User, Seller } = require('../../models')


/* 이메일 보내기 */

let seller_admin = async (req,res) => {
    console.log('왓다')
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: "simbianartist@gmail.com", //generated ethereal user
            pass: "epiteomqkaae135", //generated ethereal password 
        }
    });

    let url = `http://localhost:3000/admin/approvebtn`;
    let options = {
        from: 'simbianartist@gmail.com',
        to:'simbianartist@gmail.com',//임시로, 나중에는 body에서 가져오게끔한다
        subject: '이메일 인증 완료를 위해 아래 url을 클릭해주세요.',
        html: `서영님, 안녕하세요. <br/>이메일 인증을 위해 아래 URL을 클릭해주세요. <br/> ${url}`
    }

    transporter.sendMail(options, function (err, res) {
        if (err) {
            console.log(err)
        } else {
            console.log('email has been successfully sent.');
        }
        transporter.close();
    })


}






// let signup_post = async (req,res) => {
//     console.log('this is body')
//     let key = Object.keys(req.body)
//     let keyObject = JSON.parse(key)
//     let { NickName, Address,Email} = keyObject
//     console.log(keyObject)
//     console.log(keyObject.NickName)
//     console.log(keyObject.Address)
//     console.log(keyObject.Email)
//     let result
//     try{
//         await User.create({name:NickName,email:Email,kaikasAddress:Address})
//         result = {
//             result:'OK',
//             msg:'가입 성공'
//         }
//     }catch(e){
//         console.log(e)
//         result = {
//             result:'FAIL',
//             mas:'가입 실패'
//         }
//     }
//     res.json(result)
// }

/* 회원가입 */

let signup_post = async (req,res) => {
    
    console.log('this is body')
    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)
    console.log(keyObject)
    let name = keyObject.NickName
    let kaikas_address = keyObject.Address
    let email = keyObject.Email
    let join_date = new Date()
    let contact = '일단 비움'
    let address = '일단 비움'
    let kycAuthorized = 0

    console.log(keyObject.NickName)
    console.log(keyObject.Address)
    console.log(keyObject.Email)

    let result = await User.create({name,kaikas_address,contact,address,join_date,email})
    console.log(result)

}

/* 이미 회원가입 했는지, 아니면 새로운 회원인지 */

let address_db_check = async (req,res) => {
    
    console.log('this is db check')
    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)
    console.log(keyObject)

    let result = await User.findAll({where:{kaikas_address:keyObject}})

    if(result.length != 0) {
        console.log(result.length)
        let data = {
            signupBoolean:true
        }
        res.json(data)
    }else{
        console.log(result.length)
        let data = {
            signupBoolean:false
        }
        res.json(data)
    }
    console.log(result)

}

/* 모든 회원들 정보를 불러오기 */

let userlist_get = async (req,res) => {

    let result = await Seller.findAll({})
  

    const ARR = []

    for(let i=0; i<result.length; i++){
        ARR.push({id:`Arr${i+1}`,name:result[i].user_idx, kaikas_address:result[i].seller_code, kycAuthorized:result[i].admin_approval })
    }
    console.log(ARR)
    let data = {
        ARR:ARR
    }

    res.json(data)

}

/* 반려 또는 승인 */

let selleradmin_access = async (req,res) => {

    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)
    console.log(keyObject)

    let result = await Seller.update({admin_approval:3},{where:{seller_code:keyObject}})

}

let selleradmin_deny = async (req,res) => {

    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)
    console.log(keyObject)

    let result = await Seller.update({admin_approval:2},{where:{seller_code:keyObject}})

}

/* 일반 구매자를 판매자 테이블로 이동 */

let selleradmin_wait = async (req,res) => {

    let key = Object.keys(req.body)
    const keyObject = JSON.parse(key)
    console.log(keyObject)
    const name = 0
    let admin_approval = 1
    let email_validation = true
    let result = await Seller.create({user_idx:name,seller_code:keyObject,admin_approval,email_validation})

}

module.exports = {
    seller_admin,
    // adduser,
    signup_post,
    address_db_check,
    userlist_get,
    selleradmin_access,
    selleradmin_deny,
    selleradmin_wait
}