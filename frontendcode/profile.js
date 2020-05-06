$(document).ready(function () 
{
    setNickInNavBar();
    loadData();
});

function loadData(){
    $.ajax({
        type: "POST",
        url: "./backend/loadprofiledata.php",
        success:function(response){
            
            var obj = JSON.parse(response);
            console.log(obj[0].nickname);
            document.getElementById("emaillabel").textContent= obj[0].email;
            document.getElementById("nickname").value= obj[0].nickname;
            document.getElementById("firstname").value= obj[0].firstname;
            document.getElementById("lastname").value= obj[0].lastname;
            document.getElementById("phone").value= obj[0].phone;
            document.getElementById("state").value= obj[0].state;
            document.getElementById("city").value= obj[0].city;
            document.getElementById("gender").value= obj[0].gender;
            
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
               console.log("UDEM")
               location.reload()
           }
        }
    })
}
function setNickInNavBar(nickname){
    document.getElementById("navbarDropdownMenuLink").innerHTML = localStorage.getItem("nickname");
}