const {Orders, OrderDetail, ShipInfo} = require('../../models')

let get_shipinfo = async (req,res)=>{

    const {orderer,receiver,phoneNum,address,postNumber,addressDetail,memo,inputStatus} = req.body
    let buyerAddress = address+addressDetail

       let result =  await Orders.create({
            total_price:55500,buyer:orderer,receiver:receiver,receiver_address:buyerAddress,receiver_contact:phoneNum,order_num:1,final_order_state:true,memo:memo
        })
 
        console.log(result)
        await OrderDetail.create({
            size:'55500',color:'orderer',order_qty:45,shipper_idx:45,item_code:'phoneNum',price:1
        })

        await ShipInfo.create({
            delivery_company:'55500',post_num:'orderer',order_num:1,item_delivery_state:'배송 중'
        })

}

let send_shipinfo = async (req,res)=>{
    
}


let get_deliveryinfo = async (req,res)=>{
    // item id 도 필요함
    const {selectDeliveryCompany, deliveryNum} = req.body
    console.log(req.body);
}

module.exports = {
    get_shipinfo,
    send_shipinfo,
    get_deliveryinfo
}