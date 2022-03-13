const LendHandNFT = artifacts.require("LendHandNFT");

module.exports = function (deployer) {
  deployer.deploy(LendHandNFT);
};
