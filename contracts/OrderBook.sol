pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";

contract OrderBook {
    using SafeMath for uint256;
    using SafeERC20 for ERC20;

    // Mapping of asset IDs to their corresponding order books
    mapping (uint256 => OrderBookEntry[]) public orderBooks;

    // Event emitted when a new order is placed
    event NewOrder(uint256 assetID, address trader, uint256 amount, uint256 price);

    // Event emitted when an order is filled
    event OrderFilled(uint256 assetID, address trader, uint256 amount, uint256 price);

    // Struct to represent an order book entry
    struct OrderBookEntry {
        uint256 amount;
        uint256 price;
        address trader;
        uint256 timestamp;
    }

    // Function to place a new order
    function placeOrder(uint256 assetID, uint256 amount, uint256 price) public {
        OrderBookEntry memory newOrder = OrderBookEntry(amount, price, msg.sender, block.timestamp);
        orderBooks[assetID].push(newOrder);
        emit NewOrder(assetID, msg.sender, amount, price);
    }

    // Function to fill an order
    function fillOrder(uint256 assetID, uint256 amount, uint256 price) public {
        OrderBookEntry storage order = orderBooks[assetID][0];
        require(order.amount == amount, "Incorrect order amount");
        require(order.price == price, "Incorrect order price");
        orderBooks[assetID].pop();
        emit OrderFilled(assetID, order.trader, amount, price);
    }
}
