const Sequelize = require('sequelize')
const moment = require('moment')
const { STRING } = require('sequelize')

// 추후 상품id 추가할 것
module.exports = class Order extends Sequelize.Model{
    static init(sequelize){
        return super.init({ 
            price:{
                type:Sequelize.INTEGER(30),
                defaultValue:2
            },
            order_date:{
                type:Sequelize.STRING(30),
            },
            buyer:{
                type:Sequelize.INTEGER,
            },
            receiver_address:{
                type:Sequelize.TEXT,
            },
            receiver_contact:{
                type:Sequelize.INTEGER,
            },
            order_num:{
                type:Sequelize.INTEGER,
            },
            total_order_state:{
                type:Sequelize.INTEGER,
                comment:'전체 배송상황 0:일부상품배송중 /1:전체상품배송완료'
            },
            input_opt:{
                type:Sequelize.INTEGER,
                comment:'배송품 수령처 0:직접 1:문앞 2:무인택배함 3:기타'
            },
            memo:{
                type:Sequelize.TEXT
            }

        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            modelName:'Order',
            tableName:'order',
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
}
