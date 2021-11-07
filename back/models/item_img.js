const Sequelize = require('sequelize')
const moment = require('moment')

// 추후 상품id 추가할 것
module.exports = class ItemImg extends Sequelize.Model{
    static init(sequelize){
        return super.init({ 
            item_img_idx:{
                type:Sequelize.INTEGER,
                allowNull:false
            },
            item_img_link:{
                type:Sequelize.TEXT,
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            modelName:'Item_img',
            tableName:'item_img',
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
    static associate(db){
        db.ItemImg.belongsTo(db.ItemInfo,{foreignKey:'item_id',targetKey:'item_id'})
    }
}
