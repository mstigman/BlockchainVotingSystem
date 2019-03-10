const VotingSystem = artifacts.require("VotingSystem");
const testVotingSystem = artifacts.require("testVotingSystem");
const ThrowProxy = artifacts.require("ThrowProxy");


/*contract('VotingSystemTestSuccess', (accounts) => {
  it('should add a committee member', async () => {
    let owner = accounts[0];
    let committee1 = accounts[1];
    let committee2 = accounts[2];
    let committee3 = accounts[3];
    let committee4 = accounts[4];
    let committee5 = accounts[5];


    const VotingSystemInstance = await VotingSystem.deployed();
    await VotingSystemInstance.addCommittee(committee1, {from: owner});
    await VotingSystemInstance.addCommittee(committee2, {from: owner});
    await VotingSystemInstance.addCommittee(committee3, {from: owner});
    await VotingSystemInstance.addCommittee(committee4, {from: owner});
    await VotingSystemInstance.addCommittee(committee5, {from: owner});

    check = await VotingSystemInstance.queryCommittee(committee1);

    assert.equal(check, true, "committee member not added");
  });

  it("should begin registration", async () => {
    let owner = accounts[0];
    const VotingSystemInstance = await VotingSystem.deployed();

    await VotingSystemInstance.beginRegistration({from: owner});

    state = await VotingSystemInstance.queryStateInt();
    assert.equal(state.valueOf(), 1, "the state was not changed");
  })

  it("should add a voter", async () => {
    let owner = accounts[0];
    let voter1 = accounts[1];
    let voter2 = accounts[2];
    let voter3 = accounts[3];
    let voter4 = accounts[4];
    let voter5 = accounts[5];
    let voter6 = accounts[6];

    const VotingSystemInstance = await VotingSystem.deployed();

    await VotingSystemInstance.addVoter({from: voter1});
    await VotingSystemInstance.addVoter({from: voter2});
    await VotingSystemInstance.addVoter({from: voter3});
    await VotingSystemInstance.addVoter({from: voter4});
    await VotingSystemInstance.addVoter({from: voter5});
    await VotingSystemInstance.addVoter({from: voter6});

    confirmed = await VotingSystemInstance.queryIsRegistered({from: voter1});
    voterCount = await VotingSystemInstance.queryNumberVoters();

    assert.equal(confirmed, true, "the voter was not registered");
    assert.equal(voterCount, 6, "count was not updated correctly");
  })

  it("should initialize voting", async () => {

    let committee = accounts[1];
    const VotingSystemInstance = await VotingSystem.deployed();

    await VotingSystemInstance.initializeVoting({from: committee});

    state = await VotingSystemInstance.queryStateInt();

    assert.equal(state, 2, "the state was not updated");
  })

  it("should confirm voting", async () => {
    let committee1 = accounts[1];
    let committee2 = accounts[2];
    let committee3 = accounts[3];
    let committee4 = accounts[4];
    let committee5 = accounts[5];

    const VotingSystemInstance = await VotingSystem.deployed();

    await VotingSystemInstance.confirmVoting({from: committee1});
    state = await VotingSystemInstance.queryStateInt();
    assert.equal(state, 2, "the state updated without enough votes");

    await VotingSystemInstance.confirmVoting({from: committee2});
    state = await VotingSystemInstance.queryStateInt();
    assert.equal(state, 2, "the state updated without enough votes");

    await VotingSystemInstance.denyVoting({from: committee4});
    state = await VotingSystemInstance.queryStateInt();
    assert.equal(state, 2, "the state updated after a terminate vote");

    await VotingSystemInstance.confirmVoting({from: committee5});
    state = await VotingSystemInstance.queryStateInt();
    assert.equal(state, 3, "the state didnt update with proper votes");
  })

  it("should vote", async () => {
    let voter = accounts[1];
    let canidate = accounts[4];

    const VotingSystemInstance = await VotingSystem.deployed();

    await VotingSystemInstance.vote(canidate, {from: voter});

    topPlace = await VotingSystemInstance.queryCurrentFirst();
    noVote = await VotingSystemInstance.queryIsRegistered({from: voter});

    assert.equal(topPlace, canidate, "the vote was not counted correctly");
    assert.equal(noVote, false, "the voter can more than once");

  })

  it("should vote for 2 canidates and end vote", async () => {
    let voter2 = accounts[2];
    let voter3 = accounts[3];
    let voter4 = accounts[4];
    let voter5 = accounts[5];
    let voter6 = accounts[6];

    let canidate1 = accounts[4];
    let canidate2 = accounts[5];


    const VotingSystemInstance = await VotingSystem.deployed();

    await VotingSystemInstance.vote(canidate2, {from: voter2})
    topPlace = await VotingSystemInstance.queryCurrentFirst();
    secondPlace = await VotingSystemInstance.queryCurrentSecond();
    assert.equal(topPlace, canidate1, "the vote was not counted correctly");
    assert.equal(secondPlace, canidate2, "the canidates places were not updated correctly");

    await VotingSystemInstance.vote(canidate2, {from: voter3})
    topPlace = await VotingSystemInstance.queryCurrentFirst();
    secondPlace = await VotingSystemInstance.queryCurrentSecond();
    assert.equal(topPlace, canidate2, "the vote was not counted correctly");
    assert.equal(secondPlace, canidate1, "the canidates places were not updated correctly");

    await VotingSystemInstance.vote(canidate1, {from: voter4})
    topPlace = await VotingSystemInstance.queryCurrentFirst();
    secondPlace = await VotingSystemInstance.queryCurrentSecond();
    assert.equal(topPlace, canidate2, "the vote was not counted correctly");
    assert.equal(secondPlace, canidate1, "the canidates places were not updated correctly");

    await VotingSystemInstance.vote(canidate1, {from: voter5})
    topPlace = await VotingSystemInstance.queryCurrentFirst();
    secondPlace = await VotingSystemInstance.queryCurrentSecond();
    assert.equal(topPlace, canidate1, "the vote was not counted correctly");
    assert.equal(secondPlace, canidate2, "the canidates places were not updated correctly");

    await VotingSystemInstance.vote(canidate1, {from: voter6})
    topPlace = await VotingSystemInstance.queryCurrentFirst();
    secondPlace = await VotingSystemInstance.queryCurrentSecond();
    assert.equal(topPlace, canidate1, "the vote was not counted correctly");
    assert.equal(secondPlace, canidate2, "the canidates places were not updated correctly");

    state = await VotingSystemInstance.queryStateInt();
    assert.equal(state, 4, "the voting didnt end");

    winner = await VotingSystemInstance.getWinner();
    assert.equal(winner, canidate1, "the correct canidate didnt win");

  })
});*/


contract('VotingSystemTestFailures', (accounts) => {

    let test = "committee1";
  it('should not add a committee member', async () => {

    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();

    let nonAdminTP = await ThrowProxy.new(votingSystemInst.address);

    await testVotingSystemInst.setAdmin(nonAdminTP.address);

    let nonAdminTP2 = await testVotingSystemInst.getAdmin();

    let check = await testVotingSystemInst.testAddCommittee.call(accounts[1], accounts[1]);

    //assert.equal(check, false, "user was able to add themselves to the committee");

    //await votingSystemInst.changeAdmin(nonAdminTP.address, {from: accounts[0]});

    //check = await testVotingSystemInst.testAddCommittee.call(nonAdminTP.address, nonAdminTP.address);

    //assert.equal(check, true, "user was able to add themselves to the committee");

  });

  // it('should do stuff', async () => {
  //   let testVotingSystemInst = await testVotingSystem.deployed();
  //   let votingSystemInst = await VotingSystem.deployed();

  //   let admin = await testVotingSystemInst.getAdmin();

  //   let check = await testVotingSystemInst.testAddCommittee.call(admin.address, admin.address);

  //   assert.equal(check, true, "user was able to add themselves to the committee");



  // });

});
