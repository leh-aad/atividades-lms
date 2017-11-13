let json = 
[
    { 
         usuario: 'joao03',
         mensagens: [
              {
                usuario: 'joao03',
                texto: 'Tudo bem?'
              },
              {
                usuario: 'victor23',
                texto: 'Tudo Tranqs'
              },
              {
                usuario: 'joao03',
                texto: 'Que bom'
              },
         ]
    },
    { 
        usuario: 'maria2000',
        mensagens: [
             {
                usuario: 'maria2000',
                texto: 'Na paz?'
             },
             {
                usuario: 'victor23',
                texto: 'Show'
             },
             {
                usuario: 'maria2000',
                texto: 'Que bom'
             },
        ]
   },
   { 
        usuario: 'robson_alves',
        mensagens: [
            {
                usuario: 'victor03',
                texto: 'Bom?'
            },
            {
                usuario: 'robson_alves',
                texto: 'Bom'
            },
            {
                usuario: 'victor03',
                texto: 'Que bom'
            },
        ]
    }   
];

function viewFriends(){
    let list = document.querySelector(".list");
    
    for(i in json){
        let div = document.createElement("div");
        list.appendChild(div);
        let img = document.createElement("img");
        let span = document.createElement("span");
        div.appendChild(img);
        div.appendChild(span);
        div.classList.add("item");
        img.src = "img/person.png";
        img.classList.add("profile-pic");
        span.innerHTML = json[i].usuario;
    }   
}
function clearChat(node){
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}
function viewChat(){
    let itens = document.querySelectorAll(".item"); 
    let span = document.querySelector("#current-name");
    let msg = document.querySelector(".messages");

    for(let i = 0; i < itens.length; i++){
        itens[i].addEventListener('click',function(){
            clearChat(msg);
            span.innerHTML = json[i].usuario;
            for(j in json[i].mensagens){
                let div = document.createElement("div");
                let span = document.createElement("span");
                msg.appendChild(div);    
                div.appendChild(span);
                span.innerHTML = json[i].mensagens[j].texto;
                
                if(json[i].usuario != json[i].mensagens[j].usuario){
                    div.classList.add("sended-msg");
                }else{
                    div.classList.add("received-msg");
                }
            }
        });
    }
}

viewFriends();
viewChat();