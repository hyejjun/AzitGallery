const Sequelize = require('sequelize')
const moment = require('moment')

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            user_idx:{
                type:Sequelize.INTEGER,
                autoIncrement:true,
                primaryKey:true,
            },
            nick_name:{
                type:Sequelize.STRING(30),
                unique:true
            },
            kaikas_address:{
                type:Sequelize.STRING(100),
                unique:true
            },
            contact : {
                type : Sequelize.STRING(100),
            },
            address : {
                type : Sequelize.STRING(100),
            },
            join_date:{
                type:Sequelize.DATE,
                defaultValue:sequelize.literal('now()'),   
            },
            email : {
                type : Sequelize.STRING(100),
                unique:true
            },
        },{
            sequelize,
            timestamps:false,
            modelName:'User',
            tableName:'user',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
    static associate(db){
        db.User.hasMany(db.ItemInfo,{foreignKey:'creator',sorceKey:'user_idx'}),
        db.User.hasOne(db.Seller,{foreignKey:'user_idx',sourceKey:'user_idx'}),
        db.User.hasMany(db.LikeList,{foreignKey:'user_idx',sourceKey:'user_idx'}),
        db.User.hasMany(db.Orders,{foreignKey:'user_idx',sourceKey:'user_idx'})
    }
}