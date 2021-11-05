const Sequelize = require('sequelize')
const moment = require('moment')

module.exports = class Seller extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            user_idx:{
                type:Sequelize.INTEGER,
            },
            seller_code:{
                type:Sequelize.STRING(200),
            },
            admin_approval:{
                type:Sequelize.INTEGER,     // 1: 신청 2: 승인 3: 반려
            },
            email_validation:{
                type:Sequelize.BOOLEAN,
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

    }
}