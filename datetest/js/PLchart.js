
var p = [];//profit
var l = [];//lost

var ctx3 = document.getElementById('plchart').getContext('2d');//profit&lost testing
var plchart = new Chart(ctx3, {
    type: 'line',
    data: {
        labels:[1000,2000,3000,4000,5000],
        datasets: [{
            label: 'profit',
            lineTension: 0,
            fill: true,
            data:p,
            backgroundColor: 'rgba(146, 255, 140, 0.5)',
            borderColor: 'rgba(11, 215, 0, 1)',
            tension:0.4
        },{
            label: 'lost',
            lineTension: 0,
            fill: true,
            data:l,
            backgroundColor: [
                'rgba(255, 104, 171, 0.5)',
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
                beginAtZero: false,
                grid:{
                    color:'white'
                },
                ticks:{
                    display: false,
                    stepsize: 10,
                    autoSkip: true,
                    maxTicksLimit: 10,
                    color:'black',
                    fontcolor:'black'
                }
            },
            y: {
                suggestedMin: -100,
                suggestedMax: 100,
                beginAtZero: true,
                grid:{
                    color:'white'
                },
                ticks:{
                    stepsize: 50,
                    display: false,

                    color:'black',
                    fontcolor:'black'
                }
            }
        }
    },
});

function drawPL(botton_id){ 
    console.log(p);
    console.log(l);
    p.length= 0;
    l.length= 0;

    if (botton_id.id === "button_call_open_price_" + botton_id.name.toString()) {//將t字帳按的按鈕的所有資料暫存進陣列
        p.push(50);
        p.push(50);
        p.push(0);
        p.push(-50);
        p.push(-50);
        l.push(null);
        l.push(null);
        l.push(null);
        l.push(null);
        l.push(null);
        plchart.update();
        myChartline.update()

    } else if (botton_id.id === "button_call_close_price_" + botton_id.name.toString()) {
        p.push(50);
        p.push(50);
        p.push(0);
        p.push(-50);
        p.push(null);
        l.push(null);
        l.push(null);
        l.push(null);
        l.push(-50);
        l.push(-50);
        plchart.update();
        myChartline.update()

    } else if (botton_id.id === "button_put_open_price_" + botton_id.name.toString()) {
        p.push(50);
        p.push(50);
        p.push(null);
        p.push(null);
        p.push(null);
        l.push(null);
        l.push(50);
        l.push(0);
        l.push(-50);
        l.push(-50);
        plchart.update();
        myChartline.update()

    } else if (botton_id.id === "button_put_close_price_" + botton_id.name.toString()) {//item = data_put["code"][bt_id.name],
        p.push(null);
        p.push(null);
        p.push(null);
        p.push(null);
        p.push(null);
        l.push(50);
        l.push(50);
        l.push(0);
        l.push(-50);
        l.push(-50);
        plchart.update();
        myChartline.update()
    }
    console.log(p);
    console.log(l);
}