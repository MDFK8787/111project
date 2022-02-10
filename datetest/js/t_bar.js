change = 0;
call_strike = [];//所選資料暫存陣
call_open = [];
call_close = [];
put_strike = [];
put_open = [];
put_close = [];

function strikedata(){
    var time1 = document.getElementById('time');
    time1 = time1.value+":00";

    var request = new XMLHttpRequest();
    request.open("get", "https://mdfk8787.github.io/111project/datetest/tbardata/202107W4.json");
    request.send(null);
    request.onload = function () {
        if (request.status == 200) {
            var json = JSON.parse(request.responseText);
            var date = document.getElementById('date');
            var len_json = Object.keys(json).length; //宣告json長度

            call_strike.length = 0;//清除舊資料
            call_open.length = 0;//清除舊資料
            call_close.length = 0;//清除舊資料

            for(i=0;i<len_json;i++){//從一個禮拜當中選出我們要的時間點

                var a = json[i];
                change = a;
                var b = a['date'];//指定的日期
                var c = a['time'];//指定的時間
                var type = a['type'];//put or call
                
                if (b==date.value){//抓json中日期一樣的資料
                    if (c==time1){//抓json中時間一樣的資料
                        if(type=='C'){//抓json中call的資料
                            call_strike.push(change['strike']);
                            call_open.push(change['open']);
                            call_close.push(change['close']);
                        };
                    };
                };
            };

            //console.log(call_strike);

            var button_len = call_strike.length;
            var tdata_len = document.getElementById('t_data').rows.length;//HTML上的按鈕行數長度
            var tdata = document.getElementById('t_data');
            if (tdata_len !== button_len) {//讓按鈕可以印到所有選到的資料呈現出來為止
                
                for (var i = 0; i < tdata_len; i++) { //把之前的資料清掉							
                    document.getElementById("t_data").deleteRow(0);
                };

                for (var i = 0; i < button_len; i++) {//t字帳表格建立
                    var newRow = tdata.insertRow(i),
                        cell0 = newRow.insertCell(0),
                        cell1 = newRow.insertCell(1),
                        cell2 = newRow.insertCell(2),
                        cell3 = newRow.insertCell(3),
                        cell4 = newRow.insertCell(4);

                    cell0.innerHTML = cell0.innerHTML + "<button id='button_call_open_price_" + i.toString() + "' name='"+ i.toString() +"' class='tbar_style' onclick='show_detail(button_call_open_price_" + i.toString() + ");drawPL(button_call_open_price_" + i.toString() + ");'>" + '--' + "</button>";//印出按鈕
                    cell1.innerHTML = cell1.innerHTML + "<button id='button_call_close_price_" + i.toString() + "' name='"+ i.toString() +"' class='tbar_style' onclick='show_detail(button_call_close_price_" + i.toString() + ");drawPL(button_call_close_price_" + i.toString() + ");'>" + '--' + "</button>";
                    cell2.innerHTML = cell2.innerHTML + "<font id='strike_data_"+ i.toString() +"' class='tbar_strike'>" + 'strike' + "</font>";
                    cell3.innerHTML = cell3.innerHTML + "<button id='button_put_open_price_" + i.toString() + "' name='"+ i.toString() +"' class='tbar_style' onclick='show_detail(button_put_open_price_" + i.toString() + ");drawPL(button_put_open_price_" + i.toString() + ");'>" + '--' + "</button>";
                    cell4.innerHTML = cell4.innerHTML + "<button id='button_put_close_price_" + i.toString() + "' name='"+ i.toString() +"' class='tbar_style' onclick='show_detail(button_put_close_price_" + i.toString() + ");drawPL(button_put_close_price_" + i.toString() + ");'>" + '--' + "</button>";
                };

                for (var i = 0; i < button_len; i++) {//call按鈕資料
                    document.getElementById('button_call_open_price_' + i.toString()).innerHTML = call_open[i];
                    document.getElementById('button_call_close_price_' + i.toString()).innerHTML = call_close[i];
                    document.getElementById('strike_data_' + i.toString()).innerHTML = call_strike[i];
                }

            } else {//當新選的資料要印出的按鈕數跟舊資料一樣長時,直接換數值就好
                for (var i = 0; i < button_len; i++) {
                    document.getElementById('button_call_open_price_' + i.toString()).innerHTML = call_open[i];
                    document.getElementById('button_call_close_price_' + i.toString()).innerHTML = call_close[i];
                    document.getElementById('strike_data_' + i.toString()).innerHTML = call_strike[i];
                }
            }    
        };
    }
    //console.log(call_strike);
    put_t_data()
              
}
console.log(call_strike);
function put_t_data(){

    var time1 = document.getElementById('time');
    time1 = time1.value+":00";

    var request = new XMLHttpRequest();
    request.open("get", "https://mdfk8787.github.io/111project/datetest/tbardata/put.json");
    request.send(null);
    request.onload = function () {
        if (request.status == 200) {
            var json = JSON.parse(request.responseText);
            var date = document.getElementById('date');
            var len_json = Object.keys(json).length;

            put_strike.length = 0;//清除舊資料
            put_open.length = 0;//清除舊資料
            put_close.length = 0;//清除舊資料

            for(i=0;i<len_json;i++){//從一個禮拜當中選出我們要的時間點

                var d = json[i];
                var e = d['date'];
                var f = d['time'];

                if (e==date.value){//抓出選擇日期的資料
                    if (f==time1){
                        put_strike.push(d['strike']);
                        put_open.push(d['open']);
                        put_close.push(d['close']);
                    };
                };
            };
            //console.log(put_strike);
            //console.log(call_strike);
            //console.log(put_open);
            //console.log(put_close);

            var tdata_len = document.getElementById('t_data').rows.length;//HTML上的按鈕行數長度
            var button_len = call_strike.length;
            var real_len = put_strike.length;
            //console.log(call_strike.length);
            //console.log(real_len);
            //console.log(button_len);

            for(i=0;i<button_len;i++){//put按鈕資料
                for(j=0;j<real_len;j++){
                    if (call_strike[i]==put_strike[j]){
                        document.getElementById('button_put_open_price_' + i.toString()).innerHTML = put_open[j];
                        document.getElementById('button_put_close_price_' + i.toString()).innerHTML = put_close[j];
                    }
                }

            }
            
        }
    }
}