// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract LW3Token is ERC20{

    constructor(string memory name,string memory symbol) ERC20(name,symbol){
        _mint(msg.sender,1e18);
    }

}