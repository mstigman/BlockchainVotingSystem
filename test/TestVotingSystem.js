const VotingSystem = artifacts.require("VotingSystem");
const testVotingSystem = artifacts.require("testVotingSystem");
const ThrowProxy = artifacts.require("ThrowProxy");


// contract('VotingSystemTestSuccess', (accounts) => {
//   it('should add a committee member', async () => {
//     let owner = accounts[0];
//     let committee1 = accounts[1];
//     let committee2 = accounts[2];
//     let committee3 = accounts[3];
//     let committee4 = accounts[4];
//     let committee5 = accounts[5];


//     const VotingSystemInstance = await VotingSystem.deployed();
//     await VotingSystemInstance.addCommittee(committee1, {from: owner});
//     await VotingSystemInstance.addCommittee(committee2, {from: owner});
//     await VotingSystemInstance.addCommittee(committee3, {from: owner});
//     await VotingSystemInstance.addCommittee(committee4, {from: owner});
//     await VotingSystemInstance.addCommittee(committee5, {from: owner});

//     check = await VotingSystemInstance.queryCommittee(committee1);

//     assert.equal(check, true, "committee member not added");
//   });

//   it("should begin registration", async () => {
//     let owner = accounts[0];
//     const VotingSystemInstance = await VotingSystem.deployed();

//     await VotingSystemInstance.beginRegistration({from: owner});

//     state = await VotingSystemInstance.queryStateInt();
//     assert.equal(state.valueOf(), 1, "the state was not changed");
//   })

//   it("should add a voter", async () => {
//     let owner = accounts[0];
//     let voter1 = accounts[1];
//     let voter2 = accounts[2];
//     let voter3 = accounts[3];
//     let voter4 = accounts[4];
//     let voter5 = accounts[5];
//     let voter6 = accounts[6];

//     const VotingSystemInstance = await VotingSystem.deployed();

//     await VotingSystemInstance.addVoter({from: voter1});
//     await VotingSystemInstance.addVoter({from: voter2});
//     await VotingSystemInstance.addVoter({from: voter3});
//     await VotingSystemInstance.addVoter({from: voter4});
//     await VotingSystemInstance.addVoter({from: voter5});
//     await VotingSystemInstance.addVoter({from: voter6});

//     confirmed = await VotingSystemInstance.queryIsRegistered({from: voter1});
//     voterCount = await VotingSystemInstance.queryNumberVoters();

//     assert.equal(confirmed, true, "the voter was not registered");
//     assert.equal(voterCount, 6, "count was not updated correctly");
//   })

//   it("should initialize voting", async () => {

//     let committee = accounts[1];
//     const VotingSystemInstance = await VotingSystem.deployed();

//     await VotingSystemInstance.initializeVoting({from: committee});

//     state = await VotingSystemInstance.queryStateInt();

//     assert.equal(state, 2, "the state was not updated");
//   })

//   it("should confirm voting", async () => {
//     let committee1 = accounts[1];
//     let committee2 = accounts[2];
//     let committee3 = accounts[3];
//     let committee4 = accounts[4];
//     let committee5 = accounts[5];

//     const VotingSystemInstance = await VotingSystem.deployed();

//     await VotingSystemInstance.confirmVoting({from: committee1});
//     state = await VotingSystemInstance.queryStateInt();
//     assert.equal(state, 2, "the state updated without enough votes");

//     await VotingSystemInstance.confirmVoting({from: committee2});
//     state = await VotingSystemInstance.queryStateInt();
//     assert.equal(state, 2, "the state updated without enough votes");

//     await VotingSystemInstance.denyVoting({from: committee4});
//     state = await VotingSystemInstance.queryStateInt();
//     assert.equal(state, 2, "the state updated after a terminate vote");

//     await VotingSystemInstance.confirmVoting({from: committee5});
//     state = await VotingSystemInstance.queryStateInt();
//     assert.equal(state, 3, "the state didnt update with proper votes");
//   })

//   it("should vote", async () => {
//     let voter = accounts[1];
//     let canidate = accounts[4];

//     const VotingSystemInstance = await VotingSystem.deployed();

//     await VotingSystemInstance.vote(canidate, {from: voter});

//     topPlace = await VotingSystemInstance.queryCurrentFirst();
//     noVote = await VotingSystemInstance.queryIsRegistered({from: voter});

//     assert.equal(topPlace, canidate, "the vote was not counted correctly");
//     assert.equal(noVote, false, "the voter can more than once");

//   })

//   it("should vote for 2 canidates and end vote", async () => {
//     let voter2 = accounts[2];
//     let voter3 = accounts[3];
//     let voter4 = accounts[4];
//     let voter5 = accounts[5];
//     let voter6 = accounts[6];

//     let canidate1 = accounts[4];
//     let canidate2 = accounts[5];


//     const VotingSystemInstance = await VotingSystem.deployed();

//     await VotingSystemInstance.vote(canidate2, {from: voter2})
//     topPlace = await VotingSystemInstance.queryCurrentFirst();
//     secondPlace = await VotingSystemInstance.queryCurrentSecond();
//     assert.equal(topPlace, canidate1, "the vote was not counted correctly");
//     assert.equal(secondPlace, canidate2, "the canidates places were not updated correctly");

//     await VotingSystemInstance.vote(canidate2, {from: voter3})
//     topPlace = await VotingSystemInstance.queryCurrentFirst();
//     secondPlace = await VotingSystemInstance.queryCurrentSecond();
//     assert.equal(topPlace, canidate2, "the vote was not counted correctly");
//     assert.equal(secondPlace, canidate1, "the canidates places were not updated correctly");

//     await VotingSystemInstance.vote(canidate1, {from: voter4})
//     topPlace = await VotingSystemInstance.queryCurrentFirst();
//     secondPlace = await VotingSystemInstance.queryCurrentSecond();
//     assert.equal(topPlace, canidate2, "the vote was not counted correctly");
//     assert.equal(secondPlace, canidate1, "the canidates places were not updated correctly");

//     await VotingSystemInstance.vote(canidate1, {from: voter5})
//     topPlace = await VotingSystemInstance.queryCurrentFirst();
//     secondPlace = await VotingSystemInstance.queryCurrentSecond();
//     assert.equal(topPlace, canidate1, "the vote was not counted correctly");
//     assert.equal(secondPlace, canidate2, "the canidates places were not updated correctly");

//     await VotingSystemInstance.vote(canidate1, {from: voter6})
//     topPlace = await VotingSystemInstance.queryCurrentFirst();
//     secondPlace = await VotingSystemInstance.queryCurrentSecond();
//     assert.equal(topPlace, canidate1, "the vote was not counted correctly");
//     assert.equal(secondPlace, canidate2, "the canidates places were not updated correctly");

//     state = await VotingSystemInstance.queryStateInt();
//     assert.equal(state, 4, "the voting didnt end");

//     winner = await VotingSystemInstance.getWinner();
//     assert.equal(winner, canidate1, "the correct canidate didnt win");

//   })
// });


contract('VotingSystemFullTest', (accounts) => {

it('should set up the contract', async () => {{
             let votingSystemInst = await VotingSystem.deployed();
             let testVotingSystemInst = await testVotingSystem.deployed();
             let committeeMember = await ThrowProxy.new(votingSystemInst.address);
             let adminUser = await ThrowProxy.new(votingSystemInst.address);
             let noneUser = await ThrowProxy.new(votingSystemInst.address);
             let committee = "committee";
             let admin = "admin";
             let none = "none";
             await votingSystemInst.addCommittee(committeeMember.address, {from: accounts[0]});
             await votingSystemInst.changeAdmin(adminUser.address, {from: accounts[0]});
             await testVotingSystemInst.setUser(committee, committeeMember.address);
             await testVotingSystemInst.setUser(admin, adminUser.address);
             await testVotingSystemInst.setUser(none, noneUser.address);
 }});


it('should fail AddCommittee called by committee in state STATE_ADD_COMMITTEE', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddCommittee.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call AddCommittee in state STATE_ADD_COMMITTEE successfully");

  });


it('should fail AddCommittee called by none in state STATE_ADD_COMMITTEE', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddCommittee.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call AddCommittee in state STATE_ADD_COMMITTEE successfully");

  });


it('should fail BeginRegistration called by committee in state STATE_ADD_COMMITTEE', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testBeginRegistration.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call BeginRegistration in state STATE_ADD_COMMITTEE successfully");

  });


it('should fail BeginRegistration called by none in state STATE_ADD_COMMITTEE', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testBeginRegistration.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call BeginRegistration in state STATE_ADD_COMMITTEE successfully");

  });


it('should fail AddVoter called by admin in state STATE_ADD_COMMITTEE', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddVoter.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call AddVoter in state STATE_ADD_COMMITTEE successfully");

  });


it('should fail AddVoter called by committee in state STATE_ADD_COMMITTEE', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddVoter.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call AddVoter in state STATE_ADD_COMMITTEE successfully");

  });


it('should fail AddVoter called by none in state STATE_ADD_COMMITTEE', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddVoter.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call AddVoter in state STATE_ADD_COMMITTEE successfully");

  });


it('should fail InitializeVoting called by admin in state STATE_ADD_COMMITTEE', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testInitializeVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call InitializeVoting in state STATE_ADD_COMMITTEE successfully");

  });


it('should fail InitializeVoting called by committee in state STATE_ADD_COMMITTEE', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testInitializeVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call InitializeVoting in state STATE_ADD_COMMITTEE successfully");

  });


it('should fail InitializeVoting called by none in state STATE_ADD_COMMITTEE', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testInitializeVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call InitializeVoting in state STATE_ADD_COMMITTEE successfully");

  });


it('should fail ConfirmVoting called by admin in state STATE_ADD_COMMITTEE', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testConfirmVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call ConfirmVoting in state STATE_ADD_COMMITTEE successfully");

  });


it('should fail ConfirmVoting called by committee in state STATE_ADD_COMMITTEE', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testConfirmVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call ConfirmVoting in state STATE_ADD_COMMITTEE successfully");

  });


it('should fail ConfirmVoting called by none in state STATE_ADD_COMMITTEE', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testConfirmVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call ConfirmVoting in state STATE_ADD_COMMITTEE successfully");

  });


it('should fail DenyVoting called by admin in state STATE_ADD_COMMITTEE', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testDenyVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call DenyVoting in state STATE_ADD_COMMITTEE successfully");

  });


it('should fail DenyVoting called by committee in state STATE_ADD_COMMITTEE', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testDenyVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call DenyVoting in state STATE_ADD_COMMITTEE successfully");

  });


it('should fail DenyVoting called by none in state STATE_ADD_COMMITTEE', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testDenyVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call DenyVoting in state STATE_ADD_COMMITTEE successfully");

  });


it('should fail Vote called by admin in state STATE_ADD_COMMITTEE', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testVote.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call Vote in state STATE_ADD_COMMITTEE successfully");

  });


it('should fail Vote called by committee in state STATE_ADD_COMMITTEE', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testVote.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call Vote in state STATE_ADD_COMMITTEE successfully");

  });


it('should fail Vote called by none in state STATE_ADD_COMMITTEE', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testVote.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call Vote in state STATE_ADD_COMMITTEE successfully");

  });


it('should set the state to registration', async () => {{
             let votingSystemInst = await VotingSystem.deployed();
             let testVotingSystemInst = await testVotingSystem.deployed();
             let changeState = await testVotingSystemInst.testBeginRegistration("admin", accounts[0]);
             let state = await votingSystemInst.queryState();
             assert.equal(state, "registration of voters", "the state was changed incorrectly");
             let voterUser = await ThrowProxy.new(votingSystemInst.address);
             let voter = "voter";
             await testVotingSystemInst.setUser(voter, voterUser.address);
             await testVotingSystemInst.testAddVoter(voter, accounts[0]);

 }});


it('should fail AddCommittee called by admin in state STATE_REGISTRATION', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddCommittee.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call AddCommittee in state STATE_REGISTRATION successfully");

  });


it('should fail AddCommittee called by committee in state STATE_REGISTRATION', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddCommittee.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call AddCommittee in state STATE_REGISTRATION successfully");

  });


it('should fail AddCommittee called by voter in state STATE_REGISTRATION', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "voter";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddCommittee.call(user, usedInFunction.address);
    assert.equal(check, false, "voter was able to call AddCommittee in state STATE_REGISTRATION successfully");

  });


it('should fail AddCommittee called by none in state STATE_REGISTRATION', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddCommittee.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call AddCommittee in state STATE_REGISTRATION successfully");

  });


it('should fail BeginRegistration called by admin in state STATE_REGISTRATION', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testBeginRegistration.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call BeginRegistration in state STATE_REGISTRATION successfully");

  });


it('should fail BeginRegistration called by committee in state STATE_REGISTRATION', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testBeginRegistration.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call BeginRegistration in state STATE_REGISTRATION successfully");

  });


it('should fail BeginRegistration called by voter in state STATE_REGISTRATION', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "voter";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testBeginRegistration.call(user, usedInFunction.address);
    assert.equal(check, false, "voter was able to call BeginRegistration in state STATE_REGISTRATION successfully");

  });


it('should fail BeginRegistration called by none in state STATE_REGISTRATION', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testBeginRegistration.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call BeginRegistration in state STATE_REGISTRATION successfully");

  });


it('should fail AddVoter called by voter in state STATE_REGISTRATION', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "voter";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddVoter.call(user, usedInFunction.address);
    assert.equal(check, false, "voter was able to call AddVoter in state STATE_REGISTRATION successfully");

  });


it('should fail InitializeVoting called by admin in state STATE_REGISTRATION', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testInitializeVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call InitializeVoting in state STATE_REGISTRATION successfully");

  });


it('should fail InitializeVoting called by voter in state STATE_REGISTRATION', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "voter";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testInitializeVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "voter was able to call InitializeVoting in state STATE_REGISTRATION successfully");

  });


it('should fail InitializeVoting called by none in state STATE_REGISTRATION', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testInitializeVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call InitializeVoting in state STATE_REGISTRATION successfully");

  });


it('should fail ConfirmVoting called by admin in state STATE_REGISTRATION', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testConfirmVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call ConfirmVoting in state STATE_REGISTRATION successfully");

  });


it('should fail ConfirmVoting called by committee in state STATE_REGISTRATION', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testConfirmVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call ConfirmVoting in state STATE_REGISTRATION successfully");

  });


it('should fail ConfirmVoting called by voter in state STATE_REGISTRATION', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "voter";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testConfirmVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "voter was able to call ConfirmVoting in state STATE_REGISTRATION successfully");

  });


it('should fail ConfirmVoting called by none in state STATE_REGISTRATION', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testConfirmVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call ConfirmVoting in state STATE_REGISTRATION successfully");

  });


it('should fail DenyVoting called by admin in state STATE_REGISTRATION', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testDenyVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call DenyVoting in state STATE_REGISTRATION successfully");

  });


it('should fail DenyVoting called by committee in state STATE_REGISTRATION', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testDenyVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call DenyVoting in state STATE_REGISTRATION successfully");

  });


it('should fail DenyVoting called by voter in state STATE_REGISTRATION', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "voter";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testDenyVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "voter was able to call DenyVoting in state STATE_REGISTRATION successfully");

  });


it('should fail DenyVoting called by none in state STATE_REGISTRATION', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testDenyVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call DenyVoting in state STATE_REGISTRATION successfully");

  });


it('should fail Vote called by admin in state STATE_REGISTRATION', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testVote.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call Vote in state STATE_REGISTRATION successfully");

  });


it('should fail Vote called by committee in state STATE_REGISTRATION', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testVote.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call Vote in state STATE_REGISTRATION successfully");

  });


it('should fail Vote called by voter in state STATE_REGISTRATION', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "voter";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testVote.call(user, usedInFunction.address);
    assert.equal(check, false, "voter was able to call Vote in state STATE_REGISTRATION successfully");

  });


it('should fail Vote called by none in state STATE_REGISTRATION', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testVote.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call Vote in state STATE_REGISTRATION successfully");

  });


it('should set the state to prevoting', async () => {{
             let votingSystemInst = await VotingSystem.deployed();
             let testVotingSystemInst = await testVotingSystem.deployed();
             await testVotingSystemInst.testInitializeVoting("committee", accounts[0]);
             let state = await votingSystemInst.queryState();
             assert.equal(state, "prevoting verification", "the state was changed incorrectly");
 }});


it('should fail AddCommittee called by admin in state STATE_PREVOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddCommittee.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call AddCommittee in state STATE_PREVOTING successfully");

  });


it('should fail AddCommittee called by committee in state STATE_PREVOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddCommittee.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call AddCommittee in state STATE_PREVOTING successfully");

  });


it('should fail AddCommittee called by voter in state STATE_PREVOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "voter";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddCommittee.call(user, usedInFunction.address);
    assert.equal(check, false, "voter was able to call AddCommittee in state STATE_PREVOTING successfully");

  });


it('should fail AddCommittee called by none in state STATE_PREVOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddCommittee.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call AddCommittee in state STATE_PREVOTING successfully");

  });


it('should fail BeginRegistration called by admin in state STATE_PREVOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testBeginRegistration.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call BeginRegistration in state STATE_PREVOTING successfully");

  });


it('should fail BeginRegistration called by committee in state STATE_PREVOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testBeginRegistration.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call BeginRegistration in state STATE_PREVOTING successfully");

  });


it('should fail BeginRegistration called by voter in state STATE_PREVOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "voter";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testBeginRegistration.call(user, usedInFunction.address);
    assert.equal(check, false, "voter was able to call BeginRegistration in state STATE_PREVOTING successfully");

  });


it('should fail BeginRegistration called by none in state STATE_PREVOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testBeginRegistration.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call BeginRegistration in state STATE_PREVOTING successfully");

  });


it('should fail AddVoter called by admin in state STATE_PREVOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddVoter.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call AddVoter in state STATE_PREVOTING successfully");

  });


it('should fail AddVoter called by committee in state STATE_PREVOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddVoter.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call AddVoter in state STATE_PREVOTING successfully");

  });


it('should fail AddVoter called by voter in state STATE_PREVOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "voter";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddVoter.call(user, usedInFunction.address);
    assert.equal(check, false, "voter was able to call AddVoter in state STATE_PREVOTING successfully");

  });


it('should fail AddVoter called by none in state STATE_PREVOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddVoter.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call AddVoter in state STATE_PREVOTING successfully");

  });


it('should fail InitializeVoting called by admin in state STATE_PREVOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testInitializeVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call InitializeVoting in state STATE_PREVOTING successfully");

  });


it('should fail InitializeVoting called by committee in state STATE_PREVOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testInitializeVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call InitializeVoting in state STATE_PREVOTING successfully");

  });


it('should fail InitializeVoting called by voter in state STATE_PREVOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "voter";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testInitializeVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "voter was able to call InitializeVoting in state STATE_PREVOTING successfully");

  });


it('should fail InitializeVoting called by none in state STATE_PREVOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testInitializeVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call InitializeVoting in state STATE_PREVOTING successfully");

  });


it('should fail ConfirmVoting called by admin in state STATE_PREVOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testConfirmVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call ConfirmVoting in state STATE_PREVOTING successfully");

  });


it('should fail ConfirmVoting called by voter in state STATE_PREVOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "voter";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testConfirmVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "voter was able to call ConfirmVoting in state STATE_PREVOTING successfully");

  });


it('should fail ConfirmVoting called by none in state STATE_PREVOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testConfirmVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call ConfirmVoting in state STATE_PREVOTING successfully");

  });


it('should fail DenyVoting called by admin in state STATE_PREVOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testDenyVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call DenyVoting in state STATE_PREVOTING successfully");

  });


it('should fail DenyVoting called by voter in state STATE_PREVOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "voter";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testDenyVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "voter was able to call DenyVoting in state STATE_PREVOTING successfully");

  });


it('should fail DenyVoting called by none in state STATE_PREVOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testDenyVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call DenyVoting in state STATE_PREVOTING successfully");

  });


it('should fail Vote called by admin in state STATE_PREVOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testVote.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call Vote in state STATE_PREVOTING successfully");

  });


it('should fail Vote called by committee in state STATE_PREVOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testVote.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call Vote in state STATE_PREVOTING successfully");

  });


it('should fail Vote called by voter in state STATE_PREVOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "voter";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testVote.call(user, usedInFunction.address);
    assert.equal(check, false, "voter was able to call Vote in state STATE_PREVOTING successfully");

  });


it('should fail Vote called by none in state STATE_PREVOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testVote.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call Vote in state STATE_PREVOTING successfully");

  });


it('should set the state to voting', async () => {{
             let votingSystemInst = await VotingSystem.deployed();
             let testVotingSystemInst = await testVotingSystem.deployed();
             await testVotingSystemInst.testConfirmVoting("committee", accounts[0]);
             let state = await votingSystemInst.queryState();
             assert.equal(state, "voting phase", "the state was changed incorrectly");
 }});


it('should fail AddCommittee called by admin in state STATE_VOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddCommittee.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call AddCommittee in state STATE_VOTING successfully");

  });


it('should fail AddCommittee called by committee in state STATE_VOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddCommittee.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call AddCommittee in state STATE_VOTING successfully");

  });


it('should fail AddCommittee called by voter in state STATE_VOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "voter";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddCommittee.call(user, usedInFunction.address);
    assert.equal(check, false, "voter was able to call AddCommittee in state STATE_VOTING successfully");

  });


it('should fail AddCommittee called by none in state STATE_VOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddCommittee.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call AddCommittee in state STATE_VOTING successfully");

  });


it('should fail BeginRegistration called by admin in state STATE_VOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testBeginRegistration.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call BeginRegistration in state STATE_VOTING successfully");

  });


it('should fail BeginRegistration called by committee in state STATE_VOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testBeginRegistration.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call BeginRegistration in state STATE_VOTING successfully");

  });


it('should fail BeginRegistration called by voter in state STATE_VOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "voter";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testBeginRegistration.call(user, usedInFunction.address);
    assert.equal(check, false, "voter was able to call BeginRegistration in state STATE_VOTING successfully");

  });


it('should fail BeginRegistration called by none in state STATE_VOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testBeginRegistration.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call BeginRegistration in state STATE_VOTING successfully");

  });


it('should fail AddVoter called by admin in state STATE_VOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddVoter.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call AddVoter in state STATE_VOTING successfully");

  });


it('should fail AddVoter called by committee in state STATE_VOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddVoter.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call AddVoter in state STATE_VOTING successfully");

  });


it('should fail AddVoter called by voter in state STATE_VOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "voter";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddVoter.call(user, usedInFunction.address);
    assert.equal(check, false, "voter was able to call AddVoter in state STATE_VOTING successfully");

  });


it('should fail AddVoter called by none in state STATE_VOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddVoter.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call AddVoter in state STATE_VOTING successfully");

  });


it('should fail InitializeVoting called by admin in state STATE_VOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testInitializeVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call InitializeVoting in state STATE_VOTING successfully");

  });


it('should fail InitializeVoting called by committee in state STATE_VOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testInitializeVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call InitializeVoting in state STATE_VOTING successfully");

  });


it('should fail InitializeVoting called by voter in state STATE_VOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "voter";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testInitializeVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "voter was able to call InitializeVoting in state STATE_VOTING successfully");

  });


it('should fail InitializeVoting called by none in state STATE_VOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testInitializeVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call InitializeVoting in state STATE_VOTING successfully");

  });


it('should fail ConfirmVoting called by admin in state STATE_VOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testConfirmVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call ConfirmVoting in state STATE_VOTING successfully");

  });


it('should fail ConfirmVoting called by committee in state STATE_VOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testConfirmVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call ConfirmVoting in state STATE_VOTING successfully");

  });


it('should fail ConfirmVoting called by voter in state STATE_VOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "voter";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testConfirmVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "voter was able to call ConfirmVoting in state STATE_VOTING successfully");

  });


it('should fail ConfirmVoting called by none in state STATE_VOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testConfirmVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call ConfirmVoting in state STATE_VOTING successfully");

  });


it('should fail DenyVoting called by admin in state STATE_VOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testDenyVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call DenyVoting in state STATE_VOTING successfully");

  });


it('should fail DenyVoting called by committee in state STATE_VOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testDenyVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call DenyVoting in state STATE_VOTING successfully");

  });


it('should fail DenyVoting called by voter in state STATE_VOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "voter";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testDenyVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "voter was able to call DenyVoting in state STATE_VOTING successfully");

  });


it('should fail DenyVoting called by none in state STATE_VOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testDenyVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call DenyVoting in state STATE_VOTING successfully");

  });


it('should fail Vote called by admin in state STATE_VOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testVote.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call Vote in state STATE_VOTING successfully");

  });


it('should fail Vote called by committee in state STATE_VOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testVote.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call Vote in state STATE_VOTING successfully");

  });


it('should fail Vote called by none in state STATE_VOTING', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testVote.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call Vote in state STATE_VOTING successfully");

  });


it('should set the state to finalized', async () => {{
             let votingSystemInst = await VotingSystem.deployed();
             let testVotingSystemInst = await testVotingSystem.deployed();
             await testVotingSystemInst.testVote("voter", accounts[0]);
             let state = await votingSystemInst.queryState();
             assert.equal(state, "finalized", "the state was changed incorrectly");
             let winner = await votingSystemInst.getWinner();
             assert.equal(winner, accounts[0], "the winner was not correct");
 }});


it('should fail AddCommittee called by admin in state STATE_FINALIZED', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddCommittee.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call AddCommittee in state STATE_FINALIZED successfully");

  });


it('should fail AddCommittee called by committee in state STATE_FINALIZED', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddCommittee.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call AddCommittee in state STATE_FINALIZED successfully");

  });


it('should fail AddCommittee called by voter in state STATE_FINALIZED', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "voter";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddCommittee.call(user, usedInFunction.address);
    assert.equal(check, false, "voter was able to call AddCommittee in state STATE_FINALIZED successfully");

  });


it('should fail AddCommittee called by none in state STATE_FINALIZED', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddCommittee.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call AddCommittee in state STATE_FINALIZED successfully");

  });


it('should fail BeginRegistration called by admin in state STATE_FINALIZED', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testBeginRegistration.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call BeginRegistration in state STATE_FINALIZED successfully");

  });


it('should fail BeginRegistration called by committee in state STATE_FINALIZED', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testBeginRegistration.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call BeginRegistration in state STATE_FINALIZED successfully");

  });


it('should fail BeginRegistration called by voter in state STATE_FINALIZED', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "voter";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testBeginRegistration.call(user, usedInFunction.address);
    assert.equal(check, false, "voter was able to call BeginRegistration in state STATE_FINALIZED successfully");

  });


it('should fail BeginRegistration called by none in state STATE_FINALIZED', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testBeginRegistration.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call BeginRegistration in state STATE_FINALIZED successfully");

  });


it('should fail AddVoter called by admin in state STATE_FINALIZED', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddVoter.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call AddVoter in state STATE_FINALIZED successfully");

  });


it('should fail AddVoter called by committee in state STATE_FINALIZED', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddVoter.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call AddVoter in state STATE_FINALIZED successfully");

  });


it('should fail AddVoter called by voter in state STATE_FINALIZED', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "voter";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddVoter.call(user, usedInFunction.address);
    assert.equal(check, false, "voter was able to call AddVoter in state STATE_FINALIZED successfully");

  });


it('should fail AddVoter called by none in state STATE_FINALIZED', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testAddVoter.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call AddVoter in state STATE_FINALIZED successfully");

  });


it('should fail InitializeVoting called by admin in state STATE_FINALIZED', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testInitializeVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call InitializeVoting in state STATE_FINALIZED successfully");

  });


it('should fail InitializeVoting called by committee in state STATE_FINALIZED', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testInitializeVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call InitializeVoting in state STATE_FINALIZED successfully");

  });


it('should fail InitializeVoting called by voter in state STATE_FINALIZED', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "voter";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testInitializeVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "voter was able to call InitializeVoting in state STATE_FINALIZED successfully");

  });


it('should fail InitializeVoting called by none in state STATE_FINALIZED', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testInitializeVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call InitializeVoting in state STATE_FINALIZED successfully");

  });


it('should fail ConfirmVoting called by admin in state STATE_FINALIZED', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testConfirmVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call ConfirmVoting in state STATE_FINALIZED successfully");

  });


it('should fail ConfirmVoting called by committee in state STATE_FINALIZED', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testConfirmVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call ConfirmVoting in state STATE_FINALIZED successfully");

  });


it('should fail ConfirmVoting called by voter in state STATE_FINALIZED', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "voter";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testConfirmVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "voter was able to call ConfirmVoting in state STATE_FINALIZED successfully");

  });


it('should fail ConfirmVoting called by none in state STATE_FINALIZED', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testConfirmVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call ConfirmVoting in state STATE_FINALIZED successfully");

  });


it('should fail DenyVoting called by admin in state STATE_FINALIZED', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testDenyVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call DenyVoting in state STATE_FINALIZED successfully");

  });


it('should fail DenyVoting called by committee in state STATE_FINALIZED', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testDenyVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call DenyVoting in state STATE_FINALIZED successfully");

  });


it('should fail DenyVoting called by voter in state STATE_FINALIZED', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "voter";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testDenyVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "voter was able to call DenyVoting in state STATE_FINALIZED successfully");

  });


it('should fail DenyVoting called by none in state STATE_FINALIZED', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testDenyVoting.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call DenyVoting in state STATE_FINALIZED successfully");

  });


it('should fail Vote called by admin in state STATE_FINALIZED', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "admin";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testVote.call(user, usedInFunction.address);
    assert.equal(check, false, "admin was able to call Vote in state STATE_FINALIZED successfully");

  });


it('should fail Vote called by committee in state STATE_FINALIZED', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "committee";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testVote.call(user, usedInFunction.address);
    assert.equal(check, false, "committee was able to call Vote in state STATE_FINALIZED successfully");

  });


it('should fail Vote called by voter in state STATE_FINALIZED', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "voter";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testVote.call(user, usedInFunction.address);
    assert.equal(check, false, "voter was able to call Vote in state STATE_FINALIZED successfully");

  });


it('should fail Vote called by none in state STATE_FINALIZED', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "none";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.testVote.call(user, usedInFunction.address);
    assert.equal(check, false, "none was able to call Vote in state STATE_FINALIZED successfully");

  });





  //   let test = "committee1";
  // it('should not add a committee member', async () => {

  //   let votingSystemInst = await VotingSystem.deployed();
  //   let testVotingSystemInst = await testVotingSystem.deployed();

  //   let nonAdminTP = await ThrowProxy.new(votingSystemInst.address);

  //   let admin = "admin";

  //   await testVotingSystemInst.setUser(admin, nonAdminTP.address);

  //   let check = await testVotingSystemInst.testAddCommittee.call(admin, accounts[1]);

  //   assert.equal(check, false, "user was able to add themselves to the committee");

  //   await votingSystemInst.changeAdmin(nonAdminTP.address, {from: accounts[0]});

  //   check = await testVotingSystemInst.testAddCommittee.call(admin, nonAdminTP.address);

  //   assert.equal(check, true, "user was able to add themselves to the committee");

  // });

  // it('should do stuff', async () => {
  //   let testVotingSystemInst = await testVotingSystem.deployed();
  //   let votingSystemInst = await VotingSystem.deployed();

  //   let admin = await testVotingSystemInst.getAdmin();

  //   let check = await testVotingSystemInst.testAddCommittee.call(admin.address, admin.address);

  //   assert.equal(check, true, "user was able to add themselves to the committee");



  // });

});
