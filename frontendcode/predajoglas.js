var filled = false;
var naslov,cijena,cijepljenje,vrsta,opis,file;

$(document).ready(function () 
{

  setTimeout(colorizeActionLink(), 100)
    
    loadLocationFields()

    loadLoginAlert()
    
    submitAdvertisement()
    
});
function loadLocationFields(){
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
}
function colorizeActionLink(){
  document.getElementById("predajoglas").setAttribute("class", "active");
}
function loadLoginAlert(){
  if( localStorage.getItem("login")=="no"){
    $(':input[type="submit"]').prop("disabled",true)
    $("#loginalert").css("display","block");
  }
  else{
      $("#loginalert").css("display","none");
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
function submitAdvertisement(){
  $("#oglas-form").on('submit', function(e){
    loadVariable();
      e.preventDefault();
      e.stopPropagation();

      if(filled == true){

        $.ajax({
          type: "POST",
          url: "./backend/predajoglas.php",
          data: new FormData(this),
          processData: false,
          contentType: false,
          success:function(response){
            console.log(response)
            location.reload()
          }
        });
      }
  });
}
function loadVariable(){
    naslov=$("#naslov").val();
    vrsta=$("#vrsta").val();
    cijena=$("#cijena").val();
    cijepljenje=$('input[name=customRadio]:checked', '#oglas-form').val()
    opis=$("#opis").val();
    file=$("#file").val();
    drzava=$("#states").val();
    grad=$("#city").val();
    detaljolokaciji=$("#detail").val();
   
    checkFields()
}

function checkFields(){
  if(naslov=="" || cijena=="" || opis=="" || drzava=="" || grad=="" ){
      $("#formalert").css("display","block");
  }
  else{
    $("#formalert").css("display","none");
    filled = true
  }
}

var loadFile = function(event) {
    
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
    $("#tekstnaslici").text("")
  };
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
