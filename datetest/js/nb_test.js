var data = [];
var scaleFactor = 100
      mean = 417,//from   w ww. de m o  2  s .  co  m
      sigma = 40;
for(x=0;x<825;x+=1) {
   var y = gaussian(x)
   data.push({x:x,y:y*scaleFactor});
}
//taken from Jason Davies science library
// https://github.com/jasondavies/science.js/
function gaussian(x) {
   var gaussianConstant = 1 / Math.sqrt(2 * Math.PI);
   x = (x - mean) / sigma;
   return gaussianConstant * Math.exp(-.5 * x * x) / sigma;
};
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart("myChart", {
   type: 'scatter',
   data: {
      datasets: [{
         label:"Gaussian",
         data:data,
         showLine:true//顯示出線
      }]
   },
   options: {
    bezierCurve : true,
    elements: {
        point:{
            radius: 0
        }
    }
}
});