
$(document).ready(function () 
{
    if(localStorage.getItem("login") == "yes"){
        $("#login").hide();
        $("#dropdown").show();
    }
    else {
        $("#login").show();
        $("#dropdown").hide();
    }
});
