const Sequelize = require('sequelize')

module.exports = class DirectDeal extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            direct_deal_idx:{
                type:Sequelize.INTEGER,
                primaryKey:true,
                unique:true
            },
            item_code : {
                type:Sequelize.STRING(100),
            },
            price:{
                type:Sequelize.STRING(20),
            },
            start_date:{
                type:Sequelize.DATE,
                defaultValue:Sequelize.NOW,
                get:function(){
                    return moment(this.getDataValue('date')).format('YYYY-MM-DD-hh-mm-dd')
                }     
            }               
        },{
            sequelize,
            timestamps:true,
            modelName:'Direct_deal',
            tableName:'direct_deal',
            paranoid:true,
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
    static associate(db){
        db.DirectDeal.belongsTo(db.ItemInfo,{foreignKey:'direct_deal_idx',targetKey:'item_info_idx'})
    }
}