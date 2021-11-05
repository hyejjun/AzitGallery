const Sequelize = require('sequelize')
const moment = require('moment')
const { STRING } = require('sequelize')

// 추후 상품id 추가할 것
module.exports = class ItemInfo extends Sequelize.Model{
    static init(sequelize){
        return super.init({ 
            item_info_idx:{
                type:Sequelize.INTEGER,
                allowNull:false,
                primaryKey:true
            },
            description:{
                type:Sequelize.TEXT,
            },
            title:{
                type:Sequelize.STRING,
            },
            registered_at:{
                type:Sequelize.DATE,
                defaultValue:Sequelize.NOW
            },
            sell_type:{
                type:Sequelize.BOOLEAN,
                comment:'false->즉판 true=>경매'
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
        db.ItemInfo.belongsTo(db.Item,{foreignKey:'item_info_idx',targetKey:'item_id'}),
        db.ItemInfo.hasMany(db.ItemImg,{foreignKey:'item_info_idx',sourceKey:'item_info_idx'}),
        db.ItemInfo.hasMany(db.DirectDeal,{foreignKey:'direct_deal_idx',sourceKey:'item_info_idx'}),
        db.ItemInfo.hasMany(db.ItemDetail,{foreignKey:'item_info_idx',sourceKey:'item_info_idx'}),
        db.ItemInfo.hasMany(db.Auction,{foreignKey:'auction_idx',sourceKey:'item_info_idx'})
    }
}
