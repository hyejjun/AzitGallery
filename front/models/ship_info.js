const Sequelize = require('sequelize')
const moment = require('moment')

module.exports = class ShipInfo extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            delivery_company:{
                type:Sequelize.STRING(30),
            },
            post_num:{
                type:Sequelize.STRING(30),      
                // 운송장 번호에서 - 같은게 들어있을 수도 있어서 이렇게 처리합니다.
            },
            order_num:{
                type:Sequelize.INTEGER,
                autoIncrement:true,
                primaryKey:true,
            },
            item_delivery_state:{
                type:Sequelize.STRING(20),      // 배송준비중, 배송중, 배송완료
            },
            order_detail_num:{
                type:Sequelize.INTEGER,
            }
        },{
            sequelize,
            timestamps:false,
            modelName:'Ship_info',
            tableName:'ship_info',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
    static associate(db){
        db.ShipInfo.belongsTo(db.Orders,{foreignKey:'order_num',targetKey:'order_num'})

    }
}