var login;

$(document).ready(function () 
{


    login= localStorage.getItem("login");

    if(login == "yes"){
        $("#login").hide();
        $("#dropdown").show();

    }
    else {
        $("#login").show();
        $("#dropdown").hide();
    }
    
});
