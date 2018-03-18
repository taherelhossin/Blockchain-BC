pragma solidity ^0.4.17;

import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';

contract TataToken is StandardToken {
    string public name = "TataToken";
    string public symbol = "TTK";
    uint8 public decimals = 18;
    address  owner;
    

    uint public INITIAL_SUPPLY = 1000000;
    uint public RATE = 1; 


    function TataToken(bytes32[] movieNames) public {
         owner = msg.sender;
         totalSupply_ = INITIAL_SUPPLY;
         balances[msg.sender] = INITIAL_SUPPLY;
         movieList = movieNames;
    }

    function buyTokens() public payable {
    
        // Calculate tokens to sell
        uint256 weiAmount = msg.value;  // i.e 10**18 = 1 ether
        uint256 tokens = weiAmount.mul(RATE);
        require(tokens>0);
    
        balances[owner] =  balances[owner] - tokens;
        balances[msg.sender] =  balances[msg.sender]+ tokens;
        // Send money to owner
        owner.transfer(msg.value);
      }



   // ------------------------------------------------------------------------------------------

     mapping (bytes32 => uint8) public ratingsReceived;
  
  /* We will use an array of bytes32 to store the list of movies
  */
    bytes32[] public movieList;

  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. When we deploy the contract,
  we will pass an array of movies for which users will give ratings
  */

  // This function returns the total ratings a movie has received so far
    function totalVotesFor(bytes32 movie) public view returns (uint8) {
         return ratingsReceived[movie];
     }

  // This function increments the vote count for the specified movie. Equivalent to upvoting
  function voteForMovie(bytes32 movie) public 
  {
      require(balances[msg.sender] > 1);
       balances[msg.sender] -= 1;
        ratingsReceived[movie] += 1;
  }

}