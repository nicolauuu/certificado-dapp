pragma solidity ^0.8.27;

contract CertificateContract {
    address private owner;

    mapping(string => string) public writters;
    uint writtersSize;

    mapping(string => string) certificates;
    uint certificatesSize;

    event addSign(string newSign);
    event addCertificate(string newCertificate);
    
    modifier isOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
        writtersSize = 0;
        certificatesSize = 0;
    }

    function newWritter(string memory writterSign, string memory userId) public returns (uint) {
        writters[writterSign] = userId;
        writtersSize = writtersSize + 1;
        emit addSign(writterSign);
        return writtersSize;
    }

    function validateWritter(string memory writterSign, string memory writterId) view public returns (bool) {
        return stringsEqual(writters[writterSign], writterId);
    }

    function newCertificate(
        string memory writterId,
        string memory writterSign,
        string memory certificate,
        string memory studentId
    ) public returns (uint) {
        //require (stringsEqual(writters[writterSign], writterId), "No authorized sign");
        certificates[certificate] = studentId;
        emit addCertificate(certificate);
        certificatesSize = certificatesSize + 1;
        return certificatesSize;
    }

    function validateCertificate(string memory studentId, string memory certificate) public view returns (bool) {
        return stringsEqual(certificates[certificate], studentId);
    }

    function stringsEqual(string memory _a, string memory _b) public pure returns (bool) {
        return keccak256(abi.encodePacked(_a)) == keccak256(abi.encodePacked(_b));
    }
 }