

function updateDepthChart() {
    var asks = this.order_book.asks;
    var bids = this.order_book.bids;

    var depth_asks = [];
    for (var i = 0; i < asks.length; i++) {
        if (i == asks.length - 1 || asks[i + 1].price != asks[i].price) {
            depth_asks.push([asks[i].price, asks[i].askssum]);
        }
    }

    var depth_bids = [];
    for (var i = 0; i < bids.length; i++) {
        if (i == bids.length - 1 || bids[i + 1].price != bids[i].price) {
            depth_bids.push([bids[i].price, bids[i].bidssum]);
        }
    }
    if (this.depthChart) {
        this.depthChart.series.update([{
            name: 'Bids',
            data: depth_bids,
            color: '#03a7a8'
        }, {
            name: 'Asks',
            data: depth_asks,
            color: '#fc5857'
        }]);

    } else {
        this.depthChart = Highcharts.chart('depth-chart', {
            chart: {
                type: 'area',
                zoomType: 'xy',
                backgroundColor: 'black',
                animation: false
            },
            title: {
                text: ''
            },
            xAxis: {
                minPadding: 0,
                maxPadding: 0,
                plotLines: [{
                    color: '#888',
                    value: 0.1523,
                    width: 1,
                    label: {
                        text: 'Actual price',
                        rotation: 90
                    }
                }],
                title: {
                    text: 'Price'
                }
            },
            yAxis: [{
                lineWidth: 1,
                gridLineWidth: 1,
                title: null,
                tickWidth: 1,
                tickLength: 5,
                tickPosition: 'inside',
                labels: {
                    align: 'left',
                    x: 8
                }
            }, {
                opposite: true,
                linkedTo: 0,
                lineWidth: 1,
                gridLineWidth: 0,
                title: null,
                tickWidth: 1,
                tickLength: 5,
                tickPosition: 'inside',
                labels: {
                    align: 'right',
                    x: -8
                }
            }],
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillOpacity: 0.2,
                    lineWidth: 1,
                    step: 'center'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size=10px;">Price: {point.key}</span><br/>',
                valueDecimals: 2
            },
            series: [{
                name: 'Bids',
                data: depth_bids,
                color: '#03a7a8'
            }, {
                name: 'Asks',
                data: depth_asks,
                color: '#fc5857'
            }]
        });
    }


    console.log(chart);

}
