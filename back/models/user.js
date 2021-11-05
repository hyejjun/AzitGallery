const Sequelize = require('sequelize')
const moment = require('moment')

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            user_idx:{
                type:Sequelize.INTEGER,
                autoIncrement:true,
                primaryKey:true,
                unique:true
            },
            name:{
                type:Sequelize.STRING(30),
                defaultValue : 'aaaaaaaaaa'
            },
            kaikas_address:{
                type:Sequelize.STRING(100),
            },
            contact : {
                type : Sequelize.STRING(100),
            },
            address : {
                type : Sequelize.STRING(100),
            },
            join_date:{
                type:Sequelize.DATE,
                defaultValue:Sequelize.NOW,
                get:function(){
                    return moment(this.getDataValue('date')).format('YYYY-MM-DD-hh-mm-dd')
                }     
            },
            email : {
                type : Sequelize.STRING(100),
            }
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

    }
}