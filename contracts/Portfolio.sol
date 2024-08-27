pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";

contract Portfolio {
    using SafeMath for uint256;
    using SafeERC20 for ERC20;

    // Mapping of user addresses to their corresponding portfolios
    mapping (address => PortfolioEntry[]) public portfolios;

    // Event emitted when a new portfolio entry is added
    event NewPortfolioEntry(address user, uint256 assetID, uint256 amount);

    // Struct to represent a portfolio entry
    struct PortfolioEntry {
        uint256 assetID;
        uint256 amount;
        uint256 timestamp;
    }

    // Function to add a new portfolio entry
    function addPortfolioEntry(uint256 assetID, uint256 amount) public {
        PortfolioEntry memory newEntry = PortfolioEntry(assetID, amount, block.timestamp);
        portfolios[msg.sender].push(newEntry);
        emit NewPortfolioEntry(msg.sender, assetID, amount);
    }

    // Function to remove a portfolio entry
    function removePortfolioEntry(uint256 assetID, uint256 amount) public {
        PortfolioEntry[] storage entries = portfolios[msg.sender];
        for (uint256 i = 0; i < entries.length; i++) {
            if (entries[i].assetID == assetID && entries[i].amount == amount) {
                entries[i] = entries[entries.length - 1];
                entries.pop();
                emit NewPortfolioEntry(msg.sender, assetID, 0);
                return;
            }
        }
    }
}
