$(document).ready(function () 
{
    setListenerOnStar()
});

function setListenerOnStar(){
    let rating = document.querySelector(".rating")
    let stars = rating.querySelectorAll("label")
    
    let wrapper = document.querySelector(".contact-wrapper")
    let nickname = wrapper.getElementsByTagName("div")[1]

    for (i = 0; i < stars.length; i++) {
        stars[i].addEventListener("click", function() {
            let rate = this.previousElementSibling.defaultValue
            let rated_user = nickname.textContent
            $.ajax({
                type:'POST',
                url:'./backend/rateUser.php',
                data:{rate:rate,
                    rated_user:rated_user},
                success : function(response){
                    console.log(response)
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
            location.reload()
        }
    })
  }