
wif = '5Jbtrg6114EN7DF1UyLa8uydGnr7bzUXwLZkpVqRnZPMFpecr3Z';
const request = require('request');
data = []
coin1 = 'eth';
coin2 = 'btc';
request('https://api.bitfinex.com/v1/book/ETHBTC?_bfx_full=1', function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', body); // Print the HTML for the Google homepage.
  data = JSON.parse(body)
  requests = [];
  
  makeOrders('asks');
  makeOrders('bids');

  function makeOrders(orderType) {
    console.log(orderType);
    step = Math.floor(data[orderType].length / 10)
    j=0;
    
    for (var i = 0; i < 20; i += 1) {
      
      order = data[orderType][i];

      coin1Amount = order['amount'];
      coin2Amount = coin1Amount*order['price'];

      if (orderType == 'asks') {

        have = coin1;
        haveAmount = coin1Amount;
        want = coin2;
        wantAmount = coin2Amount;

      } else {

        have = coin2;
        haveAmount = coin2Amount;
        want = coin1;
        wantAmount = coin1Amount;
      }
      req_options = {
        url : `https://api1.thirm.com/make/${have}/${haveAmount}/${want}/${wantAmount}`,
        headers:{
          'x-token': wif
        }

      }
      console.log(req_options);
      requests.push(req_options);
      
      
    }
    
    


  }

  for (var i=0;i<requests.length;i++){
  
    setTimeout(function(req){
      console.log(req.url);
      request(req, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode);
        console.log(body);
      })
    }, i*1000,requests[i]);
  }

});