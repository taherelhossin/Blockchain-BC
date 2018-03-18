var MyToken = artifacts.require("./TataToken.sol");

module.exports = function(deployer) {
  deployer.deploy(MyToken,['El-3ar', 'El-keef', 'Inception']/*, {gas: 6700000}*/);
};
