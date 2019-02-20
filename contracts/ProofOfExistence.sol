pragma solidity ^0.5.0;

contract ProofOfExistence {
    
    event ProofCreated(
        uint256 indexed id,
        bytes32 documentHash
    );

    address public owner;
  
    mapping (uint256 => bytes32) hashesById;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner is allowed to access this function.");
        _;
    }

    modifier noHashExistsYet(uint256 id) {
        require(hashesById[id] == "", "No hash exists for this id.");
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function notarizeHash(uint256 id, bytes32 documentHash) public onlyOwner noHashExistsYet(id) {
        hashesById[id] = documentHash;

        emit ProofCreated(id, documentHash);
    }

    function doesProofExist(uint256 id, bytes32 documentHash) public view returns (bool) {
        return hashesById[id] == documentHash;
    }
}
