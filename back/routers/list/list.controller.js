const {ItemInfo,ItemDetail,ItemImg} = require('../../models');
const mysql = require('mysql')
const pool = require('../pool');
const { user_info } = require('../user/user.controller');

const option = {
    headers: [
        {
            name: "Authorization",
            //https://console.klaytnapi.com/ko/security/credential 여기서 발급
            value: "Basic " + Buffer.from("KASKTBRTBYCJZW0FAXSBJBSP" + ":" + "Z3yNkPzJ20ARwFBdt2DooHySi4HVdE1rmdfpt-tM").toString("base64"),
        },
        { name: "x-krn", value: "krn:1001:node" },
    ],
};
  
const Caver = require("caver-js");
const caver = new Caver(
    new Caver.providers.HttpProvider(
      "https://node-api.klaytnapi.com/v1/klaytn",
      option
    )
);

/* 일반 상품 */

let all_list_get =  async (req,res) => {
    console.log(req.body)
    let result = await ItemInfo.findAll({ where:{sell_type:false}, limit:3 })
    let result2 = await ItemImg.findAll({ limit:3 })
    const ARR = []

    for(let i=0; i<result.length; i++){
        ARR.push({id:result[i].item_id,subject:result[i].description, artist:result[i].title, Like:5, alert:result[i].item_code, url: `/sell/${result[i].item_id}`})
    }

    console.log(ARR)
    let data = {
        ARR:ARR,
    }

    res.json(data)
}

let plus_list_get =  async (req,res) => {
    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)
    console.log(req.body)
    let result = await ItemInfo.findAll({ where:{sell_type:false}, limit:keyObject })
    let result2 = await ItemImg.findAll({ limit:keyObject })
    let Pluslength = keyObject + 3
    const ARR = []

    for(let i=0; i<result.length; i++){
        ARR.push({id:result[i].item_id,subject:result[i].description, artist:result[i].title, Like:5, alert:result[i].item_code, url:`/sell/${result[i].item_id}`,img:result2[i].item_img_link})
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
     let result2 = await ItemImg.findAll({ limit:3 })
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

    let result = await ItemInfo.findAll({ where:{sell_type:1}, limit:keyObject })
     let result2 = await ItemImg.findAll({ limit:keyObject })
    console.log(result)
    let Pluslength = keyObject + 3
    const ARR = []

    for(let i=0; i<result.length; i++){
        ARR.push({id:result[i].item_id,subject:result[i].description, artist:result[i].title, Like:5, alert:result[i].item_code, url:`/auction/${result[i].item_id}`,img:result2[i].item_img_link})
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
    let query=
    `
    select a.final_order_state,b.item_code,b.size,c.title,c.creator,c.item_hits,d.nick_name 
    from orders as a join order_detail as b 
    on a.order_num=b.order_num join item_info as c 
    on c.item_code=substring(b.item_code,1,16) 
    join user as d on a.user_idx=d.user_idx 
    where d.user_idx=c.creator 
    and d.kaikas_address='${keyObject}' 
    order by c.registered_at;
    `    
   queryset(req,res,query)
}


// 판매된 nft
let sold_nft_post = async (req,res) => {
    
    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)
    let query = 
    `
    select * from buyer_list as a join item_info as b on substring(a.item_code,1,16)=b.item_code where a.buyer_idx=1
    order by b.registered_at;
    `
    queryset(req,res,query)
    
}
// 미판매된 nft
let not_sell_post = async(req,res) => {

    //let data = {}

    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)
    let query =
    `
    select a.item_code,b.title,b.item_hits from item_detail as a join item_info as b 
    on a.item_info_idx=b.item_id join user as c 
    on c.user_idx=b.creator 
    where c.kaikas_address='${keyObject}' and a.product_status=0 
    order by b.registered_at;
    `

    queryset(req,res,query)
    /*
    // 미판매된 제품에 대한 쿼리
    // item_Detail에서 색상과 사이즈를 기준으로 해서 개별로 각각 보여줄 경우
    // select a.creator,a.title, b.item_code, a.item_hits from item_info as a join item_detail as b on a.item_id=b.item_info_idx where a.creator=2 and b.product_status=0;
    // item_info에서 색상과 사이즈를 아우르는 제품 자체에 대해 보여줄 경우
    // select distinct a.creator,a.title, a.item_code, a.item_hits from item_info as a join item_detail as b on a.item_id=b.item_info_idx where a.creator=2 and b.product_status=0;
    */
}
// 구매한 nft중 조회수 높은 순
let mynft_hit_post = (req,res) => {
    let { userAddress } = req.body
    let query =
    `
    select a.final_order_state,b.item_code,b.size,c.title,c.creator,c.item_hits,d.nick_name 
    from orders as a join order_detail as b 
    on a.order_num=b.order_num join item_info as c 
    on c.item_code=substring(b.item_code,1,16) 
    join user as d on a.user_idx=d.user_idx 
    where d.user_idx=c.creator 
    and d.kaikas_address=${userAddress} 
    order by c.item_hits;
    `
    queryset(req,res,query)
}


// `
// select * from item_detail as a join item_info as b 
// on a.item_info_idx=b.item_id join user as c 
// on c.user_idx=b.creator 
// where c.kaikas_address='0x2618f9b36086912b479ba6a6fff6abcfcc032398' and a.product_status=1 
// order by b.item_hits desc;
// `
// 판매된 nft중 조회수 높은 순
let sellnft_hit_post = (req,res) => {
    let { userAddress } = req.body
    let query =
    `
    select * from buyer_list as a join item_info as b on substring(a.item_code,1,16)=b.item_code where a.buyer_idx=1
    order by b.item_hits desc;
    `
    queryset(req,res,query)
}

// 미판매된 nft중 조회수 높은 순
let notsellnft_hit_post = (req,res) => {
    let { userAddress } = req.body
    let query =
    `
    select a.item_code,b.title,b.item_hits from item_detail as a join item_info as b 
    on a.item_info_idx=b.item_id join user as c 
    on c.user_idx=b.creator 
    where c.kaikas_address=${userAddress} and a.product_status=0 
    order by b.item_hits;
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
    mynft_hit_post,
    sellnft_hit_post,
    notsellnft_hit_post
}