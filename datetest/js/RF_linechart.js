var x = [];
var y = [];
var linex1 = [];//線型pmf的y軸

var plugin = {//資料點上的線
    afterDatasetsDraw: function(chart) {
       if(chart.tooltip._active && chart.tooltip._active.length) {
            var activePoint = chart.tooltip._active[0];
            var ctx = chart.ctx;
            var y_axis = chart.scales['y-axis-0'];
            //console.log(chart.chartArea.bottom)

            ctx.save();
            ctx.beginPath();
            ctx.setLineDash([5,7]);//虛線
            ctx.moveTo(activePoint.element.x, 32);//讓程式知道要在網頁的哪個座標x顯示線,32是線的最高點
            ctx.lineTo(activePoint.element.x, 586.1671534784361);//線的最低點
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'green';
            ctx.stroke();
            ctx.restore();
        }
    }
};

var ctx2 = document.getElementById('myChartline').getContext('2d');//RF線型
var myChartline = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: y,
        datasets: [{
            label: 'linepmf1',
            lineTension: 0,
            fill: true,
            data: linex1,
            backgroundColor: [
                'rgba(255, 104, 171, 0.47)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],

            tension:0.4
        }
    ]
    },
    options: {
        maintainAspectRatio: false,
        elements:{
            point:{
                radius:0
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                grid:{
                    color:'white'
                },
                ticks:{
                    display: true,
                    stepsize: 10,
                    autoSkip: true,
                    maxTicksLimit: 10,
                    color:'black',
                    fontcolor:'black'
                }
            },
            y: {
                beginAtZero: true,
                grid:{
                    color:'white'
                },
                ticks:{
                    stepsize: 10,
                    display: true,
                    autoSkip: true,
                    maxTicksLimit: 10,
                    color:'black',
                    fontcolor:'black'
                }
            }
        }
    },
    plugins:[plugin]//線的插入點
});            
//console.log(Chart)
function showdate(){//確定按下去會執行的地方
    var date = document.getElementById('date');
    var time = document.getElementById('time');
    var c = document.getElementById('c');
    //console.log(date.value);
    //console.log(time.value);//確認有抓到輸入的日期時間的地方
    //var weekArray = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri','Sat');
    date = date.value;
    date = date.replace(/-/g,'/');
    time = time.value;
    var select = date+' '+time;//之後用來尋找csv[ 列 ]的名字的變數
    console.log(select);
      
    //var url = "https://mdfk8787.github.io/111project/datetest/json/20210930-20211006.json";
    var request = new XMLHttpRequest();
    request.open("get", "https://mdfk8787.github.io/111project/datetest/json/20211229.json");
    request.send(null);
    request.onload = function () {
        if (request.status == 200) {
            var json = JSON.parse(request.responseText);
            console.log(json);

            x.length = 0;//讓上一個被輸入的圖表y資料被清除
            y.length = 0;//讓上一個被輸入的圖表x資料被清除

            var len_json = Object.keys(json).length; //宣告json長度
            for (i=0;i<len_json;i++){
                //console.log(json[i]);

                var strike = json[i];//將每一個index的陣列分別抓出來讓select可以選日期時間的columns
                var strike2 = strike[select];//用日期時間的select選擇陣列
                            
                            
                x.push(strike2);//將得到的 列 資料放進陣列當中

                var prob = json[i].field1;//抓出index
                            
                prob1 = Math.round((++prob)*c.value);//轉換成歷史指數,之後變數c要連歷史資料##
                //console.log(prob);
                y.push(prob1);

            };

            //myChart.data.label = y;//x軸
            //myChart.data.datasets[0].data = x;//y軸
            myChartline.data.datasets[0].data = x;//線型y軸紅色區域
            //myChart.update()//讓圖表更新
            myChartline.update()
        };
    };

}