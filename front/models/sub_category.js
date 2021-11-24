const Sequelize = require('sequelize')
const moment = require('moment')

module.exports = class SubCategory extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            main_category_idx:{
                type:Sequelize.INTEGER,
            },
            item_code:{
                type:Sequelize.STRING(100),
            },
            sub_category_code:{
                type:Sequelize.STRING(100), 
            },
            sub_category_name:{
                type:Sequelize.STRING(30),
            },
        },{
            sequelize,
            timestamps:false,
            modelName:'Sub_category',
            tableName:'sub_category',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
    static associate(db){
        db.SubCategory.belongsTo(db.Category,{foreignKey:'main_category_idx',targetKey:'id'})
    }
}