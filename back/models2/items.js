const Sequelize = require('sequelize')
const moment = require('moment')

// 추후 상품id 추가할 것
module.exports = class Item extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            item_id:{
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nft_idx:{
                type: Sequelize.INTEGER,
            },
            creator:{
                type:Sequelize.STRING,
                allowNull:false
            },
            title:{
                type:Sequelize.STRING(100),
            },
            price:{
                type:Sequelize.INTEGER(30),
                allowNull:false,
            },
            // dueDate:{
            //     type:Sequelize.DATE,
            //     allowNull:true,
            // },
            // ifExtended:{ // 경매 연장 여부 옵션; 0=false 1=true
            //     type:Sequelize.INTEGER(1),
            //     allowNull: true,
            // },
            // registeredAt:{
            //     type:Sequelize.DATE,
            //     allowNull:false,
            //     defaultValue:Sequelize.NOW,
            //     get(){
            //         return moment(this.getDataValue('date')).format('Y-M-D')
            //     }
            // },
            description:{
                type:Sequelize.TEXT,
            },
            // itemNft:{
            //     type:Sequelize.STRING(100),
            // },
            count:{
                type:Sequelize.INTEGER
            },
            like_count:{
                type:Sequelize.INTEGER
            },
            sell_type:{
                type:Sequelize.BOOLEAN,
                defaultValue:false,
                comment:'판매경매여부 false->판매 true->경매'
            },
            category:{
                type:Sequelize.STRING,                
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            modelName:'Item',
            tableName:'item',
            charset:'utf8',
            collate:'utf8_general_ci'
        }) 
    }
    static associate(db){
        db.Item.belongsTo(db.User,{foreignKey:'creator',targetKey:'name'}),
        db.Item.hasMany(db.Nft,{foreignKey:'item_idx',sourcekey:'item_id'}),
        db.Item.hasOne(db.Auction,{foreignKey:'product_id',sourceKey:'item_id'}),
        db.Item.hasOne(db.DirectDeal,{foreignKey:'direct_id',sourceKey:'item_id'})
    }

}
