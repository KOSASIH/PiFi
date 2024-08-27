pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Reputation {
    using SafeMath for uint256;

    // Mapping of user addresses to their corresponding reputation scores
    mapping (address => uint256) public reputationScores;

    // Event emitted when a user's reputation score is updated
    event ReputationUpdated(address user, uint256 score);

    // Function to update a user's reputation score
    function updateReputation(address user, uint256 score) public {
        reputationScores[user] = score;
        emit ReputationUpdated(user, score);
    }
}
