
let groups;
let msg_elementlist = document.querySelector(".messages");
let current_group;
function requestGroups(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState== 4){
           groups = JSON.parse(xhttp.responseText);
           for(let i=0; i < groups.length; i++){
               if(groups[i].groupName!=null){
                 addGroup(groups[i].groupName);
               }
           }
        viewChat();            
        }
    };
    xhttp.open('GET', 'http://rest.learncode.academy/api/leh/groups', true);
    xhttp.send();
}
function addGroup(groupName){
    let list = document.querySelector(".list-groups");
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
            current_group =  groups[i].groupID;
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

/**Cadastro Grupo e Modal */
let open = document.querySelector(".add-group");
let modals = document.querySelectorAll(".modal");
let modal_group = document.querySelector(".modal-group");
let overlay = document.querySelector(".modal-overlay");
let nome = document.querySelector("#nome-grupo");
let id = document.querySelector("#id-grupo");
let cadastrar = document.querySelector("#cadastrar-grupo");

open.addEventListener('click', function(){
    modal_group.style.display = 'block';
    overlay.style.display = 'block';
});    
function closeModal(){
    for(let i=0; i<modals.length;i++){
        modals[i].style.display = 'none';
        overlay.style.display = 'none';
    }
}
window.addEventListener('click',function(){
    if(event.target==overlay){
        closeModal();
    }
});
cadastrar.addEventListener('click',function(){
    sendNewGroup();
});
function getObj(){
    let obj = {
        groupName: nome.value,
        groupID: id.value
    }
    return obj;
}
function sendNewGroup(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState== 4){
            closeModal();
            document.querySelector(".list-groups").innerHTML = "";
            requestGroups();
        }
    };
    xhttp.open('POST', 'http://rest.learncode.academy/api/leh/groups', true);
    xhttp.setRequestHeader("content-type","application/json");
    xhttp.send(JSON.stringify(getObj()));
}

/*Funcoes para login e modal */

let open_login = document.querySelector("#open-login");
let modal_login = document.querySelector(".modal-login");
let id_login = document.querySelector("#id-login");
let btn_login = document.querySelector("#logar");
localStorage.setItem("ID",null);

function login(){
    open_login.addEventListener('click',function(){
        modal_login.style.display = 'block';
        overlay.style.display = 'block';
    });
}
function logout(){
    modal_login.style.display = 'none';
    overlay.style.display = 'none';
    localStorage.removeItem("ID");
    open_login.innerHTML = "Entrar";
}

open_login.addEventListener('click',function(){
    if(localStorage.getItem("ID") == null || localStorage.getItem("ID") == "null"){
        console.log("login");
        login();
        btn_login.addEventListener('click',function(){
            localStorage.setItem("ID", id_login.value);
            closeModal();
            open_login.innerHTML = "Sair";
        });
    }else{
        logout();
        modal_login.style.display = 'none';
        overlay.style.display = 'none';
    }
});


/*Envio de mensagens*/
let nome_user = localStorage.getItem("ID");
let input_msg = document.querySelector("#input-msg");
let send_msg = document.querySelector("#send-msg");

function sendMsg(){
    let obj = {
        userName: nome_user,
        message: input_msg.value
    }
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState== 4){
            clearChat(msg_elementlist);
            requestMessages(current_group);
        }
    };
    xhttp.open('POST', 'http://rest.learncode.academy/api/leh/'+ current_group , true);
    xhttp.setRequestHeader("content-type","application/json");
    xhttp.send(JSON.stringify(obj));
}
send_msg.addEventListener('click',function(){
    sendMsg();
    input_msg.value = "";
});