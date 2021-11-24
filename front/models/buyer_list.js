const Sequelize = require('sequelize')
const moment = require('moment')

module.exports = class BuyerList extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            item_code:{
                type:Sequelize.STRING(100),
                allowNull:false,
            },
            buyer_idx:{
                type:Sequelize.INTEGER
            },
            buy_date:{
                type:Sequelize.DATE,
                defaultValue:sequelize.literal('now()'),
            },
            state:{
                type:Sequelize.BOOLEAN,
                defaultValue:false,
                comment:'판매자가 구매자에게 상품을 배송했는지 여부'
            },
            sender_idx:{
                type:Sequelize.INTEGER,
                allowNull:false
            }
        },{
            sequelize,
            timestamps:false,
            modelName:'Buyer_list',
            tableName:'buyer_list',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
    static associate(db){
        db.BuyerList.belongsTo(db.Seller,{foreignKey:'sender_idx',targetKey:'user_idx'})
    }
}