/**
 * Get all the data from the registration view, pack them into json style data
 * and send ajax query to the server.
 */
function submitNewUser(){
    var formArray = $('#registerForm').serializeArray();
    var data ={};
    for(index in formArray){
        data[formArray[index].name] = formArray[index].value;
    }
    console.log(data);
    sendAjaxQuery('/register', data);
    event.preventDefault();
}

/**
 * Send the ajax query to server and catch the response after server processing the data.
 * @param url : The route where the request goes for processing.
 * @param data : The data about the registration details to send.
 */
function sendAjaxQuery(url, data){
    $.ajax({
        url: url,
        data: data,
        dataType: 'json',
        // contentType: 'application/json',
        type: 'POST',
        success: (dataR)=>{
            console.log(dataR.message);
            //If there is any issue, there will be a message part in the json response.
            //No issue arose, tell the user the registration is successful.
            if (dataR.message)
                document.getElementById('result').innerHTML = JSON.stringify(dataR.message);
            else
                document.getElementById('result').innerHTML =
                    'User ' + JSON.stringify(dataR.username) + ' successfully created! You can now login.';
        },
        error: (xhr, status, error)=>{
            document.getElementById('result').innerHTML = 'Error: ' + error.message;
        }
    })
}