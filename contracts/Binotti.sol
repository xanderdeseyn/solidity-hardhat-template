//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.7;

import "hardhat/console.sol";

contract Binotti {
    mapping (address => uint) _balances;
    string _name;
    string _symbol;
    address _owner;

    constructor() {
        console.log("Deploying Binotti");
        console.log("Sender:", msg.sender);
        _name = "Binotti";
        _symbol = "BINO";
        _owner = msg.sender;
    }

    receive() external payable {
        _balances[msg.sender] += msg.value * 1000;
    }

    function getBalance() public view returns (uint balance) {
        return (_balances[msg.sender]);
    }

    function balanceOf(address addr) public view returns (uint balance) {
        return (_balances[addr]);
    }

    function transfer(address to, uint value) public {
        require(_balances[msg.sender] >= value);
        _balances[msg.sender] -= value;
        _balances[to] += value;
    }

    function setName(string calldata newName) external  {
        require(msg.sender == _owner, "Sender is not owner");
        _name = newName;
    }

    function setSymbol(string calldata newSymbol) external {
        require(msg.sender == _owner, "Sender is not owner");
        _symbol = newSymbol;
    }

    function name() external view returns (string memory) {
        return _name;
    }

    function symbol() external view returns (string memory) {
        return _symbol;
    }
}
