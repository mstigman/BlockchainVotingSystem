import json

javaScript = open("JavaScript.txt", "a")

with open("PossibleCalls.json") as json_file:
    data = json.load(json_file)

states = data["states"]
functions = data["functions"]
actors = data["actors"]

validTransitions = data["validTransitions"]

for state in states:
    if(state == "STATE_REGISTRATION"):
        outputCode = """it('should set the state to registration', async () => {{
             let votingSystemInst = await VotingSystem.deployed();
             await votingSystemInst.addCommittee(accounts[0], {from: accounts[0]});
             await votingSystemInst.beginRegistration({from: accounts[0]});\n }});\n\n\n"""
        javaScript.write(outputCode)
    elif(state == "STATE_PREVOTING"):
        outputCode = """it('should set the state to prevoting', async () => {{
             let votingSystemInst = await VotingSystem.deployed();
             await votingSystemInst.addVoter({from: accounts[0]});
             await votingSystemInst.initializeVoting({from: accounts[0]});\n }});\n\n\n"""
        javaScript.write(outputCode)
    elif(state == "STATE_VOTING"):
        outputCode = """it('should set the state to voting', async () => {{
             let votingSystemInst = await VotingSystem.deployed();
             await votingSystemInst.confirmVoting({from: accounts[0]});\n }});\n\n\n"""
        javaScript.write(outputCode)
    elif(state == "STATE_FINALIZED"):
        outputCode = """it('should set the state to finalized', async () => {{
             let votingSystemInst = await VotingSystem.deployed();
             await votingSystemInst.vote(accounts[0], {from: accounts[0]});\n }});\n\n\n"""
        javaScript.write(outputCode)
    for function in functions:
        for actor in actors:
            call = [actor, state, function]
            if(not call in validTransitions):
                outputCode = """it('should fail {} called by {} in state {}', async () => {{
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let nonSpecificUser = await ThrowProxy.new(votingSystemInst.address);
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);
    let check = await testVotingSystemInst.test{}.call(nonSpecificUser.address, usedInFunction.address);
    assert.equal(check, false, "{} was able to call {} in state {} successfully");\n\n""".format(function, actor, state, function, actor, function, state)
                javaScript.write(outputCode)
                javaScript.write("  });\n\n\n")


