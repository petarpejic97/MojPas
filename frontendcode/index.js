var login;

$(document).ready(function () 
{
    setNickInNavBar();
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
function setNickInNavBar(nickname){
    document.getElementById("navbarDropdownMenuLink").innerHTML = localStorage.getItem("nickname");
}