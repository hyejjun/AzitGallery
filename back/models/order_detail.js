const Sequelize = require('sequelize')
const moment = require('moment')

// 추후 상품id 추가할 것
module.exports = class OrderDetail extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            size:{
                type:Sequelize.STRING(30),
            },
            color:{
                type:Sequelize.STRING(30),
            },
            order_qty:{
                type:Sequelize.INTEGER,
            },
            shipper_idx:{
                type:Sequelize.INTEGER,
            },
            item_code:{
                type:Sequelize.STRING(100),
            },
            price:{
                type:Sequelize.INTEGER,
                comment:'상품당가격'
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            modelName:'Order_detail',
            tableName:'order_detail',
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
    static associate(db){
        db.OrderDetail.belongsTo(db.Orders,{foreignKey:'order_detail_id',targetKey:'order_num'}),
        db.OrderDetail.hasOne(db.ShipInfo,{foreignKey:'order_num',sourceKey:'order_detail_id'})
    }
}
