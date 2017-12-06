function getItensCesta(){
    try{
        return JSON.parse(sessionStorage.cesta);
    }catch(err){
        return [];
    }
}

function cestaTable(){
    let cesta = getItensCesta();
    for(let i=0; i< cesta.itens.length; i++){
        let td_Nome = $("<td></td>").text(cesta.itens[i].nome);
        let td_qtd = $("<td></td>").text(cesta.itens[i].qtd);
        let td_valor = $("<td></td>").text(cesta.itens[i].valor);
        let tr = $("<tr></tr>").append(td_Nome,td_qtd,td_valor);
        $("#tabela-compras tbody").prepend(tr);
        $("#total").text(cesta.total);
    }
}

$("#finalizar-compra").click(function(e){
    e.preventDefault();
    $.ajax({
        type:'POST',
        url: 'http://rest.learncode.academy/api/leh_loja/compras_realizadas',
        dataType: 'json',
        data: {
            valor: getItensCesta().total,
            email_comprador: localStorage.getItem("user"),
            dataHorario: new Date().toLocaleString()
        } ,
        success: function(data){
            $("#tabela-compras tr>td").remove();
            $(".alert").removeClass("d-none");
            sessionStorage.cesta = "";
        }
    })
});

function comprasFinalizadas(){
    $.ajax({
        type: 'GET',
        url: 'http://rest.learncode.academy/api/leh_loja/compras_realizadas',
        dataType: 'json',
        success: function(compras){
            for(let i=0; i< compras.length; i++){
                if(compras[i].email_comprador == localStorage.getItem("user")){
                    let td_data = $("<td></td>").text(compras[i].dataHorario);
                    let td_valor = $("<td></td>").text(compras[i].valor);
                    let tr = $("<tr></tr>").append(td_data,td_valor);
                    $("#tabela-finalizadas tbody").prepend(tr);
                }
            }
        } 
    });
}
comprasFinalizadas();

if(sessionStorage.cesta != ""){
    cestaTable();
}
