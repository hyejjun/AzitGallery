const {OrderDetail} = require('../../models')
const mysql = require('mysql')
const pool = require('../pool');

let deal_post = (req,res) => {
    console.log(req.body,'reeeeeeeeeeeeeeeeeeeeeee')
    let {size,color,item_id,price,currency} = req.body

    let data = {}
    pool.getConnection((err,connection)=>{
        connection.query(            
            `
            insert into order_detail values('${size}','${color}',3,(select a.item_code from item_detail as a where a.item_info_idx=${item_id} and a.size='${size}' and a.color='${color}'),3000,default,'${item_id}');
            `     
        ,function(err,result,fields){
            if(err) throw err;
            connection.query(`
            insert into orders(total_price,order_num) values('${price}',(select max(order_num) from order_detail));
            `,function(error,result2,fields){
                if(error) throw error
                if(result2==undefined){

                data = {
                    result_msg:'Fail'
                }
                }else{
                    connection.query(`
                        update item_detail set product_status=1
                         where item_code=(select a.item_code from item_detail as a 
                            where a.item_info_idx='${item_id} and a.size='${size}' and a.color='${color}');
                    `,function(errr,result3,fields){
                        console.log(result3)
                    })
                    console.log(result2)
                    data = {
                        result_msg:'OK',
                        result
                    }
                
                }
            })
            connection.release()
        })
    }) 
    res.json({data:'test'})

}

module.exports = {
    deal_post
}