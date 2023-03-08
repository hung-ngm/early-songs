// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "./interfaces/IERC5023.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ShareableSong is ERC721URIStorage, Ownable, IERC5023 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string private _metadata;
    
    string baseURI;
    uint256 timestamp;
    uint256 public maxSupply;
    address platformAddress;

    constructor(
        string memory metadata_,
        uint256 _timestamp,
        uint256 _maxSupply,
        address _platformAddress
    ) ERC721("New Release Song", "SNFT") {
        _metadata = metadata_;
        timestamp = _timestamp;
        maxSupply = _maxSupply;
        platformAddress = _platformAddress;
    }

    modifier onlyAvailableAfterTimestamp {
        require(block.timestamp >= timestamp, "Method not available yet");
        _;
    }

    modifier onlyLowerThanMaxSupply {
        require(_tokenIds.current() < maxSupply, "Max supply reached");
        _;
    }

    modifier onlyPlatform {
        require(msg.sender == platformAddress, "Only platform can call this function");
        _;
    }

    function mint(address account) external onlyPlatform onlyLowerThanMaxSupply returns (uint256) {
        uint256 newItemId = _tokenIds.current();
        _mint(account, newItemId);
        _setTokenURI(newItemId, _metadata);
        _tokenIds.increment();
        return newItemId;
    }

    function share(
        address to,
        uint256 tokenIdToBeShared
    ) external onlyAvailableAfterTimestamp returns (uint256 newTokenId) {
        require(to != address(0), "ERC721: mint to the zero address");
        require(
            _exists(tokenIdToBeShared),
            "ShareableERC721: token to be shared must exist"
        );

        require(
            msg.sender == ownerOf(tokenIdToBeShared),
            "Method caller must be the owner of token"
        );

        string memory _tokenURI = tokenURI(tokenIdToBeShared);
        uint256 newItemId = _tokenIds.current();
        _mint(to, newItemId);
        _setTokenURI(newItemId, _tokenURI);

        emit Share(msg.sender, to, newItemId, tokenIdToBeShared);
        _tokenIds.increment();

        return newItemId;
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        revert("In this reference implementation tokens are not transferrable");
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        revert("In this reference implementation tokens are not transferrable");
    }

    function getBlockTimestamp() public view returns (uint256) {
        return block.timestamp;
    }

    function getMaxSupply() public view returns (uint256) {
        return maxSupply;
    }

    function getCurrentTokenId() public view returns (uint256) {
        return _tokenIds.current();
    }

    function getMetadata() public view returns (string memory) {
        return _metadata;
    }

    function setMetadata(string memory metadata_) external onlyOwner {
        _metadata = metadata_;
    }

    function setTimestamp(uint256 _timestamp) external onlyOwner {
        timestamp = _timestamp;
    }

    function setMaxSupply(uint256 _maxSupply) external onlyOwner {
        maxSupply = _maxSupply;
    }

}