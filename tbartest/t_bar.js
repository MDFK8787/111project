function strikedata(){
    var date = document.getElementById('timeselect').value;
    console.log(date)

    var url_call = 'call.json';
    var row_len = document.getElementById("t_data").rows.length; //左邊表格長度
    method: 'POST',
        fetch(url_call)
            .then(function (resp) {
                return resp.json();
            })
            .then(function (data) {

                var data_call = data; //完整的data_call.json
                var row_len = document.getElementById("t_data").rows.length; //左邊表格長度
                var data_len = Object.keys(data_call.code).length; //data_call中的code長度
                var t_table = document.getElementById("t_data"); //左邊表格id
                console.log(data_call)
            })
          
    

}