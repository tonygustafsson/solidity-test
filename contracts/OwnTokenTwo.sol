//SPDX-License-Identifier: Unlicense
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract OwnTokenTwo is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint256 amount
    ) public ERC20(name, symbol) {
        _mint(msg.sender, amount);
        console.log("Done");
    }
}
