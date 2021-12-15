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

            call_strike.length = 0;//清除舊資料
            call_open.length = 0;//清除舊資料
            call_close.length = 0;//清除舊資料

            for(i=0;i<len_json;i++){//從一個禮拜當中選出我們要的時間點

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
            //console.log(call_strike);
            //console.log(call_open);
            //console.log(call_close);
            var button_len = call_strike.length;
            var tdata_len = document.getElementById('t_data');
            if (tdata_len !== button_len) {//讓按鈕可以印到所有選到的資料呈現出來為止
                
                for (var i = 0; i < tdata_len; i++) { //把之前的資料清掉							
                    document.getElementById("t_data").deleteRow(0);
                };
                //建立表格
                for (var i = 0; i < button_len; i++) {
                    var newRow = t_data.insertRow(i),
                        cell0 = newRow.insertCell(0),
                        cell1 = newRow.insertCell(1),
                        cell2 = newRow.insertCell(2),
                        cell3 = newRow.insertCell(3),
                        cell4 = newRow.insertCell(4);

                    
                    cell0.innerHTML = cell0.innerHTML + "<button id='button_call_open_price_" + i.toString() + "'>" + 'Ask' + "</button>";//印出按鈕
                    cell1.innerHTML = cell1.innerHTML + "<button id='button_call_close_price_" + i.toString() + "'>" + 'Bid' + "</button>";
                    cell2.innerHTML = cell2.innerHTML + "<font id='strike_"+ i.toString() +"_data'>" + 'strike' + "</font>";
                    cell3.innerHTML = cell3.innerHTML + "<button id='button_put_open_price_" + i.toString() + "'>" + 'Bid' + "</button>";
                    cell4.innerHTML = cell4.innerHTML + "<button id='button_put_close_price_" + i.toString() + "'>" + 'Ask' + "</button>";
                };
            } else {//當新選的資料要印出的按鈕數跟舊資料一樣長時,直接換數值就好
                for (var i = 0; i < button_len; i++) {
                    document.getElementById('bt_call_open_price_' + i.toString()).innerHTML = call_open[i];
                    document.getElementById('bt_call_close_price_' + i.toString()).innerHTML = call_close[i];
                    document.getElementById('strike_' + i.toString()+'_data').innerHTML = call_strike[i];
                }
            }    
        };
    }
          
    

}