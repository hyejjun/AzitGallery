const Migrations = artifacts.require("./Migrations.sol");
const MyERC20 = artifacts.require("./MyERC20.sol");
module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(MyERC20, 'EPIEPITEOMTOKEN', 'EPI', 8);
};