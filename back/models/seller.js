const Sequelize = require('sequelize')
const moment = require('moment')

module.exports = class Seller extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            user_idx:{
                type:Sequelize.INTEGER,
            },
            admin_approval:{
                type:Sequelize.INTEGER,     // 1: 신청 2: 승인 3: 반려
            },
            email_validation:{
                type:Sequelize.BOOLEAN,
            },
            brand_name:{
                type:Sequelize.STRING
            }
        },{
            sequelize,
            timestamps:false,
            modelName:'Seller',
            tableName:'seller',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
    static associate(db){
        db.Seller.belongsTo(db.User,{foreignKey:'user_idx',targetKey:'user_idx'}),
        db.Seller.hasMany(db.BuyerList,{foreignKey:'sender_idx',sourceKey:'user_idx'})
    }
}