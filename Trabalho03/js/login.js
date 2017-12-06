function validateLogin(email,senha){
    $.ajax({
        type: 'GET',
        url: 'http://rest.learncode.academy/api/leh_loja/users',
        dataType: 'json',
        success: function(users){
            for(let i=0; i < users.length; i++){
                if(users[i].email == email && users[i].senha == senha){
                   localStorage.setItem("user",email);
                   ableOptionsAndDisableForm();
                   return;
                }
            }
            $("#email-login").addClass("is-invalid");
            $("#senha-login").addClass("is-invalid");
        } 
    });
}
$("#form-login").submit(function(e){
    e.preventDefault();
    validateLogin($("#email-login").val(),$("#senha-login").val());
});

function ableOptionsAndDisableForm(){
    if(localStorage.getItem("user") != null){ 
        $(".btn-add-item").removeClass("d-none");
        $("#opcoes-user").removeClass("d-none");
        $("#drop-login").addClass("d-none");
        $("#drop-cadastro").addClass("d-none");
    }
}
ableOptionsAndDisableForm();

$("#logout").click(function(e){
    e.preventDefault();
    localStorage.removeItem("user");
    location.reload();
});