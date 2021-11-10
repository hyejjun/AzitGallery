const Sequelize = require('sequelize')
const moment = require('moment')

// 추후 상품id 추가할 것
module.exports = class OrderDetail extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            size:{
                type:Sequelize.STRING(30),
                defaultValue:'one size'
            },
            color:{
                type:Sequelize.STRING(30),
                defaultValue:'one color'
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
            },
            order_num:{
                type:Sequelize.INTEGER,
                autoIncrement:true,
                primaryKey:true,
            },
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
        db.OrderDetail.hasOne(db.Orders,{foreignKey:'order_num',targetKey:'order_num'}),
        db.OrderDetail.belongsTo(db.ItemInfo,{foreignKey:'item_id',targetKey:'item_id'})
    }
}
