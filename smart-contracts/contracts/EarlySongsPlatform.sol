// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./ShareableSong.sol";

contract EarlySongsPlatform is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;

    address payable owner;

    uint256 listingPrice = 0.001 ether;

    constructor() {
        owner = payable(msg.sender);
    }

    struct PlatformItem {
        uint256 itemId;
        address nftContract;
        address payable artist;
        uint256 mintPrice;
    }

    mapping(uint256 => PlatformItem) idToPlatformItem;

    event PlatformItemCreated(
        uint256 indexed itemId,
        address indexed nftContract,
        address artist,
        uint256 mintPrice
    );

   
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    // Function for artists to list a contract for a new song created
    function createPlatformItem(address nftContract, uint256 mintPrice) public payable nonReentrant {
        require(msg.value == listingPrice, "Price must be equal to listing price");
        _itemIds.increment();
        uint256 itemId = _itemIds.current();
        idToPlatformItem[itemId] = PlatformItem(
            itemId,
            nftContract,
            payable(msg.sender),
            mintPrice
        );
        emit PlatformItemCreated(itemId, nftContract, msg.sender, mintPrice);
    }

    function fetchPlatformItems() public view returns (PlatformItem[] memory) {
        uint256 itemCount = _itemIds.current();
        uint256 currentIndex = 0;
        PlatformItem[] memory items = new PlatformItem[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            items[currentIndex] = idToPlatformItem[i + 1];
            currentIndex += 1;
        }
        return items;
    }

    function fetchSingleItem(uint256 itemId) public view returns (PlatformItem memory) {
        return idToPlatformItem[itemId];
    }

    function mintNewNFT(uint256 itemId) public payable nonReentrant returns (uint256) {        
        uint256 mintPrice = idToPlatformItem[itemId].mintPrice;

        // Transfer mintPrice to artist
        idToPlatformItem[itemId].artist.transfer(mintPrice);

        ShareableSong nftContract = ShareableSong(idToPlatformItem[itemId].nftContract);
        uint256 newTokenId = nftContract.mint(msg.sender);

        return newTokenId;
    }
}