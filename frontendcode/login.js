var email,password,flag;

function loadVariable(){

    email = $("#email").val();
    password = $("#password").val();

    checkInputs();
}
function checkInputs(){
    flag=true;

    checkEmptyFields();

    if(flag == true)
        checkIfEmailExist();
}
function checkEmptyFields(){
    
    if(email == ""){
        $("#emailalert").text("Molimo Vas unesite svoj email.").css("display","block"); 
        flag = false; 
    }
    else
        $("#emailalert").css("display","none");

    if(password == ""){
        
        $("#passwordalert").text("Molimo Vas unesite svoju zaporku.").css("display","block"); 
        flag = false; 
    }
    else
        $("#passwordalert").css("display","none")
}
function checkIfEmailExist(){
    $.ajax({
        type:'POST',
        url:'./backend/checkemail.php',
        data:{email:email},
        success : function(response){
            if(response == "false"){
                $("#emailalert").text("Molimo Vas obavite registraciju.").css("display","block"); 
                flag = false; 
            }
            else{
                doLogin();
                $("#emailalert").css("display","none");
            }
        
        }
    })
}
function doLogin(){
    if(flag == true){

        var data = $("form").serialize();
        $.ajax({
            type:'POST',
            url:'./backend/login.php',
            data:data,
            success : function(response){
                console.log(response)
                if(response == "success"){
                    saveInLocalstorage();
                    relocatePage();
                }
                else{
                    $("#passwordalert").text("Prijava nije uspjela.Pokušajte ponovno.").css("display","block"); 

                }
            }
        })
    }
    
}
function saveInLocalstorage(){
    localStorage.setItem("login","yes");
}
function relocatePage(){
   window.location.href="http://localhost/mojpas/index.html"
}
function logout(){
    window.location.href="http://localhost/mojpas/login.html"

}