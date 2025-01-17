var array = new Array();
var row = document.getElementById("row_data").rows.length;;//印出來的所按的按鈕資料行數
function show_detail(botton_id){
    
    if (botton_id.id === "button_call_open_price_" + botton_id.name.toString()) {//將t字帳按的按鈕的所有資料暫存進陣列
        var rowdata = row + 1,
            buysell = "short",
            CP = "Call",
            strike = document.getElementById('strike_data_' + botton_id.name.toString()).textContent,
            quote = botton_id.textContent,
            button_id = botton_id.id;


    } else if (botton_id.id === "button_call_close_price_" + botton_id.name.toString()) {
        var rowdata = row + 1,
            buysell = "long",
            CP = "Call",
            strike = document.getElementById("strike_data_" + botton_id.name.toString()).textContent,
            quote = botton_id.textContent,
            button_id = botton_id.id;

    } else if (botton_id.id === "button_put_open_price_" + botton_id.name.toString()) {
        var rowdata = row + 1,
            buysell = "long",
            CP = "Put",
            strike = document.getElementById("strike_data_" + botton_id.name.toString()).textContent,
            quote = botton_id.textContent,
            button_id = botton_id.id;

    } else if (botton_id.id === "button_put_close_price_" + botton_id.name.toString()) {//item = data_put["code"][bt_id.name],
        var rowdata = row + 1,
            buysell = "short",
            CP = "Put",
            strike = document.getElementById("strike_data_" + botton_id.name.toString()).textContent,
            quote = botton_id.textContent,
            button_id = botton_id.id;
    }
    
    array[row] = new Array;//雙重陣列
    array[row][0] = rowdata;
    array[row][1] = buysell;
    array[row][2] = CP;
    array[row][3] = strike;
    array[row][4] = quote;
    array[row][5] = button_id;

    Newrow(array,row)
    return row++;
}

function Newrow(array, row) {

    var tbody = document.getElementById("row_data"); 							
    var newRow = tbody.insertRow(tbody.length);				
    cell0 = newRow.insertCell(0);
    cell1 = newRow.insertCell(1);
    cell2 = newRow.insertCell(2);
    cell3 = newRow.insertCell(3);
    cell4 = newRow.insertCell(4);
    cell5 = newRow.insertCell(5);
    cell6 = newRow.insertCell(6);
    newRow.setAttribute('class', 'active_row');

    cell0.innerHTML = array[row][0];
    cell1.innerHTML = array[row][1];
    cell2.innerHTML = array[row][2];
    cell3.innerHTML = array[row][3];
    cell4.innerHTML = array[row][4];
    cell5.innerHTML = cell5.innerHTML + "<input id=amount_" + row.toString() + " placeholder='1'>";
    cell6.innerHTML = cell6.innerHTML + "<button id=delete_row_" + row.toString() + " name=" + row.toString() + " onclick='removerow(this)' >X</button>";							
}

function removerow(selected) {
    var tbody = document.getElementById("row_data");
    array.splice(selected.name, 1) //將第x個位置刪掉
    document.getElementById('row_data').deleteRow(selected.name); //刪除row
    row = document.getElementById("row_data").rows.length; //重讀row長度
    for (var i = 0; i < tbody.rows.length; i++) { //重製刪除按鈕
        var reset_del = document.getElementById('row_data').rows[i].cells[6].firstChild;
        reset_del.setAttribute('id', 'del_' + i.toString());
        reset_del.setAttribute('name', i.toString());
        var reset_amount = document.getElementById('row_data').rows[i].cells[5].firstChild;
        reset_amount.setAttribute('id', 'amount_' + i.toString());       
    }
    for(var i=0;i<row;i++){
        array[i][0]=i+1;
        var reset_item = document.getElementById('row_data').rows[i].cells[0];
        reset_item.innerHTML = i+1;
    }		
}

function Clearallrow(array) {
    var table = document.getElementById("row_data");
    var row_len = document.getElementById("row_data").rows.length;
    for (var i = 0; i < row_len; i++) { //清除contracts_array資料
        array.pop();
    }
    for (var i = 0; i < row_len; i++) { //清除所有欄位							
        document.getElementById("row_data").deleteRow(0);
    }
    row = document.getElementById("row_data").rows.length; //讓row回歸0													
}