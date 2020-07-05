var AdArray=[]
$(document).ready(function () 
{
    setTimeout(colorizeActionLink(), 100)

    loadData();
});
function colorizeActionLink(){
    document.getElementById("pregledoglasa").setAttribute("class", "active");
}
function loadData(){

    $.ajax({
        type: "GET",
        url: "./backend/getAllUserAdvertisement.php",
        success: function(response)
        {
          var advertisements = JSON.parse(response)
          if(advertisements.length == 0){
            $("#advertisement-wrapper").css("display","none")
            $(".alert").css("display","block")
          }
          else{
            $("#advertisement-wrapper").css("display","block")
                $(".alert").css("display","none")
                text="<ul class='advertisiment-list'>"
                for(let i = 0; i< advertisements.length; i++){
                    text+="<li class='advertisiment-item'>"+advertisements[i].title+"<i class='fa fa-times fa-lg' aria-hidden='true'>"+"</i></li>"
                    }
                text+="</ul>";
                document.getElementById("advertisement-wrapper").innerHTML = text;
                setListenerOnX();
            }
        }
    })

    
}
function setListenerOnX(){
    var wrapepr = document.querySelector("#advertisement-wrapper")
    var fas = wrapepr.querySelectorAll(".fa")
    for (i = 0; i < fas.length; i++) {
        fas[i].addEventListener("click", function() {
            let clickedItemList=this.parentNode
            $.ajax({
                type:'POST',
                url:'./backend/deleteAdvertisement.php',
                data:{title:this.parentNode.textContent},
                success : function(response){
                    if(response=="record deleted"){
                        clickedItemList.style.display="none"
                    }
                }
            })
        });
    }
}
function logout(){
    $.ajax({
        type:'GET',
        url: './backend/logOut.php',
        success : function(response){
            console.log(response)
            localStorage.setItem("login","no")
            localStorage.setItem("nickname","")
            window.location.href = "http://localhost/mojpas/index.php";
        }
    })
  }
  function colorizeActionLink(){
    document.getElementById("dropdown").setAttribute("class", "active");
}