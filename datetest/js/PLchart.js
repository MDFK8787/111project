var ctx3 = document.getElementById('plchart').getContext('2d');//profit&lost testing
var plchart = new Chart(ctx3, {
    type: 'line',
    data: {
        labels:[1000,2000,3000,4000,5000],
        datasets: [{
            label: 'profit',
            lineTension: 0,
            fill: true,
            data:[50,50,null,null,null],
            backgroundColor: [
                'rgba(146, 255, 140, 0.5)',
            ],
            borderColor: [
                'rgba(11, 215, 0, 1)',
            ],

            tension:0.4
        },{
            label: 'lost',
            lineTension: 0,
            fill: true,
            data:[null,50,0,-50,-50],
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