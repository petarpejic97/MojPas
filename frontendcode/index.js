var login;

$(document).ready(function () 
{
login= localStorage.getItem("login");

    if(login == "yes"){
        $("#login").hide();
        $("#btnlogout").show();
    }
});

function logout(){
    localStorage.setItem("login","no")
    $("#btnlogout").hide();
    $("#login").show();
    

    location.reload();
}
function myScript(e){
    alert(e.target.attributes.id.value);       
}