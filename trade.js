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
   row.insertCell(3).innerHTML = `<button  class="button is-small is-danger"  onclick=ordercancel("${elementp.id}")>Cancel</button>`;

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
   url : "https://api.thirm.com/orderhistory?have="+ coin1 +"&want="+coin2,
   beforeSend: function(xhr){xhr.setRequestHeader('token', usertoken);},
   success : function(result) {
   mydata = result;

mydata.forEach(function(elementp) {
   var table = document.getElementById("myTable2");
   var row = table.insertRow(-1);
   var pukki = elementp.haveamount/elementp.wantamount;

	 graph(elementp.time,pukki);

   row.insertCell(0).innerHTML = `${elementp.time}`;
   row.insertCell(1).innerHTML = `${elementp.id}`;
   row.insertCell(2).innerHTML = `${elementp.have}`;
   row.insertCell(3).innerHTML = `${elementp.want}`;
   row.insertCell(4).innerHTML = `${elementp.haveamount}`;
   row.insertCell(5).innerHTML = `${pukki}`;
   row.insertCell(6).innerHTML = `${elementp.wantamount}`;
});
   },
   error : function(result) {
    location.reload(true);
   }
 });


 $.ajax({
    type : "GET",
    url : "https://api.thirm.com/orderhistory?have="+ coin2 +"&want="+coin1,
    beforeSend: function(xhr){xhr.setRequestHeader('token', usertoken);},
    success : function(result) {
    mydata = result;



 mydata.forEach(function(elementp) {
    var table = document.getElementById("myTable22");
    var row = table.insertRow(-1);
    var pukki = elementp.wantamount/elementp.haveamount;

	 graph(elementp.time,pukki);

    row.insertCell(0).innerHTML = `${elementp.time}`;
    row.insertCell(1).innerHTML = `${elementp.id}`;
    row.insertCell(2).innerHTML = `${elementp.have}`;
    row.insertCell(3).innerHTML = `${elementp.want}`;
    row.insertCell(4).innerHTML = `${elementp.haveamount}`;
    row.insertCell(5).innerHTML = `${pukki}`;
    row.insertCell(6).innerHTML = `${elementp.wantamount}`;
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
   url : "https://api.thirm.com/orderbook?orderby=0&have="+coin1+"&want="+coin2,
   beforeSend: function(xhr){xhr.setRequestHeader('token', usertoken);},
   success : function(result) {
   mydata = result;

mydata.forEach(function(elementp) {
   var table = document.getElementById("tab1");
   var row = table.insertRow(-1);
   var pukki = elementp.haveamount/elementp.wantamount;

   row.insertCell(0).innerHTML = `${elementp.id}`;
   row.insertCell(1).innerHTML = `${elementp.haveamount} ${elementp.have}`;
   row.insertCell(2).innerHTML = `${elementp.wantamount} ${elementp.want}`;
   row.insertCell(3).innerHTML = `${pukki}`;
   row.insertCell(4).innerHTML = `<button  class="button is-small is-success"  onclick=take("${elementp.id}")>Take</button>`;
});

   },
   error : function(result) {
    location.reload(true);
   }
 });


$.ajax({
   type : "GET",
   url : "https://api.thirm.com/orderbook?orderby=1&have="+coin2+"&want="+coin1,
   beforeSend: function(xhr){xhr.setRequestHeader('token', usertoken);},
   success : function(result) {
	 mydata = result;

mydata.forEach(function(elementp) {
   var table = document.getElementById("tab2");
   var row = table.insertRow(-1);
   var pukki = elementp.wantamount/elementp.haveamount;
       pukki = pukki.toFixed(8);

   row.insertCell(0).innerHTML = `${elementp.id}`;
   row.insertCell(1).innerHTML = `${elementp.haveamount} ${elementp.have}`;
   row.insertCell(2).innerHTML = `${elementp.wantamount} ${elementp.want}`;
   row.insertCell(3).innerHTML = `${pukki}`;
   row.insertCell(4).innerHTML = `<button  class="button is-small is-success"  onclick=take("${elementp.id}")>Take</button>`;

});

   },
   error : function(result) {
    location.reload(true);
   }
 });
