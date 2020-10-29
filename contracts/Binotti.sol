//SPDX-License-Identifier: Unlicense
pragma solidity >=0.7.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract Binotti {
    using SafeMath for uint256;

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
        _balances[msg.sender] = _balances[msg.sender].add(msg.value.mul(1000));
    }

    function getBalance() public view returns (uint balance) {
        return (_balances[msg.sender]);
    }

    function balanceOf(address addr) public view returns (uint balance) {
        return (_balances[addr]);
    }

    function transfer(address to, uint value) public {
        require(_balances[msg.sender] >= value);
        _balances[msg.sender] = _balances[msg.sender].sub(value);
        _balances[to] = _balances[to].add(value);
    }

    function setName(string calldata newName) external  {
        require(msg.sender == _owner);
        _name = newName;
    }

    function setSymbol(string calldata newSymbol) external {
        require(msg.sender == _owner);
        _symbol = newSymbol;
    }

    function name() external view returns (string memory) {
        return _name;
    }

    function symbol() external view returns (string memory) {
        return _symbol;
    }
}
