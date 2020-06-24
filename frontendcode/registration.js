var nickname, email, password, confpassword;
var flag;
$(document).ready(function () 
{
    colorizeActionLink();
});

function colorizeActionLink(){
    document.getElementById("registracija").setAttribute("class", "active");
}
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
        flag = 1;
    }
    else{
        $("#nicknamelabel").css("color","rgb(4, 57, 87)");
        $("#nickname").css("border-bottom","1px solid black")
    }

    if(email==""){
        $("#emaillabel").css("color","red");
        $("#email").css("border-bottom","1px solid red")
        flag = 1;
    }
    else{
        $("#emaillabel").css("color","rgb(4, 57, 87)");
        $("#email").css("border-bottom","1px solid black")
    }

    if(password==""){
        $("#passwordlabel").css("color","red");
        $("#password").css("border-bottom","1px solid red")
        flag = 1;
    }
    else{
        $("#passwordlabel").css("color","rgb(4, 57, 87)");
        $("#password").css("border-bottom","1px solid black")
    }

    if(confpassword==""){
        $("#confirmpasswordlabel").css("color","red");
        $("#confirmpassword").css("border-bottom","1px solid red")
        flag = 1;
    }
    else{
        $("#confirmpasswordlabel").css("color","rgb(4, 57, 87)");
        $("#confirmpassword").css("border-bottom","1px solid black")
    }
}
function checkPassword(){
    if(password.length < 8 || !hasNumber(password)){
        alert("Zaporka mora imati minimalno 8 znakova i mora sadržavati barem jedan broj !")
        $("#passwordlabel").css("color","red");
        $("#password").css("border-bottom","1px solid red")
        flag = 1;
    }
    else{
        $("#passwordlabel").css("color","rgb(4, 57, 87)");
        $("#password").css("border-bottom","1px solid black")
    }

    if (password != confpassword){
        alert("Zaporke se ne podudaraju !")
        $("#confirmpasswordlabel").css("color","red");
        $("#confirmpassword").css("border-bottom","1px solid red")
        flag = 1;
    }
    else{
        $("#confirmpasswordlabel").css("color","rgb(4, 57, 87)");
        $("#confirmpassword").css("border-bottom","1px solid black")
    }
}

function checkNickname(){
    $.ajax({
        type:'POST',
        url: './backend/checknickname.php',
        data:{nickname:nickname},
        success : function(response){
            if( response == 0){
                $("#nicknamelabel").css("color","red");
                $("#nickname").css("border-bottom","1px solid red")
                alert("Nadimak se već koristi. Molimo Vas unesite drugi.")
            }
            else{
                $("#nicknamelabel").css("color","rgb(4, 57, 87)");
                $("#nickname").css("border-bottom","1px solid black")
                checkEmail()
            }

        }
    })
}

function checkEmail(){
    $.ajax({
        type:'POST',
        url: './backend/checkemail.php',
        data:{email:email},
        success : function(response){
            if( response == 0){
                alert("Email se već koristi. Molimo Vas unesite drugi.")
                $("#emaillabel").css("color","red");
                $("#email").css("border-bottom","1px solid red")
            }
            else{
                $("#emaillabel").css("color","rgb(4, 57, 87)");
                $("#email").css("border-bottom","1px solid black")
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