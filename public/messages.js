var xhr = new XMLHttpRequest();

var last_update = "";
window.onload = update_messages;
setInterval(update_messages, 1000);

function post_message(){
  
   var message = document.getElementById("message_post").value;
   var user = "bob@gmail.com"
   xhr.open("POST", "/messages/new.xml");
   xhr.send("user="+user+"&"+"text="+message);
}

function update_messages(){
    
    xhr.onreadystatechange = message_callback;
    
    xhr.open("GET", "/messages.xml?"+new Date());
    xhr.send(null);
    
    return false;
}

var message_callback = function(){
    if( xhr.readyState == 4 ){
        if(xhr.status == 200){
            parse_xml(xhr.responseXML);
        }
        else{
            alert(xhr.statusText);
        }
    }
}

var parse_xml = function(messages_xml){
    
    if(messages_xml == null){
        return;
    }
    var i = 0,
        start_print = false,
        messages = messages_xml.firstChild.getElementsByTagName("message"),
        len = messages.length,
        message,
        created,
        from,
        text;
    
    for(; i< len; i=i+1){
        message = messages[i];
        
        created = message.getElementsByTagName("created-at")[0].firstChild.nodeValue;
        
        if( start_print || last_update == ""){
            if(message.getElementsByTagName("user")[0].firstChild != null){
                from = message.getElementsByTagName("user")[0].firstChild.nodeValue;
                
                if(message.getElementsByTagName("text")[0].firstChild != null){
                    text = message.getElementsByTagName("text")[0].firstChild.nodeValue;
                    update_dom(from, text);    
                }
            }
        }
        
        if( created == last_update ){
            start_print = true;
        }
    }
    
    last_update = created;
}

var update_dom = function(from, text){
    var message_area = document.getElementById("messages_area");
    var tr = document.createElement("tr");
    
    var td = document.createElement("td");
    var text_node = document.createTextNode(text);
    td.appendChild(text_node);
    tr.appendChild(td);
    
    var td = document.createElement("td");
    var from_node = document.createTextNode(from);
    td.appendChild(from_node);
    tr.appendChild(td);
    
    message_area.appendChild(tr);
}