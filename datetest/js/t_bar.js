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

            call_strike.length = 0;
            call_open.length = 0;
            call_close.length = 0;

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
            var button_len = call_strike.length;
            var tdata_len = document.getElementById('t_data');
            if (tdata_len !== button_len) {
                //先清除資料
                for (var i = 0; i < tdata_len; i++) { //清除所有欄位							
                    document.getElementById("t_data").deleteRow(0);
                }
                //建立表格
                for (var i = 0; i < button_len; i++) {
                    var newRow = t_data.insertRow(i),
                        cell0 = newRow.insertCell(0),
                        cell1 = newRow.insertCell(1),
                        cell2 = newRow.insertCell(2),
                        cell3 = newRow.insertCell(3),
                        cell4 = newRow.insertCell(4);

                    
                    cell0.innerHTML = cell0.innerHTML + "<button id='button_call_open_price_" + i.toString() + ">" + '-' + "</button>";
                    cell1.innerHTML = cell1.innerHTML + "<button id='button_call_close_price_" + i.toString() + ">" + '-' + "</button>";
                    cell2.innerHTML = cell2.innerHTML + "<font id='strike_"+ i.toString() +"_data'>" + 'strike' + "</font>";
                    cell3.innerHTML = cell3.innerHTML + "<button id='button_put_open_price_" + i.toString() + ">" + '-' + "</button>";
                    cell4.innerHTML = cell4.innerHTML + "<button id='button_put_close_price_" + i.toString() + ">" + '-' + "</button>";
                };
            }    
        };
    }
          
    

}