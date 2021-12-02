const {User, Seller, ItemInfo,ItemDetail,ItemImg, Orders, OrderDetail} = require('../../models');
const mysql = require('mysql')
const pool = require('../pool');
const { user_info } = require('../user/user.controller');



/* 일반 상품 */

let all_list_get =  async (req,res) => {
    let result = await ItemInfo.findAll({ where:{sell_type:false}, limit:3 })
    let result2 = await ItemImg.findAll({ limit:3 })
    const ARR = []
    for(let i=0; i<result.length; i++){
        ARR.push({
            id:result[i].item_id,subject:result[i].description, 
            artist:result[i].title, Like:5, 
            alert:result[i].item_code, 
            url: `/sell/${result[i].item_id}`,
            img:result2[i].item_img_link})
    }
    let data = {
        ARR:ARR
    }
    res.json(data)
}

let plus_list_get =  async (req,res) => {
    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)
    let result = await ItemInfo.findAll({ 
        where:{
            sell_type:false
        }, 
        limit:keyObject 
    })
    let result2 = await ItemImg.findAll({ limit:keyObject })
    let Pluslength = keyObject + 3
    const ARR = []

    for(let i=0; i<result.length; i++){
        ARR.push({
            id:result[i].item_id,
            subject:result[i].description, 
            artist:result[i].title, 
            Like:5, 
            alert:result[i].item_code, 
            url:`/sell/${result[i].item_id}`,
            img:result2[i].item_img_link})
    }

    let data = {
        ARR:ARR,
        Pluslength:Pluslength
    }

    res.json(data)
}


/* 경매 상품 */

let all_auction_get =  async (req,res) => {

    let result = await ItemInfo.findAll({ where:{sell_type:true}, limit:3 })
     let result2 = await ItemImg.findAll({ limit:3 })
    const ARR = []

    for(let i=0; i<result.length; i++){
        ARR.push({
            id:result[i].item_id,
            subject:result[i].description, 
            artist:result[i].title, 
            Like:5, 
            alert:result[i].item_code, 
            url: `/auction/${result[i].item_id}`,
            img:result2[i].item_img_link})
    }

    let data = {
        ARR:ARR
    }

    res.json(data)
}

let plus_auction_get =  async (req,res) => {
    
    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)

    let result = await ItemInfo.findAll({ 
        where:{
            sell_type:1
        }, 
        limit:keyObject 
    })
    let result2 = await ItemImg.findAll({ limit:keyObject })
    let Pluslength = keyObject + 3
    const ARR = []

    for(let i=0; i<result.length; i++){
        ARR.push({id:result[i].item_id,
            subject:result[i].description, 
            artist:result[i].title, Like:5, 
            alert:result[i].item_code, 
            url:`/auction/${result[i].item_id}`,
            img:result2[i].item_img_link})
    }
    let data = {
        ARR:ARR,
        Pluslength:Pluslength
    }
    res.json(data)
}

let query_item_post =  async (req,res) => {
    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)
    let result = await ItemInfo.findOne({ where:{item_id:keyObject}})
    const ARR = []

    for(let i=0; i<result.length; i++){
        ARR.push({
            id:result[i].item_id,
            subject:result[i].description, 
            artist:result[i].title, 
            Like:5, 
            alert:result[i].item_code, 
            url:`/auction/${result[i].item_id}`})
    }

    let data = {
        ARR:ARR,
        Pluslength:Pluslength
    }

    res.json(data)
}

// 판매자 구매자 뷰 나누기
let mynft_view = async(req,res) => {
    let data
    try{
        let key = Object.keys(req.body)
        let keyObject = JSON.parse(key)
        let user = await User.findOne({
            where:{
                kaikas_address:`${keyObject}`
            }
        })
        let seller = await Seller.findOne({
            where:{
                user_idx:user.user_idx

            }
        })
        if(seller.admin_approval==3){
            data = {
                result_msg:'OK',
                flag:true
            }
        }else if(seller.length==0){
            data = {
                result_msg:'OK',
                flag:false
            }
        }
    }catch{
        data = {
            result_msg:'Fail'
        }
    }
    res.json(data)
/*
    try{
        let key = Object.keys(req.body)
        let keyObject = JSON.parse(key)
        let user = await User.findAll({where:{kaikas_address:keyObject}})
        let user_idx = user[0].dataValues.user_idx
        let seller = await Seller.findAll({where:{user_idx}})
        let approval = seller[0].dataValues.admin_approval
        if( approval == 2){
            let data ={
                result_msg: 'ok',
                msg: '판매자 승인',
                where: '/mynftall',
                flag: true
            }
            res.json(data)
        }else{
            let data ={
                result_msg: 'fail',
                msg: '판매자 승인되지 않음',
                where: '/mynftall',
                flag:false
            }
            res.json(data)
        }
    }catch(e){
        let data ={
            result_msg: 'fail',
            msg: '판매자 승인되지 않음',
            where: '/mynftall',
            flag:false
        }
        res.json(data)
    }   
    */
}


// 구매한 nft
let my_nft_all_post = async (req,res) => {
    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)
    let user_idx = await User.findOne({where:{kaikas_address:keyObject}})
    user_idx = user_idx.dataValues.user_idx

    let query =
    `
    select c.sell_type,a.order_num,b.item_code, b.item_id, b.price,a.final_order_state,e.nft,
    a.order_date, a.memo, c.main_img_link, d.nick_name, b.size, b.color, c.title, b.id, b.delivery_state
    from orders as a join order_detail as b 
    on a.order_num=b.order_num join item_info as c 
    on b.item_id=c.item_id join user as d 
    on c.creator=d.user_idx join nft as e on e.id=(substring(b.item_code,20)) where a.buyer="${user_idx}";
    `

    queryset(req,res,query)   
}

// let query = `
// select c.sell_type,a.order_num,b.item_code, b.item_id, b.price,a.final_order_state,
// a.order_date, a.memo, c.main_img_link, d.nick_name, b.size, b.color, c.title, b.id, b.delivery_state
// from orders as a join order_detail as b 
// on a.order_num=b.order_num join item_info as c 
// on b.item_id=c.item_id join user as d 
// on c.creator=d.user_idx where a.buyer="${user_idx}";
// ` 


// 판매된 nft
let sold_nft_post = async (req,res) => {
    
    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)
    let user_idx = await User.findOne({where:{kaikas_address:keyObject}})
    user_idx = user_idx.dataValues.user_idx

    let query = 
    `
    select b.title,a.item_id, a.id,a.item_code,a.price,a.size,a.color,c.nick_name,
    a.delivery_state,b.main_img_link,d.final_order_state,e.item_delivery_state 
    from order_detail as a join item_info as b 
    on a.item_id=b.item_id join user as c 
    on a.shipper_idx=c.user_idx join orders as d 
    on a.order_num=d.order_num join ship_info as e 
    on a.id=e.order_detail_num 
    where b.creator=${user_idx};
    `
    queryset(req,res,query)
}

// 미판매된 nft
let not_sell_post = async(req,res) => {
    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)
    let user_idx = await User.findOne({where:{kaikas_address:keyObject}})
    user_idx = user_idx.dataValues.user_idx
    let query =
    `
    select a.id,b.size,b.color,a.nft,c.title,c.main_img_link,d.nick_name,
    b.item_code,left(c.registered_at,10)as date  
    from nft as a join item_detail as b 
    on a.nft_img_idx=b.nft_idx join item_info as c 
    on c.item_id=b.item_info_idx join user as d 
    on d.user_idx=c.creator where a.product_status='판매중' 
    and d.user_idx=${user_idx};
    `
    queryset(req,res,query)
}

let queryset = (req,res,query) => {
    let data = {}
    pool.getConnection((err,connection)=>{
        connection.query(            
            query            
        ,function(err,result,fields){
            if(err) throw err;
            if(result==undefined){
                data = {
                    result_msg:'Fail'
                }
            }else{
                data = {
                    result_msg:'OK',
                    result
                }
                
                res.json(data)
            }
            connection.release()
        })
    })   
}

module.exports = {
    all_list_get,
    plus_list_get,
    all_auction_get,
    plus_auction_get,
    query_item_post,
    my_nft_all_post,
    sold_nft_post,
    not_sell_post,
    mynft_view,
}