pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Identity {
    using SafeMath for uint256;

    // Mapping of user addresses to their corresponding identity details
    mapping (address => IdentityDetails) public identities;

    // Event emitted when a new identity is created
    event NewIdentity(address user, string name, string email);

    // Struct to represent identity details
    struct IdentityDetails {
        string name;
        string email;
        uint256 timestamp;
    }

    // Function to create a new identity
    function createIdentity(string memory name, string memory email) public {
        IdentityDetails memory identity = IdentityDetails(name, email, block.timestamp);
        identities[msg.sender] = identity;
        emit NewIdentity(msg.sender, name, email);
    }
}
