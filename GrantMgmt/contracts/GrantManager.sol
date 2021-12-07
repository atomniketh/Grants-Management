// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
/// @custom:security-contact chris.stone@cse-corp.com

/*
    Run on Ropsten
    Load up the MetaMask account at: https://faucet.ropsten.be/
    or https://faucet.metamask.io/
    or https://faucet.dimensions.network
*/

contract GrantManager is ERC20, ERC20Burnable, Ownable, Pausable {

    /*
    * @title A Grants Management Treasury
    * @author Christopher M. Stone
    * @notice You can use this contract for issuing ERC-20 tokens and tracking grant information
    * @dev Set who may pause the contract
    */
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    /*
     * @dev Create a struct to store grant awards
     * @notice This captures all of the typical grant metadata
     */
    struct AwardInfo {
        string awardeeName;
        address awardeeAddr;
        string cageCode;
        string naicsCode;
        string grantNumber;
        string effectiveDate;
        string completionDate;
        uint laborCLINValue;
        uint travelCLINValue;
        uint odcValue;
        uint totalAwardValue;
        bool completed;
    }
    
    /**
     * @dev Create an array of 'AwardInfo' structs
     */
    AwardInfo[] public awards;


// ****************** Start Award Mapping *****************
    // Mapping from address to uint
    mapping(address => uint) public myMap;

    function get(address _addr) public view returns (uint) {
        // Mapping always returns a value.
        // If the value was never set, it will return the default value.
        return myMap[_addr];
    }

    function set(address _addr, uint _i) public {
        // Update the value at this address
        myMap[_addr] = _i;
    }

    function remove(address _addr) public {
        // Reset the value to the default value.
        delete myMap[_addr];
    }

// ****************** End Award Mapping *****************





// ****************** Start Payment Request *****************
    struct PaymentInfo {
        string grantNumber;
        uint AwardIDNum; // location in array
        address paymentSender;
        string fileURI; // file hash
        uint invLaborCLINValue;
        uint invTravelCLINValue;
        uint invOdcValue;
        uint invTotalAwardValue;
        string timeSubmitted; // get timestamp
        bool successfullyPayed;
    }

     /**
     * @dev Create an array of 'PaymentInfo' structs
     */
    PaymentInfo[] public payments;

    // see this for tips...
    //https://solidity-by-example.org/app/erc20/
    
// ****************** End Payment Request *****************



// ****************** Start IPFS Behavior *****************
    mapping (address => string) public userFiles;

    function setFile(string memory file) external {
        userFiles[msg.sender] = file;
    }
// ****************** End IPFS Behavior *****************


    constructor() ERC20("NSFCTokens", "NSFC") {

    }

    /**
     * @dev Returns the number of awards in the AwardInfo array
     * @notice Returns the number of awards in the AwardInfo array
     */
    function getNumberAwards() public view returns (uint) {
        return awards.length;
    }
    /**
     * @dev pauses the contract
     */
    function pause() public onlyOwner {
        _pause();
    }

    /**
     * @dev unpauses the contract
     */
    function unpause() public onlyOwner {
        _unpause();
    }
    
    /**
    // saving this for when I'm ready to shadow USD
    // Let's keep it 18 decimals for now, and round it for display in javascript
    
    function decimals() public view virtual override returns (uint8) {
      return 2;
    }
    
     */

    /** @dev Creates `amount` tokens and assigns them to `account`, increasing
     * the total supply.
     *
     * Emits a {Transfer} event with `from` set to the zero address.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount * 10 ** decimals());
        // _mint(to, amount);
    }

    /**
     * @dev Hook that is called before any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * will be transferred to `to`.
     * - when `from` is zero, `amount` tokens will be minted for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens will be burned.
     * - `from` and `to` are never both zero.
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }

    /**
     * @dev creates a new grant and pushes the struct to the end of the awards array
     * only the contract Owner can create a new grant
     */
    function createGrant(string memory _awardeeName,
            address _awardeeAddr,
            string memory _cageCode, 
            string memory _naicsCode,
            string memory _grantNumber,
            string memory _effectiveDate,
            string memory _completionDate,
            uint  _laborCLINValue,
            uint  _travelCLINValue,
            uint  _odcValue,
            uint  _totalAwardValue
        ) public onlyOwner {
            awards.push(AwardInfo(
            _awardeeName,
            _awardeeAddr,
            _cageCode,
            _naicsCode,
            _grantNumber,
            _effectiveDate,
            _completionDate,
            _laborCLINValue,
            _travelCLINValue,
            _odcValue,
            _totalAwardValue,
            false
        ));

        mint(_awardeeAddr, _totalAwardValue);
        increaseAllowance(_awardeeAddr, _totalAwardValue);

    }

    /**
    * Fallback function - Called if other functions don't match call or
    * sent ether without data
    * Typically, called when invalid data is sent
    * Added so ether sent to this contract is reverted if the contract fails
    * otherwise, the sender's money is transferred to contract
    */
    fallback () external payable {
        revert();
    }

}