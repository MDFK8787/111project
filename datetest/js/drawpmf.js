var x = [];
var y = [];
var xx = ['0'];//作為被x減去的陣列,要得出columns全部加起來=1
var linex = [];//線型pmf的y軸
//myChart.data.labels = y;
//myChart.data.datasets[0].data = x;
/*
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: y,
        datasets: [{
            label: 'pmf',
            lineTension: 0,
            data: x,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],

            borderWidth: 1
        }]
    },
    options: {
        scales: {
            x: {
                beginAtZero: true,
                grid:{
                    color:'white'
                },
                ticks:{
                    display: true,
                    autoSkip: true,
                    maxTicksLimit: 10,
                    color:'white',
                    fontcolor:'white'
                }
            },
            y: {
                beginAtZero: true,
                grid:{
                    color:'white'
                },
                ticks:{
                    display: true,
                    autoSkip: true,
                    maxTicksLimit: 10,
                    color:'white',
                    fontcolor:'white'
                }
            }
        }
    }
});*/

var ctx2 = document.getElementById('myChartline').getContext('2d');//線型pmf
var myChartline = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: y,
        datasets: [{
            label: 'linepmf',
            lineTension: 0,
            fill: true,
            data: linex,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],

            borderWidth: 1
        }]
    },
    options: {
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
                    autoSkip: true,
                    maxTicksLimit: 10,
                    color:'white',
                    fontcolor:'white'
                }
            },
            y: {
                beginAtZero: true,
                grid:{
                    color:'white'
                },
                ticks:{
                    display: true,
                    autoSkip: true,
                    maxTicksLimit: 10,
                    color:'white',
                    fontcolor:'white'
                }
            }
        }
    }
});            
            

function showdate(){//確定按下去會執行的地方
    var date = document.getElementById('date');
    var time = document.getElementById('time');
    var c = document.getElementById('c');
    //console.log(date.value);
    //console.log(time.value);//確認有抓到輸入的日期時間的地方
    var weekArray = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri','Sat');
    date = date.value;
    date = date.replace(/-/g,'/');
    var day = new Date(date).getDay();//將日期轉換成csv要用的形式
    //console.log(day);
    //console.log(weekArray[day]);
    time = time.value;
    time = time.replace(/:/g,'');
    time = time+'00';//將時間轉換成csv要用的形式
    var select = weekArray[day]+'_'+time;//之後用來尋找csv列的名字的變數
    //console.log(time);
    //console.log(select);

                
    //var url = "https://mdfk8787.github.io/111project/datetest/json/20210930-20211006.json";
    var request = new XMLHttpRequest();
    request.open("get", "https://mdfk8787.github.io/111project/datetest/json/20210930-20211006.json");
    request.send(null);
    request.onload = function () {
        if (request.status == 200) {
            var json = JSON.parse(request.responseText);
            //console.log(json);

            x.length = 0;//讓上一個被輸入的圖表y資料被清除
            y.length = 0;//讓上一個被輸入的圖表x資料被清除
            xx = [0];

            var len_json = Object.keys(json).length; //宣告json長度
            for (i=0;i<len_json;i++){
                console.log(json[i]);

                var strike = json[i];//將每一個index的陣列分別抓出來讓select可以選日期時間的columns
                var strike2 = strike[select];//用日期時間的select選擇陣列
                            
                            
                x.push(strike2);//將得到的 列 資料放進陣列當中
                xx.push(strike2);
                x[i] = x[i] - xx[i];//得出pmf的機率(剩餘時間)

                var prob = json[i].field1;//抓出index
                            
                prob1 = (++prob)*c.value;//轉換成歷史指數,之後變數c要連歷史資料##
                //console.log(prob);
                y.push(prob1);

            };
            linex.length = 0;//讓上一個被輸入的圖表linex資料被清除
            for (i=9;i<x.length;i++){//線型pmf
                            
                var xxx = (x[i]+x[i-9]+x[i-8]+x[i-7]+x[i-6]+x[i-5]+x[i-4]+x[i-3]+x[i-2]+x[i-1])/10;
                linex.push(xxx);
            };
            console.log(linex.length);

            //myChart.data.label = y;//x軸
            //myChart.data.datasets[0].data = x;//y軸
            myChartline.data.datasets[0].data = linex;//線型y軸

            //myChart.update()//讓圖表更新
            myChartline.update()
        };
    };

}
