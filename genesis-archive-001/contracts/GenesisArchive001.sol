// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Royalty} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";

/// @title Genesis Archive #001
/// @notice A non-upgradeable 1/1 ERC-721 with fixed IPFS metadata.
/// @dev ERC-2981 royalty information is signaled, not enforced by every marketplace.
contract GenesisArchive001 is ERC721Royalty, Ownable {
    uint256 public constant TOKEN_ID = 1;
    uint96 public constant MAX_ROYALTY_BPS = 1_000;

    string private _metadataURI;
    bool public minted;

    error InvalidMetadataURI();
    error InvalidRoyaltyReceiver();
    error RoyaltyTooHigh(uint96 requestedBps, uint96 maximumBps);
    error InvalidRecipient();
    error AlreadyMinted();

    event GenesisMinted(address indexed recipient, uint256 indexed tokenId, string metadataURI);

    constructor(
        string memory metadataURI_,
        address royaltyReceiver_,
        uint96 royaltyBps_
    ) ERC721("Genesis Archive #001", "GENESIS001") Ownable(msg.sender) {
        bytes memory uriBytes = bytes(metadataURI_);
        if (
            uriBytes.length <= 7 ||
            uriBytes[0] != 0x69 ||
            uriBytes[1] != 0x70 ||
            uriBytes[2] != 0x66 ||
            uriBytes[3] != 0x73 ||
            uriBytes[4] != 0x3a ||
            uriBytes[5] != 0x2f ||
            uriBytes[6] != 0x2f
        ) revert InvalidMetadataURI();

        if (royaltyReceiver_ == address(0)) revert InvalidRoyaltyReceiver();
        if (royaltyBps_ > MAX_ROYALTY_BPS) {
            revert RoyaltyTooHigh(royaltyBps_, MAX_ROYALTY_BPS);
        }

        _metadataURI = metadataURI_;
        _setDefaultRoyalty(royaltyReceiver_, royaltyBps_);
    }

    /// @notice Mints the only token; owner-only and callable once.
    function mint(address recipient) external onlyOwner {
        if (minted) revert AlreadyMinted();
        if (recipient == address(0)) revert InvalidRecipient();

        minted = true;
        _safeMint(recipient, TOKEN_ID);
        emit GenesisMinted(recipient, TOKEN_ID, _metadataURI);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        return _metadataURI;
    }

    function metadataURI() external view returns (string memory) {
        return _metadataURI;
    }
}
