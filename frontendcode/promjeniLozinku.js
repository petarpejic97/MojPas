function updatePassword(){
    
    var data = $("#pass-form").serialize();

    $.ajax({
        type:'POST',
        url: './backend/updatePassword.php',
        data:data,
        success : function(response){
           if(response =="error 1"){
            console.log("sdasad")
            $("#passwordalert").text("Zaporke se podudaraju.").css("display","block"); 
            $("#passwordalert").css("display","block")

           }
           else if(response== "error 0"){
            console.log("aaaaaaaaaaa")
            $("#passwordalert").text("Trenutna zaporka ne odgovara unesenoj.").css("display","block"); 
            $("#passwordalert").css("display","block")

           }
           else{
            $("#passwordalert").css("display","none")
            location.reload();
           }
        }
    })
}
function logout(){
    $.ajax({
        type:'GET',
        url: './backend/logOut.php',
        success : function(response){
           if(response == "seccesfully"){
               location.reload()
           }
        }
    })
    localStorage.setItem("login","no")
    localStorage.setItem("nickname","")
    location.reload();

}