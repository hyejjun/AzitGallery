const Sequelize = require('sequelize');
const moment = require('moment');

module.exports = class Category extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            main_category_code:{
                type:Sequelize.INTEGER,
                comment:'01 02 03 04 05...',
                unique:true
            },
            category_name:{
                type:Sequelize.STRING(20),
                comment:'상의 하의 원피스 잡화 신발...',
                unique:true
            },
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            modelName:'Category',
            tableName:'category',
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
    static associate(db){
        db.Category.hasMany(db.ItemInfo,{foreignKey:'category_id',sourceKey:'id'}),
        db.Category.hasMany(db.SubCategory,{foreignKey:'main_category_idx',sourceKey:'id'})
    }
}

