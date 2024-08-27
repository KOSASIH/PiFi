pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";

contract Asset {
    using SafeMath for uint256;
    using SafeERC20 for ERC20;

    // Mapping of asset IDs to their corresponding asset details
    mapping (uint256 => AssetDetails) public assets;

    // Event emitted when a new asset is created
    event NewAsset(uint256 assetID, string name, string symbol, uint256 totalSupply);

    // Struct to represent asset details
    struct AssetDetails {
        string name;
        string symbol;
        uint256 totalSupply;
        uint256 timestamp;
    }

    // Function to create a new asset
    function createAsset(string memory name, string memory symbol, uint256 totalSupply) public {
        AssetDetails memory asset = AssetDetails(name, symbol, totalSupply, block.timestamp);
        assets[assetID] = asset;
        emit NewAsset(assetID, name, symbol, totalSupply);
    }
}
