/**
 * Get the user input keyword from the search bar, pack it into json style and
 * send ajax query to the server.
 */
function searchSubmit(){
    var searchQ = $('#search-input').serializeArray();
    var data = {};
    // var serialise = $('#search-input').serialize();
    // console.log(serialise);
    data[searchQ[0].name] = searchQ[0].value;
    console.log(data);
    sendAjaxQuery('/browse'  , data);
    event.preventDefault();
}

/**
 * Send the ajax query to server and catch the response after server processing the data.
 * @param url : The route where the request goes for processing.
 * @param data : The keyword data to send.
 */
function sendAjaxQuery(url, data){
    $.ajax({
        url: url,
        data: data,
        dataType: 'json',
        type: 'GET',
        success: dataR=>{
            //After sending the keyword for the server to process, redirect to the new browsing page.
            console.log('Success');
            window.location.href = '/browse';
        },
        error: (xhr, status, error)=>{
            console.log(error);
        }
    })
}