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
                defaultValue:sequelize.literal('now()'),               
            },
            bid_price:{
                type:Sequelize.STRING(20),
            },
            currency:{
                type:Sequelize.STRING(30)
            },          
        },{
            sequelize,
            timestamps:false,
            modelName:'Auction_history',
            tableName:'auction_history',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
    static associate(db){
       db.AuctionHistory.belongsTo(db.Auction,{foreignKey:'auc_history_idx',targetKey:'auction_idx'})
    }
}