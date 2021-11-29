const {User,Orders, OrderDetail, ShipInfo, ItemInfo} = require('../../models')
const { update, findAll } = require('../../models/auction_history')

/* 배송 정보 */

let get_shipinfo = async (req,res)=>{
    let data
    try{
        const {orderer,receiver,phoneNum,address,postNumber,addressDetail,memo,inputStatus,UserAddress,params} = req.body
        const receiver_address = address+addressDetail
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

    }catch(e){
        data = {
            result_msg:'Fail'
        }

    }
    res.json(data)



    
    // let 







}

/* 구매 정보 */

let order_detail_post = async (req,res) => {

    const {size,color,order_qty,shipper_idx,item_code,price} = req.body

    console.log(result)
    await OrderDetail.create({
        size:'55500',color:'orderer',order_qty:45,shipper_idx:45,item_code:'phoneNum',price:1
    })

    res.json()

}

let send_shipinfo = async (req,res)=>{
    
}


let get_delivery_info = async (req,res)=>{
    console.log(req.body,'req.bodyyyyyyyyyyyyyy=')
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

    // item id 도 필요함
    /*
    const {useridx} = req.body
    let USERIDX = await User.findOne({where:{kaikas_address:useridx}})
    console.log(useridx)
    let result = await Orders.findAll({where:{user_idx:USERIDX.user_idx}})
    let result2 = await OrderDetail.findAll({where:{order_num:result[result.length-1].order_num}})
    let result3 = await ItemInfo.findOne({where:{item_id:result2[result2.length-1].item_id}})
    const ARR = []
    console.log(result3.item_code)
    ARR.push({total_price:result[result.length-1].total_price, buyer:result[result.length-1].buyer, receiver:result[result.length-1].receiver, receiver_address:result[result.length-1].receiver_address, receiver_contact:result[result.length-1].receiver_contact, final_order_state:result[result.length-1].final_order_state, memo:result[result.length-1].memo, item_code:result3.title})


    let data = {
        ARR:ARR
    }

    console.log(ARR[0].total_price)
    res.json(data)
    */
}

module.exports = {
    get_shipinfo,
    order_detail_post,
    send_shipinfo,
    get_delivery_info
}