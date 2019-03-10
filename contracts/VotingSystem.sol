pragma solidity >= 0.4.24;


contract VotingSystem {
    uint constant committeePercentNeeded = 75;

    uint constant STATE_ADD_COMMITTEE = 0;
    uint constant STATE_REGISTRATION = 1;
    uint constant STATE_PREVOTING = 2;
    uint constant STATE_VOTING = 3;
    uint constant STATE_FINALIZED = 4;



    address admin;
    address winner;
    mapping (address => bool) committee;
    mapping (address => bool) population;
    mapping (address => uint) candidates;
    address currentFirst;
    address currentSecond;
    uint committeeSize;
    uint populationSize;
    uint populationLeftToVote;
    uint beginVoting;
    uint terminateVoting;
    uint state;

    constructor() public {
        admin = msg.sender;
        state = STATE_ADD_COMMITTEE;
        beginVoting = 0;
        terminateVoting = 0;
        committeeSize = 0;
        populationSize = 0;
    }

    function changeAdmin(address new_admin) public {
        require(msg.sender == admin);
        admin = new_admin;
    }

    function addCommittee(address addr) public {
        require(state == STATE_ADD_COMMITTEE);
        require(msg.sender == admin);
        require(!committee[addr]);
        committee[addr] = true;
        committeeSize += 1;
    }
    function beginRegistration() public {
        require(msg.sender == admin);
        require(state == STATE_ADD_COMMITTEE);

        admin = 0x0000000000000000000000000000000000000000;
        state = STATE_REGISTRATION;
    }

    function addVoter() public {
        require(state == STATE_REGISTRATION);
        require(!population[msg.sender]);
        population[msg.sender] = true;
        populationSize += 1;
    }

    function initializeVoting() public {
        require(state == STATE_REGISTRATION);
        require(committee[msg.sender]);

        state = STATE_PREVOTING;
    }

    function confirmVoting() public {
        require(state == STATE_PREVOTING);
        require(committee[msg.sender]);

        beginVoting += 1;
        committee[msg.sender] = false;
        if(beginVoting >= (committeePercentNeeded * committeeSize) / 100) {
            state = STATE_VOTING;
            populationLeftToVote = populationSize;
        }
    }

    function denyVoting() public {
        require(state == STATE_PREVOTING);
        require(committee[msg.sender]);

        terminateVoting += 1;
        committee[msg.sender] = false;
    }

    function vote(address addr) public {
        require(state == STATE_VOTING);
        require(population[msg.sender]);

        candidates[addr] += 1;
        populationLeftToVote -= 1;
        population[msg.sender] = false;

        if(addr != currentFirst && candidates[addr] > candidates[currentFirst]) {
            currentSecond = currentFirst;
            currentFirst = addr;
            } else if(addr != currentFirst && candidates[addr] > candidates[currentSecond]) {
                currentSecond = addr;
            }
            if(candidates[currentFirst] > candidates[currentSecond] + populationLeftToVote) {
                state = STATE_FINALIZED;
                winner = currentFirst;
            }
        }

        function getWinner() public view returns (address won) {
            require(state == STATE_FINALIZED);
            return winner;
        }

        function queryVotersLeft() public view returns (uint votersLeft) {
            return populationLeftToVote;
        }

        function queryNumberVoters() public view returns (uint voters) {
            return populationSize;
        }

        function queryCommittee(address addr) public view returns (bool canVoteAsCommittee) {
            return committee[addr];
        }

        function queryIsRegistered() public view returns (bool canVote) {
            return population[msg.sender];
        }

        function queryStateInt() public view returns (uint stateInt) {
            return state;
        }

        function queryState() public view returns (string memory currentState) {
            if(state == STATE_ADD_COMMITTEE) {
                return "adding committee members";
            }
            if(state == STATE_REGISTRATION) {
                return "registration of voters";
            }
            if(state == STATE_PREVOTING) {
                return "prevoting verification";
            }
            if(state == STATE_VOTING) {
                return "voting phase";
            }
            if(state == STATE_FINALIZED) {
                return "finalized";
            }
            return "error";
        }

        function queryCurrentFirst() public view returns (address inFirst) {
            return currentFirst;
        }

        function queryCurrentSecond() public view returns (address inSecond) {
            return currentSecond;
        }
    }

    contract ThrowProxy {
        address public _target;
        bytes _data;

        constructor(address target) public {
            _target = target;
        }

        function () external {
            _data = msg.data;
        }

        function __execute() public returns (bool success) {
            bool r;
            bytes memory ret;
            (r, ret) = _target.call(_data);

            return r;
        }
    }

    contract testVotingSystem {
        mapping (string => address) committeeUsers;
        mapping (string => address) voterUsers;
        address admin;

        function setAdmin(address value) public {
            admin = value;
        }
        function getAdmin() public returns (address value) {
            return admin;
        }
        function setCommittee(string memory key, address value) public {
            committeeUsers[key] = value;
        }
        function getCommittee(string memory key) public returns (address value) {
            return committeeUsers[key];
        }

        function setVoter(string memory key, address value) public {
            voterUsers[key] = value;
        }
        function getVoter(string memory key) public returns (address value) {
            return voterUsers[key];
        }

        function testAddCommittee(address user, address committee) public returns (bool success) {
            VotingSystem(admin).addCommittee(committee);
            bool r = ThrowProxy(admin).__execute.gas(200000)();
            return r;
        }

        function testBeginRegistration(address user, address empty) public returns (bool success) {
            VotingSystem(user).beginRegistration();
            bool r = ThrowProxy(user).__execute.gas(200000)();
            return r;
        }

        function testAddVoter(address user, address empty) public returns (bool success) {
            VotingSystem(user).addVoter();
            bool r = ThrowProxy(user).__execute.gas(200000)();
            return r;
        }

        function testInitializeVoting(address user, address empty) public returns (bool success) {
            VotingSystem(user).initializeVoting();
            bool r = ThrowProxy(user).__execute.gas(200000)();
            return r;
        }

        function testConfirmVoting(address user, address empty) public returns (bool success) {
            VotingSystem(user).confirmVoting();
            bool r = ThrowProxy(user).__execute.gas(200000)();
            return r;
        }

        function testDenyVoting(address user, address empty) public returns (bool success) {
            VotingSystem(user).denyVoting();
            bool r = ThrowProxy(user).__execute.gas(200000)();
            return r;
        }

        function testVote(address user, address candidate) public returns (bool success) {
            VotingSystem(user).vote(candidate);
            bool r = ThrowProxy(user).__execute.gas(200000)();
            return r;
        }

        function testGetWinner(address user, address empty) public returns (bool success) {
            VotingSystem(user).getWinner();
            bool r = ThrowProxy(user).__execute.gas(200000)();
            return r;
        }
    }

