$(document).ready(function () 
{
  if(localStorage.getItem("login")=="yes")
        setNickInNavBar();
    colorizeActionLink();
    loadData();
});

function loadData(){
    $.ajax({
        type: "GET",
        url: "./backend/loadprofiledata.php",
        success:function(response){
            console.log(response)
            var obj = JSON.parse(response);
            console.log(obj.nickname);
            document.getElementById("emaillabel").textContent= obj.email;
            document.getElementById("nickname").value= obj.nickname;
            document.getElementById("firstname").value= obj.firstname;
            document.getElementById("lastname").value= obj.lastname;
            document.getElementById("phone").value= obj.phone;
            document.getElementById("state").value= obj.state;
            document.getElementById("city").value= obj.city;
            document.getElementById("gender").value= obj.gender;
        }
      });
}

function updateUserData(){
    
    var data = $("#user-form").serialize();
    console.log(data)
    $.ajax({
        type:'POST',
        url: './backend/updateUserData.php',
        data:data,
        success : function(response){
           if(response == "seccesfully"){
               location.reload()
           }
        }
    })
}
function setNickInNavBar(nickname){
    document.getElementById("navbarDropdownMenuLink").innerHTML = localStorage.getItem("nickname");
}
function colorizeActionLink(){
    document.getElementById("dropdown").setAttribute("class", "active");
  }