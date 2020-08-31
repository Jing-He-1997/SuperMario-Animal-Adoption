/**
 * Get all the input data (including image) from client and send ajax request to the add new animal route.
 * @returns {boolean}
 */
function addAnimal(){
    event.preventDefault();
    event.stopImmediatePropagation();
    var myForm = document.getElementById('addAnimalForm');
    //use formdata because there is image file for upload
    var formData = new FormData(myForm);
    sendAjaxQuery('/add', formData);
    return false;
}

/**
 * Send the ajax query to server and catch the response after server processing the data.
 * @param url : The route where the request goes for processing.
 * @param data : The data about the new animal to send.
 */
function sendAjaxQuery(url, data) {
    $.ajax({
        url: url,
        data: data,
        dataType: 'json',
        type: 'POST',
        processData: false,
        contentType: false,
        success: function (dataR) {
            //If there is any issue, there will be a message part in the json response
            if (dataR.message){
                alert(JSON.stringify(dataR.message));
            } else if (dataR.toURL){
                //No issue arose, redirect to the url server want.
                window.location.href = dataR.toURL;
            }
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
        }
    });
}