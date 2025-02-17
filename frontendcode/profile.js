$(document).ready(function () 
{
    setTimeout(colorizeActionLink(), 100)
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
function colorizeActionLink(){
    document.getElementById("dropdown").setAttribute("class", "active");
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