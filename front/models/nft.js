const Sequelize = require('sequelize')
const moment = require('moment')

module.exports = class Nft extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            nft_img_idx:{
                type:Sequelize.INTEGER,
            },
            nft_img:{
                type:Sequelize.TEXT,
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            modelName:'Nft',
            tableName:'nft',
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
    static associate(db){
        db.Nft.belongsTo(db.ItemDetail,{foreignKey:'nft_img_idx',targetKey:'nft_idx'})
    }
}