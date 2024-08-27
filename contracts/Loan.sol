pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";

contract Loan {
    using SafeMath for uint256;
    using SafeERC20 for ERC20;

    // Mapping of loan IDs to their corresponding loan details
    mapping (uint256 => LoanDetails) public loans;

    // Event emitted when a loan is created
    event NewLoan(uint256 loanID, address lender, address borrower, uint256 amount, uint256 interestRate);

    // Event emitted when a loan is repaid
    event LoanRepaid(uint256 loanID, address borrower, uint256 amount);

    // Struct to represent loan details
    struct LoanDetails {
        uint256 amount;
        uint256 interestRate;
        address lender;
        address borrower;
        uint256 timestamp;
        bool isRepaid;
    }

    // Function to create a new loan
    function createLoan(uint256 amount, uint256 interestRate, address lender, address borrower) public {
        LoanDetails memory loan = LoanDetails(amount, interestRate, lender, borrower, block.timestamp, false);
        loans[loanID] = loan;
        emit NewLoan(loanID, lender, borrower, amount, interestRate);
    }

    // Function to repay a loan
    function repayLoan(uint256 loanID, address borrower, uint256 amount) public {
        LoanDetails storage loan = loans[loanID];
        require(loan.borrower == borrower, "Only the borrower can repay the loan");
        require(loan.amount == amount, "Incorrect loan amount");
        loan.isRepaid = true;
        emit LoanRepaid(loanID, borrower, amount);
    }
}
