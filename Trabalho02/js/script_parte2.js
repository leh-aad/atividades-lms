
let groups;
let msg_elementlist = document.querySelector(".messages");

function requestGroups(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState== 4){
           groups = JSON.parse(xhttp.responseText);
           for(let i=0; i < groups.length; i++){
               addGroup(groups[i].groupName);
           }
        viewChat();            
        }
    };
    xhttp.open('GET', 'http://rest.learncode.academy/api/leh/groups', true);
    xhttp.send();
}
function addGroup(groupName){
    let list = document.querySelector(".list");
    let div = document.createElement("div");
    list.appendChild(div);
    let img = document.createElement("img");
    let span = document.createElement("span");
    div.appendChild(img);
    div.appendChild(span);
    div.classList.add("item");
    img.src = "img/person.png";
    img.classList.add("profile-pic");
    span.innerHTML = groupName;
}
function clearChat(node){
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function requestMessages(groupID){
    let xhttp = new XMLHttpRequest();
    let msgs;
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState== 4){
           msgs = JSON.parse(xhttp.responseText);
           viewMsgs(msgs);
        }
    };
    xhttp.open('GET', 'http://rest.learncode.academy/api/leh/' + groupID, true);
    xhttp.send();
}

function viewChat(){
    
    let itens = document.querySelectorAll(".item"); 
    let span = document.querySelector("#current-name");
    
    
    for(let i = 0; i < itens.length; i++){
        itens[i].addEventListener('click',function(){
            clearChat(msg_elementlist);
            span.innerHTML = groups[i].groupName;
            requestMessages(groups[i].groupID);
        });
    }
}

function viewMsgs(group_chat){
    for(let i =0; i < group_chat.length; i++){
        let div = document.createElement("div");
        let span = document.createElement("span");
        let h5 = document.createElement("h5");
        let msg_text = document.createTextNode(group_chat[i].message);
        msg_elementlist.appendChild(div);    
        div.appendChild(span);
        h5.innerHTML = group_chat[i].userName;
        span.appendChild(h5);
        span.appendChild(msg_text);
        
        div.classList.add("received-msg");
    }
}
requestGroups();
