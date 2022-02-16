var data = [];
var scaleFactor = 10
      mean = 12,//from   w ww. de m o  2  s .  co  m
      sigma = 4;
for(ii=0;ii<25;ii+=1) {
   var y = gaussian(ii)
   data.push({ii:ii,y:y*scaleFactor});
}
//taken from Jason Davies science library
// https://github.com/jasondavies/science.js/
function gaussian(ii) {
   var gaussianConstant = 1 / Math.sqrt(2 * Math.PI);
   ii = (ii - mean) / sigma;
   return gaussianConstant * Math.exp(-.5 * ii * ii) / sigma;
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
    elements: {
        point:{
            radius: 0
        }
    }
}
});