$(document).ready(function () 
{
    setTimeout(colorizeActionLink(), 100)
    
    
    $("#trazi").click(function(){

        let term = $(".search").val()
        if(term.length > 2){
            localStorage.setItem("search",term)
            window.location="./pregledoglasa.html"
        }
        
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
function colorizeActionLink(){
    document.getElementById("index").setAttribute("class", "active");
}

function logout(){
    $.ajax({
        type:'GET',
        url: './backend/logOut.php',
        success : function(response){
            console.log(response)
            localStorage.setItem("login","no")
            localStorage.setItem("nickname","")
            location.reload()
        }
    })
    

}
