const {ItemInfo,ItemDetail} = require('../../models');
const mysql = require('mysql')
const pool = require('../pool');



/* 일반 상품 */

let all_list_get =  async (req,res) => {
    console.log(req.body)
    let result = await ItemInfo.findAll({ where:{sell_type:false}, limit:3 })
    const ARR = []

    for(let i=0; i<result.length; i++){
        ARR.push({id:result[i].item_id,subject:result[i].description, artist:result[i].title, Like:5, alert:result[i].item_code, url: `/sell/${result[i].item_id}`})
    }
    console.log(ARR)
    let data = {
        ARR:ARR
    }

    res.json(data)
}

let plus_list_get =  async (req,res) => {
    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)
    console.log(req.body)
    let result = await ItemInfo.findAll({ where:{sell_type:false}, limit:keyObject })
    let Pluslength = keyObject + 3
    const ARR = []

    for(let i=0; i<result.length; i++){
        ARR.push({id:result[i].item_id,subject:result[i].description, artist:result[i].title, Like:5, alert:result[i].item_code, url:`/sell/${result[i].item_id}`})
    }
    console.log(Pluslength)

    let data = {
        ARR:ARR,
        Pluslength:Pluslength
    }

    res.json(data)
}


/* 경매 상품 */

let all_auction_get =  async (req,res) => {
    console.log('this')
    let result = await ItemInfo.findAll({ where:{sell_type:true}, limit:3 })
    const ARR = []

    for(let i=0; i<result.length; i++){
        ARR.push({id:result[i].item_id,subject:result[i].description, artist:result[i].title, Like:5, alert:result[i].item_code, url: `/auction/${result[i].item_id}`})
    }
    console.log(ARR)
    let data = {
        ARR:ARR
    }

    res.json(data)
}

let plus_auction_get =  async (req,res) => {
    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)
    console.log(req.body)
    let result = await ItemInfo.findAll({ where:{sell_type:true}, limit:keyObject })
    let Pluslength = keyObject + 3
    const ARR = []

    for(let i=0; i<result.length; i++){
        ARR.push({id:result[i].item_id,subject:result[i].description, artist:result[i].title, Like:5, alert:result[i].item_code, url:`/auction/${result[i].item_id}`})
    }
    console.log(Pluslength)

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
        ARR.push({id:result[i].item_id,subject:result[i].description, artist:result[i].title, Like:5, alert:result[i].item_code, url:`/auction/${result[i].item_id}`})
    }
    console.log(Pluslength)

    let data = {
        ARR:ARR,
        Pluslength:Pluslength
    }

    res.json(data)
}

// 구매한 nft
let my_nft_all_post = async (req,res) => {
    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)

    let data = {}

    pool.getConnection((err,connection)=>{
        connection.query(
            `
            select a.final_order_state,b.item_code,b.size,b.size, c.title,c.creator,c.item_hits,e.nick_name 
            from orders as a join order_detail as b 
            on a.order_num=b.order_num join item_info as c 
            on c.item_code=substring(b.item_code,1,13) join user as d 
            on a.buyer=d.user_idx join user as e 
            on e.user_idx=c.creator where d.kaikas_address='${keyObject}';
            `
            ,function(err,result,fields){
            if(err) throw err;
            if(result==undefined){
                data = {
                    result_msg:'Fail'
                }
            }else{
                console.log(result)
                data = {
                    result_msg:'OK',
                    result
                }
                res.json(data)
            }
            
            connection.release();
        })
    })
}



// 판매한 nft
let sold_nft_post = async (req,res) => {
    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)
    pool.getConnection((err,connection)=>{
        connection.query(
            `
            select a.item_code, a.state, c.item_hits, c.title, e.order_date 
            from buyer_list as a join item_detail as b 
            on a.item_code= b.item_code join item_info as c 
            on b.item_info_idx=c.item_id join order_detail as d 
            on d.item_code=b.item_code join orders as e 
            on d.order_num= e.order_num where sender_idx=2;
            `
        ,function(err,result,fields){
            if(err) throw err;
            if(result==undefined){
                data = {
                    result_msg:'Fail'
                }
            }else{
                console.log(result)
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

let not_sell_post = async(req,res) => {

    let data = {}

    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)
    console.log(keyObject,'not sell')
    pool.getConnection((err,connection)=>{
        connection.query(
            `
            select a.creator,a.title, b.item_code, a.item_hits 
            from item_info as a join item_detail as b 
            on a.item_id=b.item_info_idx join user as c 
            on a.creator=c.user_idx 
            where c.kaikas_address='${keyObject}' and b.product_status=0;
            `
        ,function(err,result,fields){
            if(err) throw err;
            if(result==undefined){
                data = {
                    result_msg:'Fail'
                }
            }else{
                console.log(result)
                data = {
                    result_msg:'OK',
                    result
                }
                res.json(data)
            }
            connection.release()
        })
    })
    // 미판매된 제품에 대한 쿼리
    // item_Detail에서 색상과 사이즈를 기준으로 해서 개별로 각각 보여줄 경우
    // select a.creator,a.title, b.item_code, a.item_hits from item_info as a join item_detail as b on a.item_id=b.item_info_idx where a.creator=2 and b.product_status=0;
    // item_info에서 색상과 사이즈를 아우르는 제품 자체에 대해 보여줄 경우
    // select distinct a.creator,a.title, a.item_code, a.item_hits from item_info as a join item_detail as b on a.item_id=b.item_info_idx where a.creator=2 and b.product_status=0;
   
}

module.exports = {
    all_list_get,
    plus_list_get,
    all_auction_get,
    plus_auction_get,
    query_item_post,
    my_nft_all_post,
    sold_nft_post,
    not_sell_post
}