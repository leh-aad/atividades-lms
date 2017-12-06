function validateUser(email){
    $.ajax({
        type: 'GET',
        url: 'http://rest.learncode.academy/api/leh_loja/users',
        dataType: 'json',
        success: function(users){
            for(let i=0; i < users.length; i++){
                if(users[i].email == email){
                    $("#email-cadastro").addClass("is-invalid");
                    return;
                }
            }
            $("#email-cadastro").addClass("is-valid");
            $("#senha-cadastro").addClass("is-valid");
            sendRegister();
        } 
    });
}
function sendRegister(){
    $.ajax({
        type:'POST',
        url: 'http://rest.learncode.academy/api/leh_loja/users',
        dataType: 'json',
        data: {email: $("#email-cadastro").val(), senha: $("#senha-cadastro").val()},
        success: function(data){
            
        }
    })
}
$("#form-cadastro").submit(function(e){
    e.preventDefault();
    validateUser($("#email-cadastro").val());
});

$("#email-cadastro").change(function(){
    $(this).removeClass("is-invalid");
});