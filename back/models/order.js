const Sequelize = require('sequelize')
const moment = require('moment')
const { STRING } = require('sequelize')

// 추후 상품id 추가할 것
module.exports = class Orders extends Sequelize.Model{
    static init(sequelize){
        return super.init({ 
            total_price:{
                type:Sequelize.INTEGER(30),
                allowNull:false,
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
                primaryKey:true
            },
            final_order_state:{
                type:Sequelize.BOOLEAN,
                comment:'true -> 전체 배송완료시'
            },
            memo:{
                type:Sequelize.TEXT,
                comment:'배송품 수령지 등에 대한 정보 '
            }

        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            modelName:'Orders',
            tableName:'order',
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
    static associate(db){
        db.Orders.hasMany(db.OrderDetail,{foreignKey:'order_detail_id',sourceKey:'order_num'})
    }
}
