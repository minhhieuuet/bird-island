// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./Ownable.sol";
import './TokenTimelock.sol';
import "./ERC20.sol";

contract DragonSoul is ERC20, Ownable {
    uint256 private _maxTotalSupply;
    
    constructor() ERC20("DragonSoulStone", "DSS") {
        _maxTotalSupply = 1000000000e18;
        
        // init timelock factory
        TimelockFactory timelockFactory = new TimelockFactory();

        // ERC20
        // private sales
        mint(0xb40eA1DA6A55bDf2b5BFbd054cC7dDB53F8ac615, 73000000e18*25/100);
        address privateSalesLock = timelockFactory.createTimelock(this, 0xb40eA1DA6A55bDf2b5BFbd054cC7dDB53F8ac615, block.timestamp + 30 days, 73000000e18*25/100, 30 days);
        mint(privateSalesLock, 73000000e18*75/100);
        // team
        address teamLock = timelockFactory.createTimelock(this, 0xb40eA1DA6A55bDf2b5BFbd054cC7dDB53F8ac615, block.timestamp + 180 days, 250000000e18*8/100, 30 days);
        mint(teamLock, 250000000e18);
        // advisors
        address advisorsLock = timelockFactory.createTimelock(this, 0xb40eA1DA6A55bDf2b5BFbd054cC7dDB53F8ac615, block.timestamp + 90 days, 50000000e18*8/100, 30 days);
        mint(advisorsLock, 50000000e18);
        // marketing
        mint(0xb40eA1DA6A55bDf2b5BFbd054cC7dDB53F8ac615, 30000000e18*10/100);
        address marketingERC20Lock = timelockFactory.createTimelock(this, 0xb40eA1DA6A55bDf2b5BFbd054cC7dDB53F8ac615, block.timestamp + 30 days, 30000000e18*5/100, 30 days);
        mint(marketingERC20Lock, 30000000e18*90/100);
        // exchange liquidity provision
        mint(0xb40eA1DA6A55bDf2b5BFbd054cC7dDB53F8ac615, 23333333e18);
        // BEP20
        // public sales
        mint(0xb40eA1DA6A55bDf2b5BFbd054cC7dDB53F8ac615, 6666667e18); // for BSCPad
        // ecosystem growth
        address growthLock = timelockFactory.createTimelock(this, 0xb40eA1DA6A55bDf2b5BFbd054cC7dDB53F8ac615, block.timestamp + 90 days, 0, 0);
        mint(growthLock, 530000000e18);

        // // marketing
        // mint(0x7e318e80EB8e401451334cAa2278E39Da7F6C49B, 20000000e18*10/100);
        // address marketingBEP20Lock = timelockFactory.createTimelock(this, 0x7e318e80EB8e401451334cAa2278E39Da7F6C49B, block.timestamp + 30 days, 20000000e18*5/100, 30 days);
        // mint(marketingBEP20Lock, 20000000e18*90/100);
        // // exchange liquidity provision
        // mint(0x0a515Ac284E3c741575A4fd71C27e377a19D5E6D, 6666667e18);
    }

    function mint(address account, uint256 amount) public onlyOwner returns (bool) {
        require(totalSupply() + amount <= _maxTotalSupply, "DragonSoul Token: mint more than the max total supply");
        _mint(account, amount);
        return true;
    }

    function burn(uint256 amount) public onlyOwner returns (bool) {
        _burn(msg.sender, amount);
        return true;
    }
}