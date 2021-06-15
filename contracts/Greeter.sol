//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.3;

import "hardhat/console.sol";

contract Greeter {
    string greeting;
    uint16 counter;

    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }

    function getCount() public view returns (uint16) {
        return counter;
    }

    function setCount(uint16 _counter) public {
        console.log("Changing counter from '%s' to '%s'", counter, _counter);
        counter = _counter;
    }
}
