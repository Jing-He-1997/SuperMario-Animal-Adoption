/**
 * Get the location the user clicked, turn it into json style data
 * and send ajax query to the server.
 * @param location : The data about the catalog_location details to send.
 */
function locationSubmit(location) {
    var data = {};
    data[location.name] = location.innerHTML;
    console.log(data);
    sendAjaxQuery('/browse', data);
    event.preventDefault();
}

/**
 * Send the ajax query to server and catch the response after server processing the data.
 * @param url : The route where the request goes for processing.
 * @param data : The data about the location details to send.
 */
function sendAjaxQuery(url, data) {
    $.ajax({
        url: url,
        data: data,
        dataType: 'json',
        type: 'GET',
        success: dataR => {
            console.log('Success');
            window.location.href = '/browse';
        },
        error: (xhr, status, error) => {
            console.log(error);
        }
    })
}