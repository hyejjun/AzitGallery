const axios = require('axios');
const qs = require('qs');
const nodemailer = require('nodemailer');
const smtpTransporter = require('nodemailer-smtp-transport');
require('dotenv').config()
const { auction, deliver, item, User, Seller, OrderDetail } = require("../../models");



/* 이메일 보내기 */

let seller_admin = async (req,res) => {
    console.log('왓다')
    console.log("이메일 =====",req.body);
    const {userEmail, UserAddress, NickName} = req.body
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
        to:`${userEmail}`,//임시로, 나중에는 body에서 가져오게끔한다
        subject: '이메일 인증 완료를 위해 아래 url을 클릭해주세요.',
        html: `${NickName}님, 안녕하세요. <br/>이메일 인증을 위해 아래 URL을 클릭해주세요. <br/> ${url}`
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
    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)
    console.log(keyObject,'keyobject')
    let nick_name = keyObject.NickName
    let kaikas_address = keyObject.Address
    let email = keyObject.Email
    let join_date = new Date()
    let contact = '일단 비움'
    let address = '일단 비움'
    let result = await User.create({nick_name,kaikas_address,contact,address,join_date,email})
}

/* 이미 회원가입 했는지, 아니면 새로운 회원인지 */

let address_db_check = async (req,res) => {
    console.log(req.body,"3333333")
    console.log('this is db check',"2222222")
    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)
    console.log(keyObject)

    //let result = await User.findAll({where:{kaikas_address:keyObject}})
    let data = {}

    // if(result.length != 0) {
    //     console.log(result.length)
    //     let data = {
    //         signupBoolean:true
    //     }

    //     res.json(data)
    // }else{
    //     console.log(result.length)
    //     let data = {
    //         signupBoolean:false
    //     }
    //     res.json(data)
    // }
    // console.log(result)
    try {
        let result = await User.findOne({where:{kaikas_address:keyObject}})
        if(result !== null){
            data = {
                signupBool: true,
                kaikas_address: result.dataValues.kaikas_address,
                user_idx: result.dataValues.user_idx
            }
        }else{
            data = {
                signupBool: false
            }
        }
    } catch(error){
        console.log(error);
        data = {
            signupBool: false,
            msg : 'Error'
        }
    }
    res.json(data)

}

let nickname_check = async(req,res) => {

    let key = Object.keys(req.body)
    let nick_name = JSON.parse(key)
    
    let result = await User.findAll({where:{nick_name}})
    if(result.length == 0){
        res.json(true)
    }else{
        res.json(false)
    }
}

let email_check = async (req,res) =>{

    try{
    let key = Object.keys(req.body);
    let email = JSON.parse(key);
    let result = await User.findAll({where:{email}})
    if (result.length == 0) {
        let data ={
            result_msg: 'ok',
            msg: '이메일 가능',
            where: '/emailchk',
            flag: true
        }
        res.json(data)
    } else {
        let data ={
            result_msg: 'fail',
            msg: '이메일 중복',
            where: '/emailchk',
            flag: false
        }
        res.json(data)
    }
    }catch(e){
        console.log(e);
        let data ={
            result_msg: 'fail',
            msg: '이메일 불가',
            where: '/emailchk',
            flag:false
        }
        res.json(data)
    }   
}

/* 모든 회원들 정보를 불러오기 */

let userlist_get = async (req,res) => {
    let result = await Seller.findAll({})

    let data = []
    result.forEach (async (v) => {
        data.push(v.dataValues)
    });

    res.json(data)
}

/* 반려 또는 승인 */

let selleradmin_access = async (req,res) => {
    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)

    let result = await Seller.update({admin_approval:3},{where:{user_idx:keyObject}})
}

let selleradmin_deny = async (req,res) => {
    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)

    let result = await Seller.update({admin_approval:2},{where:{user_idx:keyObject}})
}

/* 일반 구매자를 판매자 테이블로 이동 */

let selleradmin_wait = async (req,res) => {
    let key = Object.keys(req.body)
    const keyObject = JSON.parse(key)

    let find_user = await User.findOne({where:{kaikas_address:keyObject}})
    const {user_idx, nick_name} = find_user.dataValues

    let seller_insert = await Seller.create({
        user_idx,
        nick_name,
        admin_approval : 1,
        email_validation : true,
    })
}

let user_info = async (req,res) => {

    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)
    console.log(keyObject,'user_info')
    let result = await User.findAll({where:{kaikas_address:keyObject}})
    res.json(result[0])

}

module.exports = {
    seller_admin,
    // adduser,
    signup_post,
    address_db_check,
    nickname_check,
    userlist_get,
    selleradmin_access,
    selleradmin_deny,
    selleradmin_wait,
    user_info,
    email_check
}