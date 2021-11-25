const {OrderDetail, ItemDetail, Nft, Orders} = require('../../models')
const mysql = require('mysql')
const pool = require('../pool');

let deal_post = async (req,res) => {
    console.log('eeeeeeeeeeeeeeeeeeee',req.body,'reeeeeeeeeeeeeeeeeeeeeee')
    let {size,color,qty} = req.body.selected
    let {item_id,price,currency,userAddress,userIdx,creator} = req.body
    let data = {}
    for(let i=1; i<=qty; i++){
        let result1 = await ItemDetail.findOne({where:{item_info_idx:item_id}})
        console.log(result1,'result111111111111111111111111111111')
        let result2 = await Nft.findOne({where:{nft_img_idx:result1.nft_idx,product_status:'판매중'}})
        console.log(result2,'result222222222222222222222222222222')
        console.log(result2.id,'idddddddddddddddddddd')
        console.log(Math.min(result2.id))
        let nft_idx = Math.min(result2.id)
        let result3 = await OrderDetail.create({
            size,
            color,
            shipper_idx:userIdx,
            item_code:`${result1.item_code}-${nft_idx}`,
            price:price,
            order_num:null,
            item_id,
            sell_type:0
        })
        console.log(result3,'result33333333333333333333333')
        let result4 = await Orders.create({
            total_price:price,
            order_date:null,
            buyer:userIdx,
            order_num:result3.order_num,
            final_order_state:0,
            user_idx:userIdx
        })
        console.log(result4,'result444444444444444444444')
        let result5 = await Nft.update({
            product_status:'판매완료'
        },{
            where:{
                id:result2.id
            }
        })
    }
    

    //console.log(result5,'result5555555555555555555555555555555555555')

























    // pool.getConnection((err,connection)=>{
    //     connection.query(            
    //         `
    //         insert into order_detail values('${size}','${color}',3,(select a.item_code from item_detail as a where a.item_info_idx=${item_id} and a.size='${size}' and a.color='${color}'),3000,default,'${item_id}');
    //         `     
    //     ,function(err,result,fields){
    //         if(err) throw err;
    //         connection.query(`
    //         insert into orders(total_price,order_num) values('${price}',(select max(order_num) from order_detail));
    //         `,function(error,result2,fields){
    //             if(error) throw error
    //             if(result2==undefined){

    //             data = {
    //                 result_msg:'Fail'
    //             }
    //             }else{
    //                 connection.query(`
    //                     update item_detail set product_status=1
    //                      where item_code=(select a.item_code from item_detail as a 
    //                         where a.item_info_idx='${item_id} and a.size='${size}' and a.color='${color}');
    //                 `,function(errr,result3,fields){
    //                     console.log(result3)
    //                 })
    //                 console.log(result2)
    //                 data = {
    //                     result_msg:'OK',
    //                     result
    //                 }
                
    //             }
    //         })
    //         connection.release()
    //     })
    // }) 
    res.json({data:'test'})

}

module.exports = {
    deal_post
}