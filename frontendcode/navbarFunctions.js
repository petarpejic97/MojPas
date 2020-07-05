$(document).ready(function () 
{
    LiListener()
    
})
function LiListener(){
    var parent = document.querySelector(".navbar")
    var as = parent.querySelectorAll("a")

    for (i = 0; i < as.length; i++) {
        as[i].addEventListener("click", function(e) {
            if(e.path[0].id != "navbarDropdownMenuLink"){
                localStorage.setItem("search","")
            }
        });
    }
}