var email,password,flag;
$(document).ready(function () 
{
    if(localStorage.getItem("login")=="yes")
        setNickInNavBar();
    colorizeActionLink();
});

function logout(){
    localStorage.setItem("login","no")
    localStorage.setItem("nickname","")
    location.reload();
}
function setNickInNavBar(nickname){
    document.getElementById("navbarDropdownMenuLink").innerHTML = localStorage.getItem("nickname");
}
function colorizeActionLink(){
    document.getElementById("login").setAttribute("class", "active");
}
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
                if(response != 0){
                    saveInLocalStorage(response)
                    relocatePage();
                }
                else{
                    $("#passwordalert").text("Prijava nije uspjela.Pokušajte ponovno.").css("display","block"); 
                }
            }
        })
    }
}
function relocatePage(){
   window.location.href="http://localhost/mojpas/index.php"
}
function saveInLocalStorage(nickname){
    localStorage.setItem("login","yes");
    localStorage.setItem("nickname",nickname)
}