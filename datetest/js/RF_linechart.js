
var real_x = [];
var real_y = [];
var linex1 = [];//線型pmf的y軸
var data = [];//常態分配資料
var data2 = [];
var p = [];//profit
var l = [];//lost
var scaleFactor = 100
      mean = 417,//from   w ww. de m o  2  s .  co  m
      sigma = 80;

/*var plugin = {//資料點上的線
  afterDatasetsDraw: function(chart) {
    if(chart.tooltip._active && chart.tooltip._active.length) {
      var activePoint = chart.tooltip._active[0];
      var ctx = chart.ctx;
      var y_axis = chart.scales['y-axis-0'];
      //console.log(chart.chartArea.bottom)//找線的上下點
      console.log(Chart.Tooltip.xAlign)
      ctx.save();
      ctx.beginPath();
      ctx.setLineDash([5,7]);//虛線
      ctx.moveTo(activePoint.element.x, 32);//讓程式知道要在網頁的哪個座標x顯示線,32是線的最高點
      ctx.lineTo(activePoint.element.x, 450.07051577800826);//線的最低點
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'green';
      ctx.stroke();
      ctx.restore();
    }
  },
  legend: {
    display: false
  },
  tooltip: {
    enabled: false,
    intersect: false,
    mode: "index",
    position: "average",
    custom: customTooltips
  }
};*/

function customTooltips(tooltipModel) {
    // Tooltip Element
    var tooltipEl = document.getElementById("chartjs-tooltip");
    console.log(tooltipEl)
    const yAlign = tooltipModel.yAlign;
    const xAlign = tooltipModel.xAlign;
  
    // Create element on first render
    if (!tooltipEl) {
      tooltipEl = document.createElement("div");
      tooltipEl.id = "chartjs-tooltip";
      tooltipEl.innerHTML = "<table></table>";
      document.body.appendChild(tooltipEl);
    }
  
    // Hide if no tooltip
    if (tooltipModel.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }
  
    // Set caret Position
    tooltipEl.classList.remove("top", "bottom", "center", "left", "right");
    // if (tooltipModel.yAlign || tooltipModel.xAlign) {
    tooltipEl.classList.add(tooltipModel.yAlign);
    tooltipEl.classList.add(tooltipModel.xAlign);
    // }
  
    // Set Text
    if (tooltipModel.body) {
      var titleLines = tooltipModel.title || [];
      var bodyLines = tooltipModel.body.map((bodyItem) => {
        return bodyItem.lines;
      });
  
      var innerHtml = "<thead>";
  
      titleLines.forEach(function (title) {
        innerHtml += '<tr><th><div class="mb-1">' + title + "</div></th></tr>";
      });
      innerHtml += "</thead><tbody>";
  
      bodyLines.forEach((body, i) => {
        var colors = tooltipModel.labelColors[i];
        // var style = 'background-color:' + colors.borderColor
        var style =
          "background-color:" + this._chart.data.datasets[i].borderColor;
        var value = tooltipModel.dataPoints[i].value;
        var label = this._chart.data.datasets[i].label;
  
        style += "; border-color:" + colors.borderColor;
        style += "; border-color:" + this._chart.data.datasets[i].borderColor;
        style += "; border-width: 2px";
  
        var span =
          '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
  
        innerHtml += `<tr><td> ${span} $${value}K </td></tr>`;
      });
      innerHtml += "</tbody>";
  
      var tableRoot = tooltipEl.querySelector("table");
      tableRoot.innerHTML = innerHtml;
    }
  
    // Tooltip height and width
    const { height, width } = tooltipEl.getBoundingClientRect();
  
    // Chart canvas positions
    const positionY = this._chart.canvas.offsetTop;
    const positionX = this._chart.canvas.offsetLeft;
  
    // Carets
    const caretY = tooltipModel.caretY;
    const caretX = tooltipModel.caretX;
  
    // Final coordinates
    let top = positionY + window.pageYOffset + caretY - height;
    let left = positionX + window.pageXOffset + caretX - width / 2;
    let space = 8; // The caret plus one pixle for some space, you can increase it.
  
    // yAlign could be: `top`, `bottom`, `center`
    if (yAlign === "top") {
      top += height + space;
    } else if (yAlign === "center") {
      top += height / 2;
    } else if (yAlign === "bottom") {
      top -= space;
    }
  
    // xAlign could be: `left`, `center`, `right`
    if (xAlign === "left") {
      left += width / 2 - tooltipModel.xPadding - space / 2;
      if (yAlign === "center") {
        left += space * 2;
      }
    } else if (xAlign === "right") {
      left -= width / 2;
      if (yAlign === "center") {
        left -= space;
      } else {
        left += space;
      }
    }
  
    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
  
    // Left and right
    tooltipEl.style.top = `${top}px`;
    tooltipEl.style.left = `${left}px`;
  
    // Font
    tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
    tooltipEl.style.fontSize = tooltipModel.bodyFontSize + "px";
    tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
  
    // Paddings
    tooltipEl.style.padding = tooltipModel.yPadding + "px " + tooltipModel.xPadding + "px";
}

var ctx2 = document.getElementById('myChartline').getContext('2d');//RF線型
var myChartline = new Chart(ctx2, {
  type: 'line',
  data: {
    labels: real_x,
    datasets: [{
      label: 'linepmf1',
      fill: true,
      data: linex1,
      backgroundColor:'rgba(0, 0, 0, 0)',
      borderColor:'rgba(0, 0, 0, 0)',
      tension:1
    },{
      label:PDF1,
      fill: true,
      data:data,
      pointHitRadius: 0,
      showLine:true,//顯示出線
      backgroundColor:'rgba(106, 175, 202, 0.66)',
      borderColor:'rgba(106, 175, 202, 0.66)',
      type: 'scatter',
      yAxisID:'y'
    },{
      label:PDF2,
      fill: true,
      data:data2,
      pointHitRadius: 0,
      showLine:true,//顯示出線
      backgroundColor:'rgba(30, 120, 150, 0.66)',
      borderColor:'rgba(30, 120, 150, 0.66)',
      type: 'scatter',
      yAxisID:'y'
    },{
      label: 'profit',
      lineTension: 0,
      fill: true,
      data:p,
      backgroundColor: 'rgba(172, 219, 147, 0.8)',
      borderColor: 'rgba(172, 219, 147, 0.8)',
      tension:0.4,
      yAxisID:'pl_y'
    },{
      label: 'lost',
      lineTension: 0,
      fill: true,
      data:l,
      backgroundColor:'rgba(233, 130, 127, 0.8)',
      borderColor:'rgba(233, 130, 127, 0.8)',
      tension:0.4,
      yAxisID:'pl_y'
    }]
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
        position:'left',
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
      },
      pl_y: {
        suggestedMin: -100,
        suggestedMax: 100,
        position:'right',
        beginAtZero: false,
        grid:{
          display:false
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
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins:{
      afterDatasetsDraw: function(chart) {
        if(chart.tooltip._active && chart.tooltip._active.length) {
          var activePoint = chart.tooltip._active[0];
          var ctx = chart.ctx;
          var y_axis = chart.scales['y-axis-0'];
          //console.log(chart.chartArea.bottom)//找線的上下點
          console.log(Chart.Tooltip.xAlign)
          ctx.save();
          ctx.beginPath();
          ctx.setLineDash([5,7]);//虛線
          ctx.moveTo(activePoint.element.x, 32);//讓程式知道要在網頁的哪個座標x顯示線,32是線的最高點
          ctx.lineTo(activePoint.element.x, 450.07051577800826);//線的最低點
          ctx.lineWidth = 2;
          ctx.strokeStyle = 'green';
          ctx.stroke();
          ctx.restore();
        }
      },
      legend: {
        display: false
      },
      tooltip: {
        enabled:true,
        intersect: false,
        mode: "index",
        position: "average",
        custom: customTooltips
      }
    }//線的插入點
  }
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
    date = date.split('-');
    var a1 = date[0];
    var a2 = date[1];
    var a3 = date[2];
    var gg =a2[a2.length-2]
    if (gg==0){a2 = a2.replace(0,'')}
    date = a1 + '/' + a2 + '/' + a3
    time = time.value;
    var select = date+' '+time;//之後用來尋找csv[ 列 ]的名字的變數
    console.log(select);
      
    //var url = "https://mdfk8787.github.io/111project/datetest/json/20210930-20211006.json";
    var request = new XMLHttpRequest();
    request.open("get", "https://mdfk8787.github.io/111project/datetest/json/rf/2021/202107.json");
    request.send(null);
    request.onload = function () {
        if (request.status == 200) {
            var json = JSON.parse(request.responseText);

            real_y.length = 0;//讓上一個被輸入的圖表y資料被清除
            real_x.length = 0;//讓上一個被輸入的圖表x資料被清除

            var len_json = Object.keys(json).length; //宣告json長度
            for (i=0;i<len_json;i++){
                console.log(json[i]);

                var strike = json[i];//將每一個index的陣列分別抓出來讓select可以選日期時間的columns
                console.log(strike);
                var strike2 = strike[select];//用日期時間的select選擇陣列
                console.log(strike2);                     
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
                if (isNaN(xxx)){
                    linex1.push(0);
                }else{
                    linex1.push(xxx);
                }
                
            };
            real_x.sort(function (a, b) {
                return a - b
            });

            data.length = 0;
            data2.length = 0;
            for(x=0;x<linex1.length;x+=1){
              var y = gaussian(x)
              if(x<=((linex1.length/2)+100) && x>=((linex1.length/2)-100)){
                data.push({x:null,y:null})
                data2.push({x:real_x[x],y:y*scaleFactor})
              }else{
                data.push({x:real_x[x],y:y*scaleFactor});
                data2.push({x:null,y:null})
              }
            }

            myChartline.data.datasets[0].data = linex1;//真的機率
            myChartline.data.datasets[1].data = data;//常態
            myChartline.data.datasets[2].data = data2;//常態
            myChartline.update()//讓圖表更新
        };
    };

}

function drawPL(botton_id){ 
  console.log(p);
  console.log(l);
  p.length= 0;
  l.length= 0;
  var slash = 50;
  if (botton_id.id === "button_call_open_price_" + botton_id.name.toString()) {//將t字帳按的按鈕的所有資料暫存進陣列
    for(i=0;i<linex1.length;i++){
      if(i<((linex1.length/2)-100)){
        p.push(50)
        l.push(null)
      }else if(i<((linex1.length/2)+100) && i>((linex1.length/2)-100)){
        slash = slash-0.5
        p.push(slash)
        l.push(null)
      }else if(i>((linex1.length/2)+100)){
        p.push(null)
        l.push(-50)
      }
    }
    myChartline.data.datasets[2].data = p;
    myChartline.data.datasets[3].data = l;
    myChartline.update()

  } else if (botton_id.id === "button_call_close_price_" + botton_id.name.toString()) {
    for(i=0;i<linex1.length;i++){
      if(i<((linex1.length/2)-100)){
        p.push(50)
        l.push(null)
      }else if(i<(linex1.length/2) && i>((linex1.length/2)-100)){
        slash = slash-0.5
        p.push(slash)
        l.push(null)
      }else if(i<((linex1.length/2)+100) && i>(linex1.length/2)){
        slash = slash-0.5
        p.push(null)
        l.push(slash)
      }else if(i>((linex1.length/2)+100)){
        p.push(null)
        l.push(-50)
      }
    }
    myChartline.data.datasets[2].data = p;
    myChartline.data.datasets[3].data = l;
    myChartline.update()

  } else if (botton_id.id === "button_put_open_price_" + botton_id.name.toString()) {
    for(i=0;i<linex1.length;i++){
      if(i<((linex1.length/2)-100)){
        p.push(50)
        l.push(null)
      }else if(i<((linex1.length/2)+100) && i>((linex1.length/2)-100)){
        slash = slash-0.5
        p.push(null)
        l.push(slash)
      }else if(i>((linex1.length/2)+100)){
        p.push(null)
        l.push(-50)
      }
    }
    myChartline.data.datasets[2].data = p;
    myChartline.data.datasets[3].data = l;
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
    myChartline.data.datasets[2].data = p;
    myChartline.data.datasets[3].data = l;
    myChartline.update()
  }
}