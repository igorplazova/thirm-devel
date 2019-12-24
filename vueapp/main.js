


new Vue({
    el: '#trade-app',
    data() {
        var data = {
            last_trade: {},
            trade_history: [],
            wifKey:'',
            isLoginActive:null
        };
        data.coins = [{ symbol: 'btc' }, { symbol: 'ltc' }, { symbol: 'usdt' }, { symbol: 'eth' }];
        data.altcoins = data.coins.filter((function (c) { return c.symbol != 'btc' }));
        
        data.coin1 = getUrlParameter('coin1') || 'eth';
        data.coin2 = getUrlParameter('coin2')  || 'btc';
        return data;
    },
    mounted() {
        axios
            .get("https://api1.thirm.com/public/trades/" + this.coin1 + "_" + this.coin2)
            .then(response => {
                this.trade_history = response.data;
                var t_hist_len = this.trade_history.length
                if (t_hist_len) {
                    this.last_trade = this.trade_history[t_hist_len - 1];
                }
            })
    },
    methods:{
        showLogin:showLogin,
        login:login
    }
});


function showLogin(event){
    this.isLoginActive = true;
}

function login(event){
    //TODO check the key
    console.log(this.wifKey);
    this.isLoginActive=false;
}


function getUrlParameter(ParamName) {
    name = ParamName.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.href);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};