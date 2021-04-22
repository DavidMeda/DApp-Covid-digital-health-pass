// SPDX-License-Identifier: GPL-3.0
pragma solidity  >=0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

///@title contract for covid healthy documentation passport
///@author Davide Medaglia
contract Covid is Ownable {
    //@ministries: if minestry is set address_minestry->true, otherwise address_minestry->false
    mapping (address => bool) private ministries;
    //@hubs: if hubs is set address_hub->true, otherwise address_hub->false
    mapping (address => bool) private hubs;

    struct Vaccine{
        bytes32 hash;
        uint time;
    }

    struct Test{
        bytes32 hash;
        uint time;
        bool positivity;
    }    
    
    mapping(address => Vaccine) private user_Vaccine;   //map: address user-> hash document
    mapping(address => Test) private user_Test;         //map: address user-> hash document
    mapping(bytes32 => address) private user_address;   //map: hash document user-> address user
    
    event testPublish(address indexed user, address indexed from, bytes32 hash, uint time, bool result, bool positivity);
    event vaccinoPublish(address indexed user, address indexed from, bytes32 hash, uint time, bool result);
    event newHub(address indexed hubAddress, address indexed from, uint time);
    event newMinestry(address indexed ministryAddress, address indexed from, uint time);
    event newUser(address indexed userAddress, bytes32 hashID, uint time, bool result);
    

    //aggoungere messaggio a require
    modifier onlyMinestry() {
        require(ministries[msg.sender] ==true);
        _;
    }
    
    modifier onlyHub(){
        require(hubs[msg.sender]==true);
        _;
    }
    
    modifier onlySender(address _sender){
        require(msg.sender == _sender);
        _;
    }
    /* 
    */
    function addMinestry(address _ministryAddress) public onlyOwner{
        ministries[_ministryAddress] = true;
        emit newMinestry(_ministryAddress, msg.sender, block.timestamp);
    }    
    
    function addHub(address _hubAddress) public onlyMinestry{
        hubs[_hubAddress] = true;
        emit newHub(_hubAddress, msg.sender, block.timestamp);
    }
    
    
    function checkIdentity(bytes32 _hashID) public view returns(address) {
        return user_address[_hashID];
    }
    
    function addUser(bytes32 _hashID, address _userAddress) public onlySender(_userAddress){
        if(user_address[_hashID] == address(0)){
            user_address[_hashID] = _userAddress;
            emit newUser(_userAddress, _hashID, block.timestamp, true);
        }
        else{
            emit newUser(_userAddress,_hashID, 0, false);            
        }
    }

    function approveTest(bytes32 _hashID, bytes32 _hashTest, bool _positivity,  address _user) public onlyHub{
        address user = checkIdentity(_hashID);
        if (user == _user){
            uint time = block.timestamp;
            user_Test[user] = Test(_hashTest, time, _positivity);
            emit testPublish(_user, msg.sender, _hashTest, time, true, _positivity);
        }
        else{
            emit testPublish(_user, msg.sender, _hashTest, 0, false, _positivity);
        }
    }
    
    function approveVaccine(bytes32 _hashID, bytes32 _hashCertificate, address _user) public onlyHub{
        address user = checkIdentity(_hashID);
        if (user == _user){
            uint time = block.timestamp;
            user_Vaccine[user] = Vaccine(_hashCertificate, time);
            emit vaccinoPublish(_user, msg.sender, _hashCertificate, time, true);
        }
        else{
            emit vaccinoPublish(_user, msg.sender, _hashCertificate, 0, false);
        }
    }

    ///@return bool: true if user and document hash correspond
    ///@return uint: time when transaction is mined
    function verificationVaccine(bytes32 _hashID, bytes32 _hashCertificate, address _user) external view returns(bool, uint){
        address user = checkIdentity(_hashID);
        if(user == _user) {
            if(user_Vaccine[user].hash == _hashCertificate){
                return (true, user_Vaccine[user].time);
            }
        }
        return (false, 0);
    }
    
    ///@return bool: true if user and document hash correspond
    ///@return uint: time when transaction is mined
    ///@return bool: return true if user is positive to covid, otherwise return false
    function verificationTest(bytes32 _hashID, bytes32 _hashTest, address _user) external view returns(bool, uint, bool){
        address user = checkIdentity(_hashID);
        if(user == _user) {
            if(user_Test[user].hash == _hashTest){
                return (true, user_Test[user].time, user_Test[user].positivity);
            }
        }
        return (false, 0, false);
    }
}