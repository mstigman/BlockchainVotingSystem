const VotingSystem = artifacts.require("VotingSystem");
const ThrowProxy = artifacts.require("ThrowProxy");
const testVotingSystem = artifacts.require("testVotingSystem");

module.exports = function(deployer) {
  deployer.deploy(VotingSystem);
  deployer.deploy(testVotingSystem);
  //deployer.deploy(ThrowProxy);
};
