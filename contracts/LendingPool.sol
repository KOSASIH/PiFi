pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";

contract LendingPool {
    using SafeMath for uint256;
    using SafeERC20 for ERC20;

    // Mapping of lenders to their loan offers
    mapping (address => LoanOffer[]) public lenders;

    // Mapping of borrowers to their loan requests
    mapping (address => LoanRequest[]) public borrowers;

    // Mapping of loans to their corresponding loan IDs
    mapping (uint256 => Loan) public loans;

    // Event emitted when a new loan offer is created
    event NewLoanOffer(address indexed lender, uint256 amount, uint256 interestRate);

    // Event emitted when a new loan request is created
    event NewLoanRequest(address indexed borrower, uint256 amount, uint256 interestRate);

    // Event emitted when a loan is funded
    event LoanFunded(uint256 loanID, address lender, address borrower, uint256 amount);

    // Event emitted when a loan is repaid
    event LoanRepaid(uint256 loanID, address borrower, uint256 amount);

    // Struct to represent a loan offer
    struct LoanOffer {
        uint256 amount;
        uint256 interestRate;
        uint256 timestamp;
    }

    // Struct to represent a loan request
    struct LoanRequest {
        uint256 amount;
        uint256 interestRate;
        uint256 timestamp;
    }

    // Struct to represent a loan
    struct Loan {
        uint256 amount;
        uint256 interestRate;
        address lender;
        address borrower;
        uint256 timestamp;
        bool isRepaid;
    }

    // Function to create a new loan offer
    function createLoanOffer(uint256 amount, uint256 interestRate) public {
        LoanOffer memory newOffer = LoanOffer(amount, interestRate, block.timestamp);
        lenders[msg.sender].push(newOffer);
        emit NewLoanOffer(msg.sender, amount, interestRate);
    }

    // Function to create a new loan request
    function createLoanRequest(uint256 amount, uint256 interestRate) public {
        LoanRequest memory newRequest = LoanRequest(amount, interestRate, block.timestamp);
        borrowers[msg.sender].push(newRequest);
        emit NewLoanRequest(msg.sender, amount, interestRate);
    }

    // Function to fund a loan
    function fundLoan(uint256 loanID, address lender, address borrower, uint256 amount) public {
        Loan memory loan = loans[loanID];
        require(loan.lender == lender, "Only the lender can fund the loan");
        require(loan.borrower == borrower, "Only the borrower can receive the loan");
        require(loan.amount == amount, "Incorrect loan amount");
        loan.isRepaid = false;
        loans[loanID] = loan;
        emit LoanFunded(loanID, lender, borrower, amount);
    }

    // Function to repay a loan
    function repayLoan(uint256 loanID, address borrower, uint256 amount) public {
        Loan memory loan = loans[loanID];
        require(loan.borrower == borrower, "Only the borrower can repay the loan");
        require(loan.amount == amount, "Incorrect loan amount");
        loan.isRepaid = true;
        loans[loanID] = loan;
        emit LoanRepaid(loanID, borrower, amount);
    }
}
