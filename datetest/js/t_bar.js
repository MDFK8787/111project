function strikedata(){
    var time = document.getElementById('timeselect').value;
    console.log(time)

    var request = new XMLHttpRequest();
    request.open("get", "https://mdfk8787.github.io/111project/tbartest/call.json");
    request.send(null);
    request.onload = function () {
        if (request.status == 200) {
            var json = JSON.parse(request.responseText);
            console.log(json)
            var date = document.getElementById('date');
            console.log(date);
            var len_json = Object.keys(json).length; //宣告json長度
        }
    }
          
    

}