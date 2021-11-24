const Sequelize = require('sequelize')
const moment = require('moment')

module.exports = class LikeList extends Sequelize.Model{
    static init(sequelize){
        return super.init({ 
            user_idx:{
                type:Sequelize.INTEGER,
                allowNull:false
            },
            item_code:{
                type:Sequelize.STRING(100),
            },
            like_date:{
                type:Sequelize.DATE,
                defaultValue:sequelize.literal('now()'),
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            modelName:'Like_list',
            tableName:'like_list',
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
    static associate(db){
        db.LikeList.belongsTo(db.User,{foreignKey:'user_idx',targetKey:'user_idx'})
    }
}
