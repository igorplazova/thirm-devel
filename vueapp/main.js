


new Vue({
    el: '#trade-app',
    data() {
        var data = {
            last_trade: {},
            trade_history: [],
            wifKey: '',
            isLoginActive: null,
            orderType: 'sell',
            order_book:[],
            coin1Amount:null,
            coin2Amount:null
        };
        data.coins = [{ symbol: 'btc' }, { symbol: 'ltc' }, { symbol: 'usdt' }, { symbol: 'eth' }];
        data.altcoins = data.coins.filter((function (c) { return c.symbol != 'btc' }));

        data.coin1 = getUrlParameter('coin1') || 'eth';
        data.coin2 = getUrlParameter('coin2') || 'btc';
        return data;
    },
    mounted() {
        setInterval(this.updateTradesHistory,
            3000);
        setInterval(this.updateOrderBook,
            3000);
    },
    methods: {
        showLogin: showLogin,
        login: login,
        logout:logout,
        closeLogin: closeLogin,
        makeMarketOrder: makeMarketOrder,
        updateTradesHistory:updateTradesHistory,
        updateOrderBook:updateOrderBook
    }
});


function showLogin(event) {
    this.isLoginActive = true;
}

function login(event) {
    //TODO check the key
    console.log(this.wifKey);
    this.closeLogin();
}

function closeLogin() {
    this.isLoginActive = false;
}

function logout(){
    this.wifKey=null;
}

function makeMarketOrder() {
    var have, haveAmount, want, wantAmount;

    if (this.orderType == 'sell') {

        have = this.coin1;
        haveAmount = this.coin1Amount;
        want = this.coin2;
        wantAmount = this.coin2Amount;

    } else {

        have = this.coin2;
        haveAmount = this.coin2Amount;
        want = this.coin1;
        wantAmount = this.coin1Amount;
    }

    var headers = {
        'x-token': this.wifKey
    }

    axios({
        'method': 'get',
        url: "https://api1.thirm.com/make/" + [have, haveAmount, want, wantAmount].join('/'),
        headers: headers
    }).catch(function (error) {
        console.log(error);
    }).then(response => {
        this.updateOrderBook();
    });
    
}

function updateTradesHistory() {
    axios
        .get("https://api1.thirm.com/public/trades/" + this.coin1 + "_" + this.coin2)
        .then(response => {
            this.trade_history = response.data;
            var t_hist_len = this.trade_history.length
            if (t_hist_len) {
                this.last_trade = this.trade_history[t_hist_len - 1];
            }
        })
}

function updateOrderBook(){
    axios
    .get("https://api1.thirm.com/public/orderbook/" + this.coin1 + "_" + this.coin2)
    .then(response => {
        var order_book = response.data;
        var bids = [];
        var asks = [];
        var bidssum=0;
        for (var i=0;i<order_book.bids.length;i++){
            var price = order_book.bids[i][0];
            var bid = order_book.bids[i][1];
            bidssum+=bid;
            
            bids.push({index:i, price:price, bid:bid, bidssum:bidssum});
        }

        var askssum=0;
        for (var i=0;i<order_book.asks.length;i++){
            var price = order_book.asks[i][0];
            var ask = order_book.asks[i][1];
            askssum+=ask;
            
            asks.push({index:i, price:price, ask:ask, askssum:askssum});
        }
        this.order_book = {bids:bids,asks:asks}
    })
}

function getUrlParameter(ParamName) {
    name = ParamName.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.href);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};