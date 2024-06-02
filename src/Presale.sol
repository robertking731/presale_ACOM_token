// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

uint256 constant INITIAL_TOKEN_PRICE = 14; //0.0014
address constant MAINNET_USDT = 0xdAC17F958D2ee523a2206206994597C13D831ec7; //USDT address in Ethereum
address constant MAINNET_ACOM = 0x84b2152Da1A7194504C1E472B7ecADc16620e034;

address constant UNISWAPV2_ROUTER_ADDRESS = address(
    0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D 
);

contract Presale is Ownable {
    bool public presaleStarted;
    uint public startTimeStamp;
    uint public endTimeStamp;
    uint256 public totalCap;

    IUniswapV2Router02 public router =
        IUniswapV2Router02(address(UNISWAPV2_ROUTER_ADDRESS));

    IERC20 usdt = IERC20(MAINNET_USDT); // USDT contract address
    IERC20 acom = IERC20(MAINNET_ACOM);

    receive() external payable {}

    constructor(uint _endTimeStamp) Ownable(msg.sender) {
        require(
            block.timestamp < _endTimeStamp,
            "Presale end time should be in the future"
        );
        endTimeStamp = _endTimeStamp;
        startTimeStamp = _endTimeStamp;
        totalCap = 0;
        presaleStarted = false;
    }

    // function initialize(uint _endTimeStamp) public initializer {
    //     __Ownable_init(msg.sender);
    //     require(
    //         block.timestamp < _endTimeStamp,
    //         "Presale end time should be in the future"
    //     );
    //     startTimeStamp = block.timestamp;
    //     endTimeStamp = _endTimeStamp;
    //     totalCap = 0;
    // }

    function updateEndTimeStamp(uint256 _endTimeStamp) public onlyOwner {
        require(
            block.timestamp < _endTimeStamp,
            "Update endtime in the future"
        );
        endTimeStamp = _endTimeStamp;
    }

    function getCurrentTokenPrice() public view returns (uint256) {
        uint256 currentStep = totalCap / (500 * 10 ** (3 + 6));
        uint256 tokenPrice = INITIAL_TOKEN_PRICE + currentStep * 20;
        return tokenPrice;
    }

    // function approveContract(address _spender, uint256 _amount) external {
    //     require(usdt.approve(_spender, _amount), "Approval failed");
    // }
    
    function startPresale (uint256 _endTimeStamp) public onlyOwner {
        require(
            block.timestamp < _endTimeStamp,
            "Update endtime in the future"
        );

        startTimeStamp = block.timestamp;
        endTimeStamp = _endTimeStamp;
        presaleStarted = true;
    }
    function calculateRemainingTime() public view returns(uint256) {
        require(block.timestamp < endTimeStamp, "Presale is ended");

        return (endTimeStamp - block.timestamp);
    }

    function buyTokenWithUSDT(uint256 _usdtAmount) public {
        if(block.timestamp >= endTimeStamp) presaleStarted = false;

        require(block.timestamp > startTimeStamp, "Presale is not started");
        require(presaleStarted == true, "Presale is ended");
        require(0 < _usdtAmount, "Unavailable amount of token to buy");

        uint256 currentTokenPrice = getCurrentTokenPrice();
        uint256 tokenAmount = (_usdtAmount * 10 ** 4) / currentTokenPrice;

        totalCap = totalCap + _usdtAmount;
        usdt.transferFrom(msg.sender, address(this), _usdtAmount);
        acom.transfer(msg.sender, tokenAmount);
    }
    function buyTokenWithETH() public payable {
        if(block.timestamp >= endTimeStamp) presaleStarted = false;
        
        require(block.timestamp > startTimeStamp, "Presale is not started");
        require(presaleStarted == true, "Presale is ended");
        require(0 < msg.value, "Unavailable amount of token to buy");

        address WETH = router.WETH();
        address[] memory path = new address[](2);
        path[0] = WETH;
        path[1] = MAINNET_USDT;
        uint256[] memory amounts = router.swapExactETHForTokens{
            value: msg.value
        }(0, path, address(this), block.timestamp + 15 minutes);
        uint256 usdAmount = amounts[1];
        
        uint256 currentTokenPrice = getCurrentTokenPrice();
        uint256 tokenAmount = (usdAmount * 10 ** 4) / currentTokenPrice;
        totalCap += usdAmount;
        acom.transfer(msg.sender, tokenAmount);
    }

    function withdraw(address _to) public payable onlyOwner {
        // require(block.timestamp > endTimeStamp, "Presale is not ended");

        //usdt.transferFrom(address(this), _to, usdt.balanceOf(address(this)));
        usdt.transfer(_to, usdt.balanceOf(address(this)));
    }
}