/**
 * Get all the data from the login view, pack them into json style data and send
 * ajax query to the server.
 */
function loginSubmit(){
    var formArray = $('#loginForm').serializeArray();
    var data = {};
    for (index in formArray){
        data[formArray[index].name] = formArray[index].value;
    }
    console.log(data);
    sendAjaxQuery('/', data);
    event.preventDefault(); // or return
}

/**
 * Send the ajax query to server and catch the response after server processing the data.
 * @param url : The route where the request goes for processing.
 * @param data : The data of user input of username and password to send.
 */
function sendAjaxQuery(url, data){
    $.ajax({
        url: url,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: (dataR)=>{
            console.log(dataR);
            //If there is any issue, there will be a message part in the json response
            if (dataR.message)
                document.getElementById('result').innerHTML = JSON.stringify(dataR.message);
            else if (dataR.toURL){
                //No issue arose, redirect to the url server want.
                console.log('toURL...');
                window.location.href= dataR.toURL;
            }
        },
        error: (xhr, status, error)=>{
            document.getElementById('result').innerHTML = 'Error: ' + error.message;
        }
    })
}
