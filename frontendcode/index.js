$(document).ready(function () 
{
    
    if(localStorage.getItem("login")=="yes")
        setNickInNavBar();
    colorizeActionLink();
    
    $("#trazi").click(function(){
        let term = $(".search").val()
        localStorage.setItem("search",term)
        window.location="./pregledoglasa.html"
    })

    var buttons = document.querySelectorAll("#dog-btn")
    for (i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function() {
            let title = this.innerHTML
            $.ajax({
                type:'POST',
                url:'./backend/getAdvertisementId.php',
                data:{title:title},
                success : function(response){
                    window.location.href = "http://localhost/mojpas/oglas.php?id="+response;
                }
            })
        });
    }
    
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