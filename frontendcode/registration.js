var firstname, lastname, nickname,state, city, gender, email, phone, password, confpassword;
var flag;
$(document).ready(function () 
{
    $("#states").change(function () 
    {
        var val = $(this).val();

        if (val == "Hrvatska") 
        {
            $("#city").html("<option value='Zagreb'>  Zagreb</option>\
            <option value='Split'>  Split </option>\
            <option value='Rijeka'>  Rijeka </option>\
            <option value='Osijek'>  Osijek </option>\
            <option value='Zadar'>  Zadar </option>\
            <option value='Slavonski Brod'>  Slavonski Brod</option>\
            <option value='Pula'>  Pula </option>\
            <option value='Sesvete'>  Sesvete </option>\
            <option value='Kaštela'>  Kaštela </option>\
            <option value='Karlovac'>  Karlovac </option>\
            <option value='Sisak'>  Sisak </option>");
        }
        else if (val == "BiH") {
            $("#city").html("<option value='Sarajevo'>  Sarajevo</option>\
            <option value='Banja Luka'>  Banja Luka </option>\
            <option value='Tuzla'>  Tuzla </option>\
            <option value='Zenica'>  Zenica </option>\
            <option value='Mostar'>  Mostar </option>\
            <option value='Bihać'>  Bihać </option>\
            <option value='Brčko'>  Brčko </option>\
            <option value='Bjeljina'>  Bjeljina </option>\
            <option value='Prijedor'>  Prijedor </option>\
            <option value='Trebinje'>  Trebinje </option>\
            <option value='Travnik'>  Travnik </option>");
        } else if (val == "Srbija") {
            $("#city").html("<option value='Beograd'>Beograd</option>\
            <option value='Novi Sad'>Novi Sad </option>\
            <option value='Niš'>Niš</option>\
            <option value='Priština'>Priština</option>\
            <option value='Kragujevac'>Kragujevac</option>\
            <option value='Leskovac'>Leskovac</option>\
            <option value='Subotica'> Subotica</option>\
            <option value='Zrenjanin'>Zrenjanin</option>\
            <option value='Pančevo'>Pančevo</option>\
            <option value='Čačak'> Čačak</option>\
            <option value='Novi Pazar'> Novi Pazar</option>");
        } else if (val == "Slovenija") {
            $("#city").html("<option value='Ljubljana'>  Ljubljana</option>\
            <option value='Maribor'> Maribor</option>\
            <option value='Celje'>  Celje </option>\
            <option value='Kranj'>  Kranj </option>\
            <option value='Velenje'>  Velenje </option>\
            <option value='Ptuj'>  Ptuj </option>\
            <option value='	Koper'>  Koper </option>\
            <option value='Novo Mesto'>  Novo Mesto </option>\
            <option value='Murska Sobota'>  Murska Sobota </option>\
            <option value='Trbovlje'>  Trbovlje </option>\
            <option value='	Nova Gorica'>  Nova Gorica </option>");
        }
    });
});

function loadVariable(){

    firstname=$("#firstname").val();
    lastname=$("#lastname").val();
    nickname=$("#nickname").val();
    state=$("#states").val();
    city=$("#city").val();
    gender=$("#gender").val();
    email=$("#email").val();
    phone=$("#phone").val();
    password=$("#password").val();
    confpassword=$("#confirmpassword").val();
    
    checkfields();
}

function checkfields(){

    flag= true;

    checkEmptiFields();

    if(flag==true)
        checkPassword();

    if(flag==true)
        checkNickname();

    if(flag==true){
        writeInDatabase();
    }
}

function checkPassword(){
    
    if(password.length < 8){
        $("#passwordalert").text("Zaporka mora imati minimalno 8 znakova. Pokušajte ponovno.")
                                    .css("display","block");  

        flag = false;
    }

    if (!hasNumber(password)){
        $("#passwordalert").text("Zaporka mora sadržavati barem jedan broj.")
                            .css("display","block")
                            flag = false;
    }
    if (password != confpassword){
        $("#confirmpasswordalert").text("Zaporke se ne podudaraju!")
                                    .css("display","block")
                                    flag = false;
    }
}
function checkEmptiFields(){
    if(firstname=="" ){
        $("#firstnamealert").css("display","block");
        flag = false;
    }
    else
        $("#firstnamealert").css("display","none");
    if(lastname=="" ){
        $("#lastnamealert").css("display","block");
        flag = false;
    }
    else
        $("#lastnamealert").css("display","none");
    if(nickname==""){
        $("#nicknamealert").css("display","block");
        flag = false;
    }
    else
        $("#nicknamealert").css("display","none");
    if(state==""){
        $("#statesalert").css("display","block");
        flag = false;
    }
    else
        $("#statesalert").css("display","none");
    if(city==""){
        $("#cityalert").css("display","block");
        flag = false;
    }
    else
        $("#cityalert").css("display","none");
    if(email==""){
        $("#emailalert").css("display","block");
        flag = false;
    }
    else
        $("#emailalert").css("display","none");
    if(phone==""){
        $("#phonealert").css("display","block");
        flag = false;
    }
    else
        $("#phonealert").css("display","none");
    if(password==""){
        $("#passwordalert").css("display","block");
        flag = false;
    }
    else
        $("#passwordalert").css("display","none");
    if(confpassword==""){
        $("#confirmpasswordalert").css("display","block");
        flag = false;
    }
    else
        $("#confirmpasswordalert").css("display","none"); 
}

function checkNickname(){
    $.ajax({
        type:'POST',
        url: './backend/checknickname.php',
        data:{nickname:nickname},
        success : function(response){
            if( response == 0){
                
                $("#nicknamealert").text("Nadimak nije dostupan").css("display","block");
                flag = false;
            }
            else {
                $("#nicknamealert").css("display","none"); 
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
            
            location.reload();
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
