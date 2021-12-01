const {OrderDetail, ItemDetail, Nft, Orders, ItemInfo, ShipInfo} = require('../../models')
const mysql = require('mysql')
const pool = require('../pool');

let deal_post = async (req,res) => {
    let data
    let total_order_num = []
    try{
        let {size,color,qty} = req.body.selected
        let {item_id,price,currency,userAddress,userIdx,creator} = req.body
        let data = {}
        let orderdata = []
        let buyerid = await ItemInfo.findOne({
            where:{
                item_id:item_id
            }
        })
        let result4 = await Orders.create({
            total_price:price,
            order_date:null,
            final_order_state:'배송준비중',
            buyer:userIdx,
            order_num:null,
            user_idx:buyerid.creator
        })
        
        
        for(let i=1; i<=qty; i++){
            let result1 = await ItemDetail.findOne({where:{item_info_idx:item_id,size:size,color:color}})
            let result2 = await Nft.findOne({where:{nft_img_idx:result1.nft_idx,product_status:'판매중'}})
            let nft_idx = result2.id
            price = parseFloat(price)
            
            let result3 = await OrderDetail.create({
                size,
                color,
                shipper_idx:userIdx,
                item_code:`${result1.item_code}-${nft_idx}`,
                price:price,
                order_num:result4.order_num,
                item_id,
                delivery_state:'배송준비중'
            })
            let ship_info = await ShipInfo.create({
                order_num:result4.order_num,
                item_delivery_state:'배송준비중',
                order_detail_num:result3.id
            })
            
            orderdata.push(result3.dataValues)

            let result5 = await Nft.update({
                product_status:'판매완료'
            },{
                where:{
                    id:nft_idx
                }
            })
     
            data = {
                result_msg:'OK',
                result:result4.order_num
            }
        } 
        
        // 판매완료 업데이트
        let item_detail_data = await ItemDetail.findOne({where:{item_info_idx:item_id,size:size,color:color}})
        let nft_idx_data = item_detail_data.nft_idx
        let ch = await Nft.findAll({where:{nft_img_idx:nft_idx_data,product_status:'판매중'}})
        if(ch.length==0){
            await ItemDetail.update({
                product_status:'판매완료'
            },{
                where:{
                    item_info_idx:item_id,
                    size:size,
                    color:color
                }
            })
        }
        ch2 = await ItemDetail.findAll({where:{item_info_idx:item_id,product_status:'판매중'}})
        if(ch2.length==0){
            await ItemInfo.update({
                product_status:1
            },{
                where:{
                    item_id:item_id
                }
            })
        }
        res.json(data)
    }catch(e){
        data = {
            result_msg:'Fail'
        }
        res.json(data)
    }
}



module.exports = {
    deal_post,
    
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