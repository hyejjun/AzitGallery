const Sequelize = require('sequelize')
const moment = require('moment')

// 추후 상품id 추가할 것
module.exports = class ItemDetail extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            nft_idx:{
                type:Sequelize.INTEGER,
                allowNull:false,
                autoIncrement:true,
                primaryKey:true
            },
            item_info_idx:{
                type:Sequelize.INTEGER,
                allowNull:false,
            },
            size:{
                type:Sequelize.STRING(30),
                defaultValue:'one size'
            },
            color:{
                type:Sequelize.STRING(30),
                defaultValue:'one color'
            },
            qty:{
                type:Sequelize.INTEGER
            },
            item_code:{
                type:Sequelize.STRING(100),
                comment:'item_info에서 받은 item_code + size와 color별 index를 덧붙임',
                unique:true
            },
            product_status:{
                type:Sequelize.STRING,
                comment:'현재 판매 중 인지 여부'
            },
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            modelName:'Item_detail',
            tableName:'item_detail',
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
    static associate(db){
        db.ItemDetail.belongsTo(db.ItemInfo,{foreignKey:'item_info_idx',targetKey:'item_id'}),
        db.ItemDetail.hasMany(db.Nft,{foreignKey:'nft_img_idx',sourceKey:'nft_idx'})
    }
}
