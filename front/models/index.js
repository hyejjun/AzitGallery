'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const AuctionHistory = require('./auction_history');
const Auction = require('./auction');
const Category = require('./category');
const DirectDeal = require('./direct_deal');
const ItemDetail = require('./item_detail');
const ItemImg = require('./item_img');
const ItemInfo = require('./item_info');
const LikeList = require('./like_list');
const OrderDetail = require('./order_detail');
const Orders = require('./orders');
const Seller = require('./seller');
const ShipInfo = require('./ship_info');
const SubCategory = require('./sub_category');
const User = require('./user');
const BuyerList = require('./buyer_list');
const Nft = require('./nft.js')


const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}


db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.Auction = Auction;
db.DirectDeal = DirectDeal;
db.ItemDetail = ItemDetail;
db.ItemImg = ItemImg;
db.LikeList = LikeList;
db.OrderDetail = OrderDetail;
db.Orders = Orders;
db.Seller = Seller;
db.ShipInfo = ShipInfo;
db.SubCategory = SubCategory;
db.User = User;
db.Category = Category;
db.ItemInfo = ItemInfo;
db.AuctionHistory = AuctionHistory;
db.BuyerList = BuyerList;
db.Nft = Nft


Auction.init(sequelize);
DirectDeal.init(sequelize);
ItemDetail.init(sequelize);
ItemImg.init(sequelize);
LikeList.init(sequelize);
Orders.init(sequelize);
OrderDetail.init(sequelize);
Seller.init(sequelize);
ShipInfo.init(sequelize);
SubCategory.init(sequelize);
User.init(sequelize);
Category.init(sequelize);
ItemInfo.init(sequelize);
AuctionHistory.init(sequelize);
BuyerList.init(sequelize);
Nft.init(sequelize);



Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
