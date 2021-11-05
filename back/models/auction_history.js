const Sequelize = require('sequelize')

module.exports = class AuctionHistory extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            auc_history_idx:{
                type:Sequelize.INTEGER,
            },
            bidder:{
                type:Sequelize.STRING(20),
            },
            bid_date:{
                type:Sequelize.DATE,
                defaultValue:Sequelize.NOW,
                get:function(){
                    return moment(this.getDataValue('date')).format('YYYY-MM-DD-hh-mm-dd')
                }                
            },
            bid_price:{
                type:Sequelize.STRING(20),
            },
            start_price:{
                type:Sequelize.STRING(20),
            }           
        },{
            sequelize,
            timestamps:true,
            modelName:'Auction_history',
            tableName:'auction_history',
            paranoid:true,
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
    static associate(db){
       db.AuctionHistory.belongsTo(db.Auction,{foreignKey:'auc_history_idx',targetKey:'auction_idx'})
    }
}