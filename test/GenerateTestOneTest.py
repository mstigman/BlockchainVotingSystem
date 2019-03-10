import json

javaScript = open("JavaScript.txt", "a")

with open("PossibleCalls.json") as json_file:
    data = json.load(json_file)

states = data["states"]
functions = data["functions"]
actors = data["actors"]

validTransitions = data["validTransitions"]

javaScript.write("""it('should fail everything', async () => {
    let votingSystemInst = await VotingSystem.deployed();
    let testVotingSystemInst = await testVotingSystem.deployed();
    let usedInFunction = await ThrowProxy.new(votingSystemInst.address);

    let admin = await ThrowProxy.new(votingSystemInst.address);
    let committee = await ThrowProxy.new(votingSystemInst.address);
    let voter = await ThrowProxy.new(votingSystemInst.address);
    let none = await ThrowProxy.new(votingSystemInst.address);
    """)

for state in states:
    if(state == "STATE_ADD_COMMITTEE"):
        outputCode ="""
            await votingSystemInst.changeAdmin(admin.address, {from: accounts[0]});\n"""
        javaScript.write(outputCode)
    elif(state == "STATE_REGISTRATION"):
        outputCode ="""
            await votingSystemInst.addCommittee(committee.address, {from: admin.address});
            await votingSystemInst.beginRegistration({from: admin.address});\n"""
        javaScript.write(outputCode)
    elif(state == "STATE_PREVOTING"):
        outputCode = """
             await votingSystemInst.addVoter({from: voter.address})
             await votingSystemInst.initializeVoting({from: committee.address});\n"""
        javaScript.write(outputCode)
    elif(state == "STATE_VOTING"):
        outputCode = """
             await votingSystemInst.confirmVoting({from: committee.address});\n"""
        javaScript.write(outputCode)
    elif(state == "STATE_FINALIZED"):
        outputCode = """
             await votingSystemInst.vote(accounts[0], {from: voter.address});\n"""
        javaScript.write(outputCode)
    for function in functions:
        for actor in actors:
            call = [actor, state, function]
            if(not call in validTransitions and False):
                outputCode = """
    let check = await testVotingSystemInst.test{}.call({}.address, usedInFunction.address);
    assert.equal(check, false, "{} was able to call {} in state {} successfully");\n\n""".format(function, actor, actor, function, state)
                javaScript.write(outputCode)

javaScript.write("});")
