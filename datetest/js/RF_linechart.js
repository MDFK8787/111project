var real_x = [];
var real_y = [];
var linex1 = [];//線型pmf的y軸
var data = [];//常態分配資料
var scaleFactor = 100
      mean = 417,//from   w ww. de m o  2  s .  co  m
      sigma = 80;

var plugin = {//資料點上的線
    afterDatasetsDraw: function(chart) {
       if(chart.tooltip._active && chart.tooltip._active.length) {
            var activePoint = chart.tooltip._active[0];
            var ctx = chart.ctx;
            var y_axis = chart.scales['y-axis-0'];
            console.log(chart.chartArea.bottom)

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
        labels: real_x,
        datasets: [{
            label: 'linepmf1',
            fill: true,
            data: linex1,
            backgroundColor:'rgba(0, 0, 0, 0.39)',
            borderColor:'rgba(0, 0, 0, 0.39)',
            tension:1
        },{
            label:false,
            fill: true,
            data:data,
            pointHitRadius: 0,
            showLine:true,//顯示出線
            backgroundColor:'rgba(255, 0, 0, 0.3)',
            borderColor:'rgba(255, 0, 0, 0.3)',
            type: 'scatter'
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

function gaussian(x) {//PDF
    var gaussianConstant = 1 / Math.sqrt(2 * Math.PI);
    x = (x - mean) / sigma;
    return gaussianConstant * Math.exp(-.5 * x * x) / sigma;
 };

function showdate(){//按下確定按鈕執行的地方
    var date = document.getElementById('date');
    var time = document.getElementById('time');
    var c = document.getElementById('c');
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

            real_y.length = 0;//讓上一個被輸入的圖表y資料被清除
            real_x.length = 0;//讓上一個被輸入的圖表x資料被清除

            var len_json = Object.keys(json).length; //宣告json長度
            for (i=0;i<len_json;i++){
                //console.log(json[i]);

                var strike = json[i];//將每一個index的陣列分別抓出來讓select可以選日期時間的columns
                var strike2 = strike[select];//用日期時間的select選擇陣列
                                     
                real_y.push(strike2);//將得到的 列 資料放進陣列當中

                var prob = json[i].field1;//抓出index    
                prob1 = Math.round((++prob)*c.value);//轉換成歷史指數,之後變數c要連歷史資料##
                //console.log(prob);
                real_x.push(prob1);

            };
            console.log(real_y);
            linex1.length = 0;//讓上一個被輸入的圖表linex資料被清除

            for (i=9;i<real_y.length;i++){//線型pmf
                            
                var xxx =(real_y[i]+real_y[i-9]+real_y[i-8]+real_y[i-7]+real_y[i-6]+real_y[i-5]+real_y[i-4]+real_y[i-3]+real_y[i-2]+real_y[i-1])/10;//剩餘時間計算公式
                linex1.push(xxx);
                
            };
            console.log(linex1);
            real_x.sort(function (a, b) {
                return a - b
            });

            data.length = 0;
            for(x=0;x<linex1.length;x+=1) {
                var y = gaussian(x)
                data.push({x:real_x[x],y:y*scaleFactor});
            }

            myChartline.data.datasets[0].data = linex1;//線型y軸紅色區域
            myChartline.data.datasets[1].data = data;
            //myChart.update()//讓圖表更新
            myChartline.update()
        };
    };

}