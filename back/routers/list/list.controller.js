const {ItemInfo} = require('../../models');
const mysql = require('mysql2/promise')
const connection = require('../pool')

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

let my_nft_all_post = async (req,res) => {
    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)
    console.log(keyObject,'ny')

    connection.connect()
    // 구매한 nft


    connection.query(`
        
        select a.final_order_state,b.item_code,b.size,b.size, c.title,c.creator,c.item_hits 
        from orders as a join order_detail as b 
        on a.order_num=b.order_num join item_info as c 
        on c.item_code=substring(b.item_code,1,13) join user as d on a.buyer=d.user_idx where d.kaikas_address=${keyObject};
    `,(error,result)=>{
        // 나중에 실제 적용시에는 
    if(error){
            console.log(error)
        }else{
            console.log(result)
            res.json(result)
        }
    })

    //connection.query(`insert into category(main_category,_code,category_name) values('test','tset)`)

}

module.exports = {
    all_list_get,
    plus_list_get,
    all_auction_get,
    plus_auction_get,
    query_item_post,
    my_nft_all_post
}