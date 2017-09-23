pragma solidity ^0.4.14;

import "github.com/oraclize/ethereum-api/oraclizeAPI.sol";


contract Lottery is usingOraclize {
    address owner;
    mapping (bytes32 => address) bets;
    mapping (bytes32 => uint) betAmts;


    event newRandomNumber(string result);

    function Lottery() public {
        owner = msg.sender;
    }

    function() payable {}

    function sendMoneyToOwner(uint amount) {
        require(amount > 0);
        require(msg.sender == owner);
        owner.transfer(amount);
    }

    function kill() { 
        require(msg.sender == owner);
        selfdestruct(owner);
    }

    function gamble() payable public {
        require(msg.value > 0);
        require(this.balance > msg.value * 2);
        bytes32 myid = oraclize_query(0, "WolframAlpha", "random number between 1 and 6");
        bets[myid] = msg.sender;
        betAmts[myid] = msg.value;
    }

    function __callback(bytes32 myid, string result, bytes proof) {
        require(msg.sender == oraclize_cbAddress());
        newRandomNumber(result);
        if (uint(bytes(result)[0]) - 48 > 3) {
            bets[myid].transfer(betAmts[myid] * 2);
        }
    }
}