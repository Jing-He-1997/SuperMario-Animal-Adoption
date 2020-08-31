/**
 * Get the applicant's data and the id of the animal to be adopted and send
 * ajax query to the server
 * @param id : the animal to be adopted
 */
function apply(id){
    //Store all the data into json format data.
    var formArray = $('#applyAnimal').serializeArray();
    var data = {};
    for(index in formArray){
        data[formArray[index].name] = formArray[index].value;
    }
    console.log(data);
    console.log(id);
    sendAjaxQuery('/animal/' + id + '/apply', data);
    event.preventDefault();
}

/**
 * Send the ajax query to server and catch the response after server processing the data.
 * @param url : The route where the request goes for processing.
 * @param data : The data about the applicant to send.
 */
function sendAjaxQuery(url, data){
    $.ajax({
        url: url,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: dataR=>{
            console.log(dataR);
            //If there is any issue, there will be a message part in the json response
            if (dataR.message){
                document.getElementById('results').innerHTML = JSON.stringify(dataR.message);
            } else if (dataR.toURL){
                //No issue arose, redirect to the url server want.
                console.log('toURL...');
                window.location.href= dataR.toURL;
            }
        },
        error: (xhr, status, error)=>{
            document.getElementById('results').innerHTML = 'Error: ' + error;
        }
    })
}