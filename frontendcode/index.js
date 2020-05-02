var login;

$(document).ready(function () 
{
    console.log("ulazim")
    login= localStorage.getItem("login");

    if(login == "yes"){
        $("#login").hide();
        $("#btnlogout").show();
    }
});

function logout(){
    localStorage.setItem("login","no")
    $("#login").show();
    $("#btnlogout").hide();

    location.reload();
}
