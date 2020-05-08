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
    document.getElementById("index").setAttribute("class", "active");
}