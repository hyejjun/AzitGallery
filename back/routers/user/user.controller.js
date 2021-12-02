const axios = require('axios');
const qs = require('qs');
const nodemailer = require('nodemailer');
const smtpTransporter = require('nodemailer-smtp-transport');
require('dotenv').config()
const { auction, deliver, item, User, Seller, OrderDetail, Orders, ItemInfo, ShipInfo, Nft } = require("../../models");

const { sendKlay } = require('../../klaytn/kip7_deploy')
const config = require('../../klaytn/config');
const caver = config.caver;
const developerKey = config.developerKey;
const keyring = caver.wallet.keyring.createFromPrivateKey(developerKey);

if (!caver.wallet.getKeyring(keyring.address)) {
    const singleKeyRing = caver.wallet.keyring.createFromPrivateKey(developerKey);
    caver.wallet.add(singleKeyRing);
}

const front_url = `http://localhost:3000`
// const front_url = `http://localhost:3000`

const dotenv = require('dotenv')
dotenv.config()

const admin_email = process.env.USER
const admin_pass = process.env.PASS

/* 이메일 보내기 */
let seller_admin = async (req, res) => {
    const { userEmail, UserAddress, NickName } = req.body
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: `${admin_email}`, //generated ethereal user
            pass: `${admin_pass}`, //generated ethereal password 
        }
    });

    let url = `http://localhost:3000/admin/approvebtn`;
    let options = {
        from: `${admin_email}`,
        to: `${userEmail}`,//임시로, 나중에는 body에서 가져오게끔한다
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

/* 회원가입 */

let signup_post = async (req, res) => {
    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)
    let nick_name = keyObject.NickName
    let kaikas_address = keyObject.Address
    let email = keyObject.Email
    let join_date = new Date()
    let contact = '일단 비움'
    let address = '일단 비움'
    let result = await User.create({
        nick_name,
        kaikas_address,
        contact,
        address,
        join_date,
        email
    })
}

/* 이미 회원가입 했는지, 아니면 새로운 회원인지 */

let address_db_check = async (req, res) => {
    let key = Object.keys(req.body)

    if (key.length !== 0) {
        let keyObject = JSON.parse(key)
        let data = {}
        try {
            let result = await User.findOne({ where: { kaikas_address: keyObject } })

            // seller의 승인을 확인함
            let result2 = await Seller.findOne({
                where: {
                    user_idx: result.dataValues.user_idx
                }, attributes: ['admin_approval']
            })

            if (result !== null && result2 !== null) {
                data = {
                    signupBool: true,
                    kaikas_address: result.dataValues.kaikas_address,
                    user_idx: result.dataValues.user_idx,
                    admin_approval: result2.dataValues.admin_approval,
                    sellerBool: true
                }
            } else if (result2 === null) {
                data = {
                    signupBool: true,
                    kaikas_address: result.dataValues.kaikas_address,
                    user_idx: result.dataValues.user_idx,
                    sellerBool: false,
                }
            } else {
                data = {
                    signupBool: false
                }
            }
        } catch (error) {
            console.log(error);
            data = {
                signupBool: false,
                msg: 'Error'
            }
        }
        res.json(data)
    }
}

let nickname_check = async (req, res) => {
    let key = Object.keys(req.body)
    let nick_name = JSON.parse(key)
    let result = await User.findAll({ where: { nick_name } })
    if (result.length == 0) {
        res.json(true)
    } else {
        res.json(false)
    }
}

let email_check = async (req, res) => {
    try {
        let key = Object.keys(req.body);
        let email = JSON.parse(key);
        let result = await User.findAll({ where: { email } })
        if (result.length == 0) {
            let data = {
                result_msg: 'ok',
                msg: '이메일 가능',
                where: '/emailchk',
                flag: true
            }
            res.json(data)
        } else {
            let data = {
                result_msg: 'fail',
                msg: '이메일 중복',
                where: '/emailchk',
                flag: false
            }
            res.json(data)
        }
    } catch (e) {
        console.log(e);
        let data = {
            result_msg: 'fail',
            msg: '이메일 불가',
            where: '/emailchk',
            flag: false
        }
        res.json(data)
    }
}

/* 모든 회원들 정보를 불러오기 */

let userlist_get = async (req, res) => {
    let result = await Seller.findAll({})
    let data = []
    result.forEach(async (v) => {
        data.push(v.dataValues)
    });
    res.json(data)
}

/* 반려 또는 승인 */

let selleradmin_access = async (req, res) => {
    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)
    let result = await Seller.update({ admin_approval: 3 }, { where: { user_idx: keyObject } })
}

let selleradmin_deny = async (req, res) => {
    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)
    let result = await Seller.update({ admin_approval: 2 }, { where: { user_idx: keyObject } })
}

/* 일반 구매자를 판매자 테이블로 이동 */

let selleradmin_wait = async (req, res) => {
    let key = Object.keys(req.body)
    const keyObject = JSON.parse(key)
    let find_user = await User.findOne({ where: { kaikas_address: keyObject } })
    const { user_idx, nick_name } = find_user.dataValues
    let seller_insert = await Seller.create({
        user_idx,
        nick_name,
        admin_approval: 1,
        email_validation: true,
    })
}

let user_info = async (req, res) => {

    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)

    let data = {}

    try {
        let result = await User.findOne({
            where: {
                kaikas_address: keyObject
            }
        })
        let result2 = await Seller.findOne({
            where: {
                user_idx: result.dataValues.user_idx
            }
        })
        if (result2 !== null) {
            const { admin_approval, email_validation } = result2.dataValues
            data = {
                result,
                admin_approval,
                email_validation
            }
        } else {
            data = {
                result
            }
        }
    } catch (error) {
        console.log(error);
        data = {
            msg: "Fail"
        }
    }
    res.json(data)
}

let ship_update = async (req, res) => {
    console.log('들어옴 ========')
    let data = {}
    try {
        let item_code = req.body.data
        let order_detail = await OrderDetail.update({
            delivery_state: '배송완료'
            // 주석 sell_Type을 다른 order_state로 변경 할 것
        }, {
            where: { item_code: item_code }
        })
        let order_detail_num = await OrderDetail.findOne({
            where: {
                item_code: item_code
            }
        })

        let finalState = await OrderDetail.findAll({
            where: {
                delivery_state: '배송준비중',
                order_num: order_detail_num.order_num
            }
        })


        let shipupdate = await ShipInfo.update({
            item_delivery_state: '배송완료'
        }, {
            where: {
                order_detail_num: order_detail_num.id
            }
        })
        console.log(shipupdate,'shipupdateeee')
        let creator = await ItemInfo.findOne({ where: { item_id: order_detail_num.item_id } })
        let useraddress = await User.findOne({ where: { user_idx: creator.creator } })
        let creator_kaikas = useraddress.kaikas_address
        if (finalState.length == 0) {
            let orderRes = await Orders.update({
                final_order_state: '배송완료'
            }, {
                where: {
                    order_num: order_detail_num.order_num
                }
            })
        }
        let nftidx = Number(order_detail_num.item_code.split('-')[1])
        const nft = await Nft.findOne({
            where: {
                id: nftidx
            }
        })

        const nftlink = nft.nft

        console.log('여기 ====== ');
        console.log(`${developerKey}`);
        console.log(`${nftlink}`);
        console.log(creator_kaikas,'idkddddddddddddddd')
        let senderPrivateKey = `${developerKey}`
        const kip17Instance = new caver.klay.KIP17(`${nftlink}`)
        const tokenid = kip17Instance.tokenByIndex(0).then()
        async function test() {
            return await kip17Instance.tokenByIndex(0)
        }
        let realtokenid = await test()
        const senderKeyring = caver.wallet.keyring.createFromPrivateKey(
            senderPrivateKey
        );
        if (!caver.wallet.getKeyring(senderKeyring.address)) {
            const singleKeyRing = caver.wallet.keyring.createFromPrivateKey(
                senderPrivateKey
            );
            caver.wallet.add(singleKeyRing);
        }
        let contractAddr = `${nftlink}`;
        const kip17 = new caver.kct.kip17(contractAddr);

        transferResult = await kip17.transferFrom(
            senderKeyring.address,
            `${creator_kaikas}`,
            `${realtokenid}`,
            { from: senderKeyring.address, gas: 800000 }
        );
    


        // console.log('여기 결과 ===== ');
        // console.log(transferResult);
        sendKlay(creator_address, order_detail_num.price)



        data = {
            result_msg: 'OK',
            result: true
        }


    } catch (e) {
        data = {
            result_msg: 'Fail'
        }
    }
    res.json(data)
}


let seller_admin_check = async (req, res) => {
    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)
    let data = {}
    try {
        let result = await Seller.findOne({
            where: {
                nick_name: `${keyObject}`
            },
            attributes:
                ['admin_approval']
        })
        if (result !== null) {
            data = {
                result_msg: "OK",
                admin_approval: result.dataValues.admin_approval,
                sellerBool: true
            }
        } else if (result2 === null) {
            data = {
                result_msg: "OK",
                admin_approval: result.dataValues.admin_approval,
                sellerBool: false
            }
        }

    } catch (error) {
        data = {
            result_msg: "Fail"
        }
    }
    res.json(data)
}

module.exports = {
    seller_admin,
    signup_post,
    address_db_check,
    nickname_check,
    userlist_get,
    selleradmin_access,
    selleradmin_deny,
    selleradmin_wait,
    user_info,
    email_check,
    ship_update,
    seller_admin_check
}