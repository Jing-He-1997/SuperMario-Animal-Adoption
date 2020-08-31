/**
 * Get the data of new comment from the view and packed into json format with the animal's id
 * and send ajax query to the server.
 * @param id : the animal id of the animal page where the comment comes from.
 */
function commentsSubmit(id){
    var comment = $('#content').serializeArray();
    console.log(comment);
    var data = {};
    data[comment[0].name] = comment[0].value;
    data['id'] = id;
    console.log(data);
    sendAjaxQuery('/animal/' + id, data);
    document.getElementById('content').value = '';
    event.preventDefault();
};

/**
 * Send the ajax query to server and catch the response after server processing the data.
 * @param url : The route where the request goes for processing.
 * @param data : The data including the comment and the id to send.
 */
function sendAjaxQuery(url, data){
    $.ajax({
        url: url,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: (dataR)=>{
            //After processing the comment, add the comment to the comment list in the animal page
            var node = document.createElement("li");
            var text = document.createTextNode(dataR.user + ': ' + dataR.content);
            node.appendChild(text);
            document.getElementById('comments').appendChild(node);
        },
        error: (xhr, status, error)=>{
            alert('Error: ' + error.message);
        }
    })
};