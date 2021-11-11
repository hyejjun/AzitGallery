const {User,Orders, OrderDetail, ShipInfo, ItemInfo} = require('../../models')

/* 배송 정보 */

let get_shipinfo = async (req,res)=>{

    const {orderer,receiver,phoneNum,address,postNumber,addressDetail,memo,inputStatus,UserAddress,params} = req.body

    const buyerAddress = address+addressDetail
    const USERRESULT = await User.findOne({where:{kaikas_address:UserAddress}})
    // const params_item = await ItemInfo.findOne({where:{item_id :params}})

    console.log(params)

        await OrderDetail.create({
            size:'blue',color:'orderer',order_qty:45,shipper_idx:45,item_code:'phoneNum',price:1,item_id:params
        })

       const result =  await Orders.create({
            total_price:55500,buyer:orderer,receiver:receiver,receiver_address:buyerAddress,receiver_contact:phoneNum,final_order_state:true,memo:memo,user_idx:USERRESULT.user_idx
        })

        await ShipInfo.create({
            delivery_company:'55500',post_num:'orderer',item_delivery_state:'배송 중'
        })

        res.json()
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
    // item id 도 필요함
  
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
}

module.exports = {
    get_shipinfo,
    order_detail_post,
    send_shipinfo,
    get_delivery_info
}