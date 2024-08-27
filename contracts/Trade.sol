pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";

contract Trade {
    using SafeMath for uint256;
    using SafeERC20 for ERC20;

    // Mapping of trade IDs to their corresponding trade details
    mapping (uint256 => TradeDetails) public trades;

    // Event emitted when a new trade is executed
    event NewTrade(uint256 tradeID, address buyer, address seller, uint256 amount, uint256 price);

    // Struct to represent trade details
    struct TradeDetails {
        uint256 amount;
        uint256 price;
        address buyer;
        address seller;
        uint256 timestamp;
    }

    // Function to execute a new trade
    function executeTrade(uint256 amount, uint256 price, address buyer, address seller) public {
        TradeDetails memory trade = TradeDetails(amount, price, buyer, seller, block.timestamp);
        trades[tradeID] = trade;
        emit NewTrade(tradeID, buyer, seller, amount, price);
    }
}
