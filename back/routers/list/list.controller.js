const {ItemInfo} = require('../../models')


let all_list_get =  async (req,res) => {
    let result = await ItemInfo.findAll({limit: 3})
    const ARR = []

    for(let i=0; i<result.length; i++){
        ARR.push({id:result[i].item_info_idx,subject:result[i].description, artist:result[i].title, Like:5, alert:result[i].product_status, url: `/sell/${result[i].item_info_idx}`})
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
    let result = await ItemInfo.findAll({ limit:keyObject })
    let Pluslength = keyObject + 3
    const ARR = []

    for(let i=0; i<result.length; i++){
        ARR.push({id:result[i].item_info_idx,subject:result[i].description, artist:result[i].title, Like:5, alert:result[i].product_status, url: `/sell/${result[i].item_info_idx}`})
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
    plus_list_get
}