const {ItemInfo, Category, SubCategory, ItemImg} = require('../../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const pool = require('../pool');
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
        let result = await ItemInfo.findAll({where:{category_id:genderSelect,sell_type:false}})
         let result2 = await ItemImg.findAll({  })
        let ARR = []
        for(let i=0; i<result.length; i++){
            ARR.push({id:result[i].item_id,subject:result[i].description, artist:result[i].title, Like:5, alert:result[i].item_code, url: `/sell/${result[i].item_id}`, img:result2[i].item_img_link})
        }
        let data = {
            ARR:ARR
        }
        res.json(data)
}

/* 상품 검색 */
let get_search = async (req,res)=>{
    const{ tabBtn, genderSelect, select, search} = req.body
        let result = await ItemInfo.findAll({where:{title:{[Op.like]: "%" + search + "%"}}})
        let result2 = await ItemImg.findAll({  })
        let ARR = []
        for(let i=0; i<result.length; i++){
            ARR.push({id:result[i].item_id,subject:result[i].description, artist:result[i].title, Like:5, alert:result[i].item_code, url: `/auction/${result[i].item_id}`,img:result2[i].item_img_link})
        }
        let data = {
            ARR:ARR
        }
        res.json(data)
}

/* 상품 정렬 - 최근발행 | 인기 많은 순 */
let get_sort = async (req,res)=>{
    const{ tabBtn, genderSelect, select, search} = req.body
    if(select == "sell_recent"){
        let result = await ItemInfo.findAll({ order: [['registered_at', 'DESC']]})
        let result2 = await ItemImg.findAll({  })
        let ARR = []
        for(let i=0; i<result.length; i++){
            ARR.push({id:result[i].item_id,subject:result[i].description, artist:result[i].title, Like:5, alert:result[i].item_code, url: `/auction/${result[i].item_id}`, img:result2[i].item_img_link})
        }
        let data = {
            ARR:ARR
        }
        res.json(data)
    }
}

let get_category_list = async (req,res) => {
    let main_result = await Category.findAll({})
    let main = []
    for(let i=0; i<main_result.length; i++){
        main.push({
            main_category_code:main_result[i].main_category_code, 
            category_name:main_result[i].category_name
        })
    }
    let sub = Array(main_result.length).fill(null).map(()=>Array())

    for(let j=1; j<=main_result.length; j++){
        let sub_result = await SubCategory.findAll({
            where:{
                main_category_idx:j
            }})
        for(let k=0; k<sub_result.length; k++ ){        
            sub[j-1].push({
                main_category_idx:sub_result[k].main_category_idx, 
                sub_category_code:sub_result[k].sub_category_code, 
                sub_category_name:sub_result[k].sub_category_name
            })
        }
    }
    let data = {
        main:main,
        sub:sub
    }
    res.json(data)
}


/* 서브 카테고리 */

let get_sub_category_list = async (req,res)=>{
    // genderSelect = 0 미선택 1 여성복 2 남성복 3 아동복

    const{ key, ele } = req.body

        let result = await ItemInfo.findAll({where:{category_id:genderSelect,sell_type:false}})
         let result2 = await ItemImg.findAll({ limit:keyObject })
        let ARR = []
        for(let i=0; i<result.length; i++){
            ARR.push({id:result[i].item_id,subject:result[i].description, artist:result[i].title, Like:5, alert:result[i].item_code, url: `/sell/${result[i].item_id}`, img:result2[i].item_img_link})
        }
        let data = {
            ARR:ARR
        }
        res.json(data)
}

let get_categorys = async (req,res) => {
    let data
    try{
        let result = await Category.findAll()
        data = {
        result_msg:'OK',
        result
        }
    }catch(e){
        data = {
            result_msg:'Fail',
            msg:'페이지가 존재하지 안습니다.'
        }
    }   
    res.json(data)
}

let get_sub_category = async (req,res) => {
    let data
    try{
        let result = await SubCategory.findAll({where:{main_category_idx:req.body.data}})
        data = {
        result_msg:'OK',
        result
        }
    }catch(e){
        data = {
            result_msg:'Fail',
            msg:'페이지가 존재하지 안습니다.'
        }
    }   
    res.json(data)
}

let all_list_direct_get =  async (req,res) => {
    let query
    let {sell_type,list_length} = req.body.data
    try{
        if(req.body.data.list==0){
            query = `
                select a.item_id,a.title,b.nick_name,a.size,a.color,a.main_img_link
                from item_info as a join user as b 
                on a.creator=b.user_idx 
                where a.sell_type=${sell_type} and a.product_status=0
                order by a.registered_At desc
                limit ${list_length};
            `
            queryset(req,res,query)
        }else if(typeof(req.body.data.list)==typeof(1)){
            query = `
            select a.item_id,a.title,b.nick_name,a.color,a.main_img_link 
            from item_info as a join user as b 
            on a.creator=b.user_idx join category as c 
            on c.main_category_code=a.category_id 
            where a.sell_type=${sell_type} and a.product_status=0
            and c.main_category_code=${req.body.data.list}
            order by a.registered_At desc
            limit ${list_length};
        `
        queryset(req,res,query)
        }else if(typeof(req.body.data.list)==typeof('a')){
            query = `
            select a.item_id,a.title,b.nick_name,a.color,a.main_img_link 
            from item_info as a join user as b 
            on a.creator=b.user_idx join sub_category as c 
            on c.item_code=right(a.item_code,3) 
            where a.sell_type=${sell_type} and a.product_status=0
            and c.item_code=${req.body.data.list}
            order by a.registered_At desc
            limit ${list_length};
        `
        queryset(req,res,query)
        }
    }catch(e){
        let data = {
            result_msg:'Fail',
            msg:'상품이 존재하지 않습니다.'
        }
        res.json(data)
    }
   
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
                    result_msg:'Fail',
                    msg:'상품이 존재하지 않습니다.'
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
    get_selltype,
    get_category,
    get_search,
    get_sort,
    get_category_list,
    get_sub_category_list,
    get_categorys,
    get_sub_category,
    all_list_direct_get
}