var login;

$(document).ready(function () 
{
    login= localStorage.getItem("login");

    if(login == "yes"){
        $("#login").hide();
        $("#btnlogout").show();

        registrationGoDown();
    }
    else {
        $("#login").show();
        $("#btnlogout").hide();
    }
    
});
function registrationGoDown(){
    $("#registration").css("margin-top","3px");
}