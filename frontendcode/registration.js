var nickname, email, password, confpassword;
var flag;
$(document).ready(function () 
{
    
});

function loadVariable(){

    nickname=$("#nickname").val();
    email=$("#email").val();
    password=$("#password").val();
    confpassword=$("#confirmpassword").val();
    
    checkfields();
}

function checkfields(){

    flag= 0;

    checkEmptiFields();

    if(flag==0)
        checkPassword();

    if(flag==0)
        checkNickname();

}

function checkEmptiFields(){
    if(nickname==""){
        $("#nicknamelabel").css("color","red");
        $("#nickname").css("border-bottom","1px solid red")
        flag = false;
    }
    else{
        $("#nicknamelabel").css("color","rgb(133, 133, 133)");
        $("#nickname").css("border-bottom","1px solid black")
    }

    if(email==""){
        $("#emaillabel").css("color","red");
        $("#email").css("border-bottom","1px solid red")
        flag = false;
    }
    else{
        $("#emailalert").css("display","rgb(133, 133, 133)");
        $("#email").css("border-bottom","1px solid black")
    }

    if(password==""){
        $("#passwordlabel").css("color","red");
        $("#password").css("border-bottom","1px solid red")
        flag = false;
    }
    else{
        $("#passwordalert").css("display","rgb(133, 133, 133)");
        $("#password").css("border-bottom","1px solid black")
    }

    if(confpassword==""){
        $("#confirmpasswordlabel").css("color","red");
        $("#confirmpassword").css("border-bottom","1px solid red")
        flag = false;
    }
    else{
        $("#confirmpasswordalert").css("display","rgb(133, 133, 133)"); 
        $("#confirmpassword").css("border-bottom","1px solid black")
    }
    

}
function checkPassword(){
    console.log("UDEM2")
    if(password.length < 8 || !hasNumber(password)){
        alert("Zaporka mora imati minimalno 8 znakova i mora sadržavati barem jedan broj !")

        flag = false;
    }

    if (password != confpassword){
        alert("Zaporke se ne podudaraju !")

        flag = false;
    }
    console.log("Izadem2 flag je"+flag)

}


function checkNickname(){
    $.ajax({
        type:'POST',
        url: './backend/checknickname.php',
        data:{nickname:nickname,
            email:email},
        success : function(response){
            if( response == 0){
                $("#nicknamelabel").css("color","red");
                $("#nickname").css("border-bottom","1px solid red")
                alert("Nadimak se već koristi. Molimo Vas unesite drugi.")
                
            }
            else{
                checkEmail()
            }

        }
    })
}

function checkEmail(){
    $.ajax({
        type:'POST',
        url: './backend/checkemail.php',
        data:{nickname:nickname,
            email:email},
        success : function(response){
            console.log("ULAZIM U 444" + response)
            if( response == 0){
                alert("Email se već koristi. Molimo Vas unesite drugi.")
            }
            else{
                writeInDatabase()
            }

        }
    })
}
function writeInDatabase(){
    var data = $("#register-form").serialize();
    $.ajax({
        type:'POST',
        url: './backend/registration.php',
        data:data,
        success : function(response){
            if(response == "succesfully"){
                window.location="./login.html"
            }
        }
    })
}
function hasNumber(myString) {
    return /\d/.test(myString);
  }
function logout(){
    localStorage.setItem("login","no")
    $("#login").show();
    $("#btnlogout").hide();
    location.reload();
}
