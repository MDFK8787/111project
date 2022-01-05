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
    console.log(rowdata);
    console.log(buysell);
    console.log(CP);
    console.log(strike);
    console.log(quote);

    array[row] = new Array;
    array[row][0] = rowdata;
    array[row][1] = buysell;
    array[row][2] = CP;
    array[row][3] = strike;
    array[row][4] = quote;
    array[row][5] = button_id;

    Newrow(array,row)
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
    newRow.setAttribute('class', 'active-row');

    cell0.innerHTML = array[row][0];
    cell1.innerHTML = array[row][1];
    cell2.innerHTML = array[row][2];
    cell3.innerHTML = array[row][3];
    cell4.innerHTML = array[row][4];
    cell5.innerHTML = cell5.innerHTML + "<input id=amount_" + k.toString() + " maxlength='4' size='5' placeholder='1' onchange='func_calculate(contracts_array)'>";
    cell6.innerHTML = cell6.innerHTML + "<button id=del_" + k.toString() + " name=" + k.toString() + " class='button button3' onclick='removeSelectedRow(this)' >X</button>";							
}