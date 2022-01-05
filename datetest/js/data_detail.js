function show_detail(botton_id){
    console.log(botton_id.name);
    if (botton_id.id === "button_call_open_price_" + botton_id.name.toString()) {
        var item = k + 1,
            buysell = "short",
            CP = "call",
            strike = document.getElementById("strike_" + botton_id.name.toString()).textContent,
            quote = botton_id.textContent,
            button_id = botton_id.id;


    } else if (botton_id.id === "button_call_close_price_" + botton_id.name.toString()) {
        var item = k + 1,
            buysell = "long",
            CP = "call",
            strike = document.getElementById("strike_" + botton_id.name.toString()).textContent,
            quote = botton_id.textContent,
            button_id = bt_id.id;

    } else if (botton_id.id === "button_put_open_price_" + botton_id.name.toString()) {
        var item = k + 1,
            buysell = "long",
            CP = "put",
            strike = document.getElementById("strike_" + botton_id.name.toString()).textContent,
            quote = botton_id.textContent,
            button_id = bt_id.id;

    } else if (botton_id.id === "button_put_close_price_" + botton_id.name.toString()) {//item = data_put["code"][bt_id.name],
        var item = k + 1,
            buysell = "short",
            CP = "put",
            strike = document.getElementById("strike_" + botton_id.name.toString()).textContent,
            quote = botton_id.textContent,
            button_id = bt_id.id;
    }
    console.log(item);
    console.log(buysell);
    console.log(CP);
    console.log(strike);
    console.log(quote);
}