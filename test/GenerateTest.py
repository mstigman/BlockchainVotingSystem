import json

javaScript = open("JavaScript.txt", "a")

with open("PossibleCalls.json") as json_file:
    data = json.load(json_file)

states = data["states"]
functions = data["functions"]
actors = data["actors"]

validTransitions = data["validTransitions"]

outputCode = """it('should set up the contract', async () => {{
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
             await testVotingSystemInst.setUser(none, noneUser.address);\n }});\n\n\n"""
javaScript.write(outputCode)

for state in states:
    if(state == "STATE_REGISTRATION"):
        outputCode = """it('should set the state to registration', async () => {{
             let votingSystemInst = await VotingSystem.deployed();
             let testVotingSystemInst = await testVotingSystem.deployed();
             let changeState = await testVotingSystemInst.testBeginRegistration("admin", accounts[0]);
             let state = await votingSystemInst.queryState();
             assert.equal(state, "registration of voters", "the state was changed incorrectly");
             let voterUser = await ThrowProxy.new(votingSystemInst.address);
             let voter = "voter";
             await testVotingSystemInst.setUser(voter, voterUser.address);
             await testVotingSystemInst.testAddVoter(voter, accounts[0]);
             \n }});\n\n\n"""
        javaScript.write(outputCode)
    elif(state == "STATE_PREVOTING"):
        outputCode = """it('should set the state to prevoting', async () => {{
             let votingSystemInst = await VotingSystem.deployed();
             let testVotingSystemInst = await testVotingSystem.deployed();
             await testVotingSystemInst.testInitializeVoting("committee", accounts[0]);
             let state = await votingSystemInst.queryState();
             assert.equal(state, "prevoting verification", "the state was changed incorrectly");\n }});\n\n\n"""
        javaScript.write(outputCode)
    elif(state == "STATE_VOTING"):
        outputCode = """it('should set the state to voting', async () => {{
             let votingSystemInst = await VotingSystem.deployed();
             let testVotingSystemInst = await testVotingSystem.deployed();
             await testVotingSystemInst.testConfirmVoting("committee", accounts[0]);
             let state = await votingSystemInst.queryState();
             assert.equal(state, "voting phase", "the state was changed incorrectly");\n }});\n\n\n"""
        javaScript.write(outputCode)
    elif(state == "STATE_FINALIZED"):
        outputCode = """it('should set the state to finalized', async () => {{
             let votingSystemInst = await VotingSystem.deployed();
             let testVotingSystemInst = await testVotingSystem.deployed();
             await testVotingSystemInst.testVote("voter", accounts[0]);
             let state = await votingSystemInst.queryState();
             assert.equal(state, "finalized", "the state was changed incorrectly");
             let winner = await votingSystemInst.getWinner();
             assert.equal(winner, accounts[0], "the winner was not correct");\n }});\n\n\n"""
        javaScript.write(outputCode)
    for function in functions:
        for actor in actors:
            call = [actor, state, function]
            if(not call in validTransitions and not (state == "STATE_ADD_COMMITTEE" and actor == "voter")):
                outputCode = """it('should fail {} called by {} in state {}', async () => {{
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let user = "{}";
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.test{}.call(user, usedInFunction.address);
    assert.equal(check, false, "{} was able to call {} in state {} successfully");\n\n""".format(function, actor, state, actor, function, actor, function, state)
                javaScript.write(outputCode)
                javaScript.write("  });\n\n\n")


