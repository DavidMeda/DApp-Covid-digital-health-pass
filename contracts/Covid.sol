// SPDX-License-Identifier: GPL-3.0
pragma solidity  >=0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

///@title contract for covid healthy documentation passport
///@author Davide Medaglia
contract Covid is Ownable {
    //@ministries: if minestry is set address_minestry->true, otherwise address_minestry->false
    mapping (address => bool) public ministries;
    //@hubs: if hubs is set address_hub->true, otherwise address_hub->false
    mapping (address => bool) public hubs;

    struct Vaccine{
        bytes32 hash;
        uint time;
    }

    struct Test{
        bytes32 hash;
        uint time;
        bool positivity;
    }    
    
    mapping (address => mapping(bytes32 => Vaccine)) private user_vaccine;   //map: address user-> map(hash DocumentID => Vaccine)
    mapping (address => mapping(bytes32 => Test)) private  user_test;        //map: map: address user-> map(hash DocumentID => Test)
    
    event testPublish(address indexed user, address indexed from, bytes32 hashTest, uint time, bool positivity);
    event vaccinoPublish(address indexed user, address indexed from, bytes32 hashCertificate, uint time);
    event newHub(address indexed hubAddress, address indexed from, uint time);
    event newMinestry(address indexed minestryAddress, address indexed from, uint time);
    
    modifier onlyMinestry() {
        require(ministries[msg.sender] ==true, "Only Minestry can add new Hub");
        _;
    }
    
    modifier onlyHub(){
        require(hubs[msg.sender]==true, "Only Hub can call this method");
        _;
    }
    
    function addMinestry(address _ministryAddress) public onlyOwner{
        ministries[_ministryAddress] = true;
        emit newMinestry(_ministryAddress, msg.sender, block.timestamp);
    }    
    
    function addHub(address _hubAddress) public onlyMinestry{
        hubs[_hubAddress] = true;
        emit newHub(_hubAddress, msg.sender, block.timestamp);
    }
    
    function approveTest(bytes32 _hashID, bytes32 _hashTest, bool _positivity,  address _userAddress) public onlyHub{
        uint time = block.timestamp;
        user_test[_userAddress][_hashID] = Test(_hashTest, time, _positivity);
        emit testPublish(_userAddress, msg.sender, _hashTest, time, _positivity);
        }
    
    function approveVaccine(bytes32 _hashID, bytes32 _hashCertificate, address _userAddress) public onlyHub{
        require(user_vaccine[_userAddress][_hashID].time == 0,"Vaccine is already submit for this user");
            uint time = block.timestamp;
            user_vaccine[_userAddress][_hashID] = Vaccine(_hashCertificate, time);
            emit vaccinoPublish(_userAddress, msg.sender, _hashCertificate, time);
    }

    //@return bool result: true if user and document hash correspond
    //@return uint time: time when transaction is mined
    function verificationVaccine(bytes32 _hashID, bytes32 _hashCertificate, address _userAddress) external view returns(bool result, uint time){
        if(user_vaccine[_userAddress][_hashID].hash == _hashCertificate && user_vaccine[_userAddress][_hashID].time > 0) {
            return (true, user_vaccine[_userAddress][_hashID].time);
        }
        return (false, 0);
    }
    
    //@return bool result: true if user and document hash correspond
    //@return uint time: time when transaction is mined
    //@return bool positivity: return true if user is positive to covid, otherwise return false
    function verificationTest(bytes32 _hashID, bytes32 _hashTest, address _userAddress) external view returns(bool result, uint time, bool positivity){
        //address user = checkIdentity(_hashID);
        if(user_test[_userAddress][_hashID].hash == _hashTest && user_test[_userAddress][_hashID].time > 0){
                return (true, user_test[_userAddress][_hashID].time, user_test[_userAddress][_hashID].positivity);
            
        }
        return (false, 0, false);
    }
}