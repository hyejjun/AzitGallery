const {ItemInfo} = require('../../models')

/*
    @ 전체 값 다 보내는 이유?
    판매에서 여성복 선택하는 경우
    판매에서 남성복 선택하는 경우
    두 가지 검색 조건이 있기 때문.
*/

/* 판매 경매 선택 */
let get_selltype = async (req,res)=>{
    // tabBtn = 1 : 판매 
    // tabBtn = 2 : 경매

    
    // let sellType
    // const{ tabBtn, genderSelect, select, search} = req.body
    // if(tabBtn==1){
    //     sellType = false
    // }else if(tabBtn==2){
    //     sellType = true
    // }


}

/* 카테고리 선택 */
let get_category = async (req,res)=>{
    // genderSelect = 0 미선택 1 여성복 2 남성복 3 아동복

    const{ tabBtn, genderSelect, select, search} = req.body

    console.log(genderSelect)

        let result = await ItemInfo.findAll({where:{category_id:genderSelect,sell_type:false}})
        let ARR = []
        for(let i=0; i<result.length; i++){
            ARR.push({id:result[i].item_id,subject:result[i].description, artist:result[i].title, Like:5, alert:result[i].item_code, url: `/auction/${result[i].item_id}`})
        }
        console.log(ARR)
        let data = {
            ARR:ARR
        }
    
        res.json(data)

}

/* 상품 검색 */
let get_search = async (req,res)=>{
    const{ tabBtn, genderSelect, select, search} = req.body

}

/* 상품 정렬 - 최근발행 | 인기 많은 순 */
let get_sort = async (req,res)=>{
    // select = 최근 발행순 좋아요 순 선택
    // 4가지 경우의 수가 있음 
    // sell_likes, sell_recent, auction_likes, auciton_recent

    const{ tabBtn, genderSelect, select, search} = req.body

    if(select == "sell_recent"){
        console.log('recent 순')

        let result = await ItemInfo.findAll({ order: [['registered_at', 'DESC']]})
        let ARR = []
        for(let i=0; i<result.length; i++){
            ARR.push({id:result[i].item_id,subject:result[i].description, artist:result[i].title, Like:5, alert:result[i].item_code, url: `/auction/${result[i].item_id}`})
        }
     
        let data = {
            ARR:ARR
        }
        console.log(ARR)
        res.json(data)

    }
}

module.exports = {
    get_selltype,
    get_category,
    get_search,
    get_sort
}