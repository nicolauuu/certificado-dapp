// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CertiToken is ERC20, Ownable {
    uint256 public rewardAmount = 100 * 10 ** 18;

    constructor(address initialOwner) ERC20("CertiToken", "CTK") Ownable(initialOwner) {
    }

    function reward(address student) external onlyOwner {
        _mint(student, rewardAmount); // Recompensa fixa de 100 tokens
    }

    function burn(address account, uint256 amount) external onlyOwner {
        _burn(account, amount);
    }
}
