const Sequelize = require('sequelize')

module.exports = class Auction extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            auction_idx:{
                type:Sequelize.INTEGER,
            },
            end_date:{
                type:Sequelize.DATE,
            },
            if_extended:{
                type:Sequelize.BOOLEAN,
            },
            start_date:{
                type:Sequelize.DATE,    
            }           
        },{
            sequelize,
            timestamps:true,
            modelName:'Auction',
            tableName:'auction',
            paranoid:true,
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
    static associate(db){

    }
}