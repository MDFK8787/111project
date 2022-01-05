/*var posX = 0, posY = 0;
var a =  window.event;
if (a.pageX || a.pageY) {
    posX = a.pageX;
    posY = aevent.pageY;
} else if (a.clientX || a.clientY) {
    posX = a.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
    posY = a.clientY + document.documentElement.scrollTop + document.body.scrollTop;
}*/
window.addEventListener('mousemove',e=>{
    xposition = e.clientX;
    yposition = e.clientY;
    xx = document.getElementById('positionx');
    yy = document.getElementById('positiony');
    xx.textContent = 'x:'+ xposition;
    yy.textContent = 'y:'+ yposition;
})