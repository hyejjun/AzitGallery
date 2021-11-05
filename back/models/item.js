const Sequelize = require('sequelize')
const moment = require('moment')

// 추후 상품id 추가할 것
module.exports = class Item extends Sequelize.Model{
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
            gender:{
                type:Sequelize.STRING,
                comment:'남 / 여 / 남녀공용'
            },
            season:{
                type:Sequelize.INTEGER,
                comment:'계절 // 봄, 여름, 가을, 겨울'
            },
            age:{
                type:Sequelize.INTEGER,
                comment:'0:0~10/1:10~20/2:20~30/3:30~40/4:40~'
            },
            item_code:{
                type:Sequelize.STRING(100),
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
        db.Item.belongsTo(db.User,{foreignKey:'creator',targetKey:'user_idx'}),
        db.Item.belongsTo(db.Category,{foreignKey:'item_id',targetKey:'id'})
        db.Item.hasOne(db.ItemInfo,{foreignKey:'item_info_idx',sourceKey:'item_id'})
    }
}
