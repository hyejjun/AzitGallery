const Sequelize = require('sequelize')
const moment = require('moment')
const { STRING } = require('sequelize')

// 추후 상품id 추가할 것
module.exports = class ItemInfo extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            creator:{
                type:Sequelize.INTEGER(30),
                allowNull:false,
                comment:'useridx',
            },
            item_id:{
                type:Sequelize.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
            item_code:{
                type:Sequelize.STRING(100),
                allowNull:false,
                unique:true
            },
            description:{
                type:Sequelize.TEXT,
                allowNull:false
            },
            title:{
                type:Sequelize.STRING,
                allowNull:false                
            },
            registered_at:{
                type:Sequelize.DATE,
                defaultValue:sequelize.literal('now()'),
            },
            sell_type:{
                type:Sequelize.BOOLEAN,
                comment:'false->즉판 true=>경매'
            },
            item_hits:{
                type:Sequelize.INTEGER(5),
                comment:'해당 상품 조회수',
                allowNull:false,
                defaultValue:0,
            },
            size:{
                type:Sequelize.STRING(255),
                defaultValue:'미정',
            },
            color:{
                type:Sequelize.STRING(255),
                defaultValue:'미정'
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
            modelName:'Item_info',
            tableName:'item_info',
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
    static associate(db){
        db.ItemInfo.belongsTo(db.User,{foreignKey:'creator',targetKey:'user_idx'}),
        db.ItemInfo.belongsTo(db.Category,{foreignKey:'category_id',targetKey:'id'}),
        db.ItemInfo.hasMany(db.ItemImg,{foreignKey:'item_id',sourceKey:'item_id'}),
        db.ItemInfo.hasMany(db.DirectDeal,{foreignKey:'direct_deal_idx',sourceKey:'item_id'}),
        db.ItemInfo.hasMany(db.ItemDetail,{foreignKey:'item_info_idx',sourceKey:'item_id'}),
        db.ItemInfo.hasMany(db.Auction,{foreignKey:'auction_idx',sourceKey:'item_id'}),
        db.ItemInfo.hasMany(db.OrderDetail,{foreignKey:'item_id',sourceKey:'item_id'})
    }
}
