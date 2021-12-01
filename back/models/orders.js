const Sequelize = require('sequelize')
const moment = require('moment')
const { STRING } = require('sequelize')

// 추후 상품id 추가할 것
module.exports = class Orders extends Sequelize.Model{
    static init(sequelize){
        return super.init({ 
            total_price:{
                type:Sequelize.STRING(20),
                allowNull:false,
            },
            order_date:{
                type:Sequelize.DATE,
                defaultValue:sequelize.literal('now()'),
            },
            buyer:{
                type:Sequelize.STRING(30),
            },
            receiver:{
                type:Sequelize.STRING(30),
            },
            receiver_address:{
                type:Sequelize.STRING(50),
            },
            receiver_contact:{
                type:Sequelize.STRING(30),
            },
            order_num:{
                type:Sequelize.INTEGER,
                autoIncrement:true,
                primaryKey:true,
            },
            final_order_state:{
                type:Sequelize.STRING(30),
                comment:'배송준비중/송장접수/배송시작/배송중/배송완료'
            },
            memo:{
                type:Sequelize.STRING(50),
                comment:'배송품 수령지 등에 대한 정보 '
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            modelName:'Orders',
            tableName:'orders',
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
    static associate(db){
        db.Orders.hasMany(db.OrderDetail,{foreignKey:'order_num',sourceKey:'order_num'}),
        db.Orders.belongsTo(db.User,{foreignKey:'user_idx',targetKey:'user_idx'}),
        db.Orders.hasMany(db.ShipInfo,{foreignKey:'order_num',sourceKey:'order_num'})
    }
}
