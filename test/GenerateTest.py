import json

JavaScript = open("JavaScript.txt", "a")

with open("PossibleCalls.json") as json_file:
    data = json.load(json_file)

states = data["states"]
actors = data["actors"]
functions = data["functions"]
validTransitions = data["validTransitions"]

test = [actors[1], states[0], functions[0]]
print(test)
print(test in validTransitions)
