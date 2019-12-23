


new Vue({
    el: '#trade-app',
    data () {
        var data = {};
        data.coins = [{symbol:'btc'},{symbol:'ltc'},{symbol:'usdt'},{symbol:'eth'}];
        data.altcoins = data.coins.filter((function(c){return c.symbol!='btc'}));
        data.coin1 = getSearchParams("coin1") || 'btc';
        data.coin2 = getSearchParams("coin2") || 'eth';
        data.trade_history=[];
        return data;
    },
    mounted () {
        axios
          .get("https://api1.thirm.com/public/trades/"+ this.coin1 +"_" + this.coin2)
          .then(response => (this.trade_history = response.data))
      }
  });


  

function getSearchParams(k){
    var p={};
    location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){p[k]=v})
    return k?p[k]:p;
   }