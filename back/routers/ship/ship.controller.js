const {User,Orders, OrderDetail, ShipInfo, ItemInfo, Nft, ItemDetail} = require('../../models')
const { update, findAll, findOne } = require('../../models/auction_history')

/* 배송 정보 */

let get_shipinfo = async (req,res)=>{
    let data
    try{        
        const {
            orderer,
            receiver,
            phoneNum,
            address,
            postNumber,
            addressDetail,
            memo,
            inputStatus,
            UserAddress,
            params} = req.body
        const receiver_address = address+addressDetail
        if((params.substring(0,1))=='a'){
            let nftid = (params.substring(1,2))
            const nftdata = await Nft.findOne({
                where:{
                    id:nftid
                }
            })
            const itemcode = await ItemDetail.findOne({
                where:{
                    nft_idx:nftdata.nft_img_idx
                }
            })
            console.log("여기 ======= ",`${itemcode.item_code}-${nftdata.id}`);
            const orderdetail = await OrderDetail.findOne({
                where:{
                    item_code:`${itemcode.item_code}00-${nftdata.id}`
                }
            })

            const insertorders = await Orders.update({
                total_price:orderdetail.price,
                receiver:receiver,
                receiver_address:receiver_address,
                receiver_contact:phoneNum,
                final_order_state : '배송준비중',
                memo:memo
            },{
                where:{
                    order_num:orderdetail.order_num
                }
            })
        }else{            
            let orderRecord = await OrderDetail.findAll({
                where:{
                    order_num:params
                }
            })
            let total_cost = 0
            let updatedRes
            for(i=0;i<orderRecord.length;i++){
                total_cost = total_cost + orderRecord[i].dataValues.price
                updatedRes = await Orders.update({
                    total_price:total_cost,
                    order_date:null,
                    receiver:receiver,
                    receiver_address:receiver_address,
                    receiver_contact:phoneNum,
                    memo:memo
            },{
                where:{
                    order_num:params
                }
            })
            }
            data = {
                result_msg:'OK',
                result:updatedRes
            }
        }
    }catch(e){
        data = {
            result_msg:'Fail'
        }
    }
    res.json(data)
}

/* 구매 정보 */

let order_detail_post = async (req,res) => {
    const {size,color,order_qty,shipper_idx,item_code,price} = req.body
    await OrderDetail.create({
        size:'55500',color:'orderer',order_qty:45,shipper_idx:45,item_code:'phoneNum',price:1
    })

    res.json()

}


let get_delivery_info = async (req,res)=>{
    let data
    try{
        if(req.body.itemcode){
            let { selectDeliveryCompany,deliveryNum,itemcode } = req.body
            let orderidx = await OrderDetail.findOne({
                where:{
                    item_code:itemcode
                }
            })
            let shipinsert = await ShipInfo.update({
                delivery_company:selectDeliveryCompany,
                post_num:deliveryNum,
                item_delivery_state:'송장등록완료'
            },{
                where:{
                    order_detail_num:orderidx.id
                }
            })
            data = {
                result_msg:'OK',
                result:shipinsert
            }
    
        }else if(req.body.params){
            const {useridx,params} = req.body
            let nftid = (params.substring(1,2))
            const nftdata = await Nft.findOne({
                where:{
                    id:nftid
                }
            })
            const itemcode = await ItemDetail.findOne({
                where:{
                    nft_idx:nftdata.nft_img_idx
                }
            })
            const orderdetail = await OrderDetail.findOne({
                where:{
                    item_code:`${itemcode.item_code}-${nftdata.id}`
                }
            })
            const item_info = await ItemInfo.findOne({
                where:{
                    item_id:orderdetail.item_id
                }
            })
            const orders = await Orders.findOne({
                where:{
                    order_num:orderdetail.order_num
                }
            })
            const user = await User.findOne({
                where:{
                    user_idx:orders.buyer
                }
            })
            let result = [{
                total_price:orders.total_price,
                order_date:orders.order_date,
                buyer:orders.buyer,
                receiver:orders.receiver,
                receiver_address:orders.receiver_address,
                receiver_contact:orders.receiver_contact,
                order_num:orders.order_num,
                final_order_state:orders.final_order_state,
                memo:orders.memo,
                username:user.nick_name,
                title:item_info.title
            }]
            data = {
                result_msg:'OK',
                result:result,
            }
        }
    }catch(e){
        data = {
            result_msg:'Fail'
        }
    }
    res.json(data)
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
    get_shipinfo,
    order_detail_post,
    get_delivery_info
}