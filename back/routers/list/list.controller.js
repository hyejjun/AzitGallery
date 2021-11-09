const {ItemInfo} = require('../../models')

/* 일반 상품 */

let all_list_get =  async (req,res) => {
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

module.exports = {
    all_list_get,
    plus_list_get,
    all_auction_get,
    plus_auction_get,
    query_item_post
}