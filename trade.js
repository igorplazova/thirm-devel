usertoken =  localStorage.getItem("usertoken");
if (usertoken == null) { window.location = "https://thirm.com"; }

coin1 = getSearchParams("coin1");
if (coin1 == null) { coin1 = "btc"; }

coin2 = getSearchParams("coin2");
if (coin2 == null) { coin2 = "nano"; }


$(".coin1").text(coin1);
$(".coin2").text(coin2);








//functions
function logout(){
usertoken =  localStorage.removeItem("usertoken");
location.reload(true);
}



function pingdom(input){
	 a = document.getElementById("boonk1").value;
	 b = document.getElementById("boonk2").value;
	 c = document.getElementById("pingdom").value;

	 if(input>1){
	document.getElementById("boonk2").value = a/c;
	 }else{
	document.getElementById("boonk1").value = b*c;
	 }
}


function getSearchParams(k){
 var p={};
 location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){p[k]=v})
 return k?p[k]:p;
}



$.ajax({
   type : "GET",
   url : "https://api.thirm.com/account",
   beforeSend: function(xhr){xhr.setRequestHeader('token', usertoken);},
   success : function(result) {
	 mydata = result;
         console.log(mydata);

	   	 document.getElementById("btcbalance").innerText = mydata.btc + " BTC";
	   	 document.getElementById("dashbalance").innerText = mydata.dash + " DASH";
	   	 document.getElementById("dogebalance").innerText = mydata.doge + " DOGE";
	   	 document.getElementById("ltcbalance").innerText = mydata.ltc + " LTC";
	   	 document.getElementById("nanobalance").innerText = mydata.nano + " NANO";
	   	 document.getElementById("xrpbalance").innerText = mydata.xrp + " XRP";
	   	 document.getElementById("zecbalance").innerText = mydata.zec + " ZEC";
	   	 document.getElementById("ethbalance").innerText = mydata.eth + " ETH";
	   	 document.getElementById("bchbalance").innerText = mydata.eth + " BCH";
	   	 document.getElementById("usdtbalance").innerText = mydata.eth + " USDT";

	 mmydata = mydata.orders;
	 mmydata2 = mydata.orders_history_make;
	 mmydata3 = mydata.orders_history_take;

	 mmydata.forEach(function(elementp) {

	  var table = document.getElementById("myTablemy");
    var row = table.insertRow(-1);

   row.insertCell(0).innerHTML = `${elementp.id}`;
   row.insertCell(1).innerHTML = `${elementp.have2} ${elementp.have}`;
   row.insertCell(2).innerHTML = `${elementp.want2} ${elementp.want}`;
   row.insertCell(3).innerHTML = `<a onclick=ordercancel("${elementp.id}")>Cancel</a>`;

	 });

	 mmydata2.forEach(function(elementp) {

		var table = document.getElementById("myTablemy2");
		 var row = table.insertRow(-1);

		row.insertCell(0).innerHTML = `${elementp.id}`;
		row.insertCell(1).innerHTML = `${elementp.have2} ${elementp.have}`;
		row.insertCell(2).innerHTML = `${elementp.want2} ${elementp.want}`;

	 });

	 mmydata3.forEach(function(elementp) {

		var table = document.getElementById("myTablemy3");
		 var row = table.insertRow(-1);

		row.insertCell(0).innerHTML = `${elementp.id}`;
		row.insertCell(1).innerHTML = `${elementp.have2} ${elementp.have}`;
		row.insertCell(2).innerHTML = `${elementp.want2} ${elementp.want}`;

	 });



   },
   error : function(result) {
    location.reload(true);
   }
 });















$.ajax({
   type : "GET",
   url : "https://api.thirm.com/public/trades?id="+ coin1 +"_"+coin2,
   success : function(result) {
  

result.forEach(function(elementp) {
   var table = document.getElementById("myTable2");
   var row = table.insertRow(-1);
   var pukki = elementp.base_volume/elementp.quote_volume;
       pukki = pukki.toFixed(8);
	   
   row.insertCell(0).innerHTML = `<span class="timeago" title="${elementp.trade_timestamp}">${elementp.trade_timestamp}</span> `;
   row.insertCell(1).innerHTML = `${elementp.tradeID}`;
   row.insertCell(2).innerHTML = `${elementp.base_volume}`;
   row.insertCell(3).innerHTML = `${elementp.quote_volume}`;
   row.insertCell(4).innerHTML = `${pukki}`;
   row.insertCell(5).innerHTML = `${elementp.type}`;
});
   },
   error : function(result) {
    location.reload(true);
   }
 });



















function ordercancel(inputnow){
$.ajax({
   type : "GET",
   url : "https://api.thirm.com/ordercancel?id="+ inputnow,
   beforeSend: function(xhr){xhr.setRequestHeader('token', usertoken);},
   success : function(result) {
     console.log("sucess");
     location.reload(true);
   },
   error : function(result) {
    location.reload(true);
   }
 });
}



function take(inputnow){
$.ajax({
   type : "GET",
   url : "https://api.thirm.com/take?id="+ inputnow,
   beforeSend: function(xhr){xhr.setRequestHeader('token', usertoken);},
   success : function(result) {
     console.log("sucess");
     location.reload(true);
   },
   error : function(result) {
    location.reload(true);
   }
 });
}


function create(input){

	if(input>1){
	inputnowhave = coin1;
    inputnowwant = coin2;
	inputnowhaveamount = document.getElementById("boonk1").value;
    inputnowwantamount = document.getElementById("boonk2").value;
	}else{
	inputnowhave = coin2;
    inputnowwant = coin1;
    inputnowhaveamount = document.getElementById("boonk2").value;
    inputnowwantamount = document.getElementById("boonk1").value;
	}




$.ajax({
   type : "GET",
   url : "https://api.thirm.com/make?have="+ inputnowhave + "&want=" + inputnowwant + "&haveamount=" + inputnowhaveamount +  "&wantamount=" + inputnowwantamount,
   beforeSend: function(xhr){xhr.setRequestHeader('token', usertoken);},
   success : function(result) {
     console.log("sucess");
     location.reload(true);
   },
   error : function(result) {
    location.reload(true);
   }
 });
}



function withdraw(){
ppcoin = document.getElementById("pcoin").value;
ppaddress = document.getElementById("paddress").value;
ppamount = document.getElementById("pamount").value;

$.ajax({
   type : "GET",
   url : "https://api.thirm.com/withdraw?coin="+ ppcoin + "&address=" + ppaddress + "&amount=" + ppamount,
   beforeSend: function(xhr){xhr.setRequestHeader('token', usertoken);},
   success : function(result) {
     console.log("sucess");
     location.reload(true);
   },
   error : function(result) {
    location.reload(true);
   }
 });

}




function deposit(){
ppdeposit = document.getElementById("depositcoin").value;
$.ajax({
   type : "GET",
   url : "https://api.thirm.com/deposit?coin="+ ppdeposit ,
   beforeSend: function(xhr){xhr.setRequestHeader('token', usertoken);},
   success : function(result) {
     console.log("sucess");
     mydata = result;
     document.getElementById("depositspan").value = mydata.address;
   },
   error : function(result) {
    location.reload(true);
   }
 });
}


$.ajax({
   type : "GET",
   url : "https://api.thirm.com/public/orderbook2?id="+coin1+"_"+coin2,
   success : function(result) {
   ask = result.asks;
   bid = result.bids; 
   
ask.forEach(function(elementp) {
console.log(elementp);

   var table = document.getElementById("tab1");
   var row = table.insertRow(-1);
   var pukki = elementp[1]/elementp[2];
   pukki = pukki.toFixed(8);
   
   row.insertCell(0).innerHTML = `${elementp[0]}`;
   row.insertCell(1).innerHTML = `${elementp[1]}`;
   row.insertCell(2).innerHTML = `${elementp[2]}`;
   row.insertCell(3).innerHTML = `${pukki}`;
   row.insertCell(4).innerHTML = `<a onclick=take("${elementp[0]}")>take</a>`;

});

bid.forEach(function(elementp) {
console.log(elementp);

   var table = document.getElementById("tab2");
   var row = table.insertRow(-1);
   var pukki = elementp[1]/elementp[2];
   pukki = pukki.toFixed(8);
   
   row.insertCell(0).innerHTML = `${elementp[0]}`;
   row.insertCell(1).innerHTML = `${elementp[1]}`;
   row.insertCell(2).innerHTML = `${elementp[2]}`;
   row.insertCell(3).innerHTML = `${pukki}`;
   row.insertCell(4).innerHTML = `<a onclick=take("${elementp[0]}")>take</a>`;

});

   },
   error : function(result) {
    location.reload(true);
   }
 });


