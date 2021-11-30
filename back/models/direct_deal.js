const Sequelize = require('sequelize')

module.exports = class DirectDeal extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            direct_deal_idx:{
                type:Sequelize.INTEGER,
                primaryKey:true,
                unique:true
            },
            price:{
                type:Sequelize.STRING,
            },
            start_date:{
                type:Sequelize.DATE,
                defaultValue:sequelize.literal('now()'),
            },
            currency:{
                type:Sequelize.STRING(30)
            },
                  
        },{
            sequelize,
            timestamps:false,
            modelName:'Direct_deal',
            tableName:'direct_deal',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
    static associate(db){
        db.DirectDeal.belongsTo(db.ItemInfo,{foreignKey:'direct_deal_idx',targetKey:'item_id'})
    }
}