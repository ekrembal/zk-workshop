//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

interface IVerifier {
    function verifyProof(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[1] memory input
    ) external view returns (bool r);
}


contract ZkApp is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;


    struct Proof {
        uint256[2] a;
        uint256[2][2] b;
        uint256[2] c;
    }


    address public immutable verifier;
    uint public immutable c;


    constructor(address verifier_, uint c_) ERC721("ZkApp", "ZKW") {
        verifier = verifier_;
        c = c_;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmSBozZKg7DPHqFcQLAERBN31UNFi7KmBYG9ejjT3KZsFg/";
    }

    function verify(uint256[1] memory publicSignals, Proof memory proof)
        public
        view
        returns (bool)
    {
        bool result = IVerifier(verifier).verifyProof(
            proof.a,
            proof.b,
            proof.c,
            publicSignals
        );
        return result;
    }

    function safeMint(address to, uint256[1] memory publicSignals, Proof memory proof) public onlyOwner {
        require(publicSignals[0] == c, "ZkApp: The proof is not valid");
        require(verify(publicSignals, proof), "ZkApp: The proof is not valid");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return _baseURI();
    }

}