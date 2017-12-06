let cesta_compras = {
    itens: [],
    total: 0
};

$("#finalizar").click(function(){
    sessionStorage.setItem("cesta",JSON.stringify(cesta_compras));
});

$(document).ready(function() {
    $(".btn-add-item").click(function(e){
        e.preventDefault();
        if($(this).siblings(".input-qtd").val() != ""){
            let item = {
                nome: $(this).siblings(".card-title").text(),
                valor: $(this).siblings(".card-text").attr("data-val"),
                qtd: $(this).siblings(".input-qtd").val()
            }
            var newDropItem = $('<div class="dropdown-item"></div>').text(item.nome + " x"+ item.qtd);
            $("#cesta .dropdown-menu").prepend(newDropItem);
            cesta_compras.total += item.valor*item.qtd;
            cesta_compras.itens.push(item);
        }
    })
});
