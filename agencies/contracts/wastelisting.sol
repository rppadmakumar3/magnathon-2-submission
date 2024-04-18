// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract wastelisting {
    struct Listing {
        string wasteType;
        uint256 quantity;
        string priceMode;
        string currency;
        string country;
        string state;
        uint256 timestamp;
        address from;
        uint256 fixedPrice; // Added for fixed price
    }

    Listing[] public listings;
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    event ListingCreated(
        string wasteType,
        uint256 quantity,
        string priceMode,
        string currency,
        string country,
        string state,
        uint256 timestamp,
        address from,
        uint256 fixedPrice
    );

    event Debug(string message);

    function createListing(
        string memory _wasteType,
        uint256 _quantity,
        string memory _priceMode,
        string memory _currency,
        string memory _country,
        string memory _state,
        uint256 _fixedPrice
    ) external payable {
        require(msg.value > 0, "Please pay more than 0 ether");
        owner.transfer(msg.value);

        // Check if the price mode is "Fixed" and ensure a valid fixed price is provided
        require(
            (keccak256(abi.encodePacked(_priceMode)) == keccak256(abi.encodePacked("Fixed")) && _fixedPrice > 0) ||
            (keccak256(abi.encodePacked(_priceMode)) == keccak256(abi.encodePacked("Biddings"))),
            "Invalid price mode or fixed price for the selected price mode"
        );

        if (keccak256(abi.encodePacked(_priceMode)) == keccak256(abi.encodePacked("Biddings"))) {
            // Set fixedPrice to 0 for Biddings option
            _fixedPrice = 0;
        }

        Listing memory newListing;
        newListing.wasteType = _wasteType;
        newListing.quantity = _quantity;
        newListing.priceMode = _priceMode;
        newListing.currency = _currency;
        newListing.country = _country;
        newListing.state = _state;
        newListing.timestamp = block.timestamp;
        newListing.from = msg.sender;
        newListing.fixedPrice = _fixedPrice;

        listings.push(newListing);

        emit ListingCreated(
            _wasteType,
            _quantity,
            _priceMode,
            _currency,
            _country,
            _state,
            block.timestamp,
            msg.sender,
            _fixedPrice
        );
    }

    function getListings() external view returns (Listing[] memory) {
        return listings;
    }
}