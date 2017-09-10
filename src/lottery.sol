pragma solidity ^0.4.14;


contract Lottery {
    event LotteryWon(address winner, uint amount);
    address owner;

    function Lottery () payable {
        owner = msg.sender;
    }

    function gamble() payable public {
        require(msg.value > 0);
        require(this.balance > msg.value * 2);
        uint randomNumber = uint(block.blockhash(block.number-1)) % 3;
        if (randomNumber == 1) {
            LotteryWon(msg.sender, this.balance);
            msg.sender.transfer(msg.value * 5 / 2);
        }
    }

    function() payable {}

    function sendMoneyToOwner(uint amount) {
        require(amount > 0);
        require(msg.sender == owner);
        owner.transfer(amount)
    }

    function kill() { 
        require(msg.sender == owner);
        selfdestruct(owner);
    }

}