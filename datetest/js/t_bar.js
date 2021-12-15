function strikedata(){
    var date = document.getElementById('timeselect').value;
    console.log(date)

    var request = new XMLHttpRequest();
    request.open("get", "https://mdfk8787.github.io/111project/tbartest/call.json");
    request.send(null);
    request.onload = function () {
        if (request.status == 200) {
            var json = JSON.parse(request.responseText);
            console.log(json)
        }
    }
          
    

}