function strikedata(){
    var time1 = document.getElementById('timeselect').value;
    console.log(time1)

    call_strike = [];
    call_open = [];
    call_close = [];

    var request = new XMLHttpRequest();
    request.open("get", "https://mdfk8787.github.io/111project/tbartest/call.json");
    request.send(null);
    request.onload = function () {
        if (request.status == 200) {
            var json = JSON.parse(request.responseText);
            console.log(json)
            var date = document.getElementById('date');
            console.log(date.value);
            var len_json = Object.keys(json).length; //宣告json長度

            for(i=0;i<len_json;i++){

                var a = json[i];
                //console.log(a)
                var b = a['date'];
                var c = a['time'];
                //console.log(b)還是有夜盤幹
                if (b==date.value){
                    if (c==time1){
                        call_strike.push(a['strike']);
                        call_open.push(a['open']);
                        call_close.push(a['close']);
                    };
                };
            };
            console.log(call_strike);
            console.log(call_open);
            console.log(call_close);
        };
    }
          
    

}