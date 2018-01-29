/*

    Frozen Orange Juice PPI
   This contract keeps in storage a reference
   to the frozen orange juice purchase price index. 

*/





pragma solidity ^0.4.0;

import "./oraclizeAPI_0.5.sol";



contract FrozenOJ is usingOraclize {

    

    uint public FrozenOJPPI;



    event newOraclizeQuery(string description);

    event newFrozenOJPrice(string price);



    function FrozenOJPrice() {

        update(); // first check at contract creation

    }



    function __callback(bytes32 myid, string result) {

        if (msg.sender != oraclize_cbAddress()) throw;

        newFrozenOJPrice(result);

        FrozenOJPPI = parseInt(result, 2); // let's save it as $ cents

    }

    

    function update() payable {

        newOraclizeQuery("Oraclize query was sent, standing by for the answer..");

        oraclize_query("URL", "json(https://www.quandl.com/api/v3/datasets/FRED/WPU02420301.json?limit=1&api_key=oYwiAMSiEFRSzAHVKo6j).dataset.data[0][1]");

    }

    

}

