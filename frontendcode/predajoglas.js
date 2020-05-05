var dogs = [
    "Australski svilenkasti terijer","Australski terijer","Aireski ovčar","Aljaški malamut","Alpski brak jazavčar","Američki koker Španijel",
    "Američki lisičar","Američi stafordski terijer","Američki vodeni španijel","Apencelski pastirski pas","Arapski hrt","Ardenski govedar",
    "Ariješki gonič","Ariješki ptičar","Artezijsko-Normandijski baset","Australski čuvar stada","Australski kratkorepi pastirski pas",
    "Australski ovčar","Austrijski kratkodlaki pinč","Austrijski gonič","Afganistanski hrt","Aidi","Akita","Alentijski pastirski pas",
    "Američka akita","Američki baset","Američki gonič rakuna","Argentinska doga","Artoaški gonič",
    "Bedlington terijer","Belgijski grifon","Bostonski terijer","Bolonjski pas","Brazilski terijer","Briselski grifon","Barbet","Basenji",
    "Bavarski planinski gonič","Belgijski ovčar","Bergamski ovčar","Beagle","Beagle zečar","Bosanski oštrodlaki gonič","Bradati škotski ovčar",
    "Bretonski španijel","Briselski grifon","Burbonski ptičar","Billy","Bokser","Boseron","Briješki ovčar","Bernardinac","Bernski planinski pas","Bordoška doga",
    "Blumastif",
    "Chihuahua","Chow chow","Crnogorski planinski gonič","Cane corso","Crni ruski terijer",
    "Češki terijer","Čehoslovački vučjak","Češki oštrodlaki ptičar",
    "Dansko-švedski farmerski pas","Dendi dinmont terijer","Dalmatiner","Drentski ptičar","Danski mastif",
    "Engleski patuljasti terijer","Engleski bull terijer","Engleski kratkodlaki hrt","Engleski lisičar","Engleski pointer","Estrelski planinski pas",
    "Englesko-francuski gonič",
    "Faraonski hrtoliki gonič","Flandrijski stočarski pas","Francuski gonič","Francuski ptičar",
    "Graničarski terijer","Gordon seter","Grendlandski pas","Hamiltonov gonič",
    "Havanezer","Hovawart",
    "Kanarski hrtoliki gonič","Kanarski pas","Klamber španijel","Komodor","Kovrčavi retriver","Kuvas",
    "Irski bučji hrt",
    "Japanski čin","Jorkširski terijer","Jack Russel terijer","Japanski špic","Japanski terijer","Jazavčar",
    "Kineski kukmasti pas","Kavalirski španijel","Kern terijer","Kovrčavi bišon","Kratkodlaki foksterijer",
    "Lakelandski terijer","Lasa apso","Lowchen","Lebdsur","Leonberger","Labrador retriver",
    "Majmunski pinč","Mali engleski hrt","Mali talijanski hrt","Manchesterski terijer","Mops","Mudi","Mali Barbanson","Maltezer","Mastif",
    "Mađarska oštrodlaka vižla","Mađarski hrt","Majorški buldog","Majorški ovčar","Maremansko-abruceški ovčar",
    "Nizozemski smoushound","Njemački lovni terijer","Napuljski mastif","Newfoundland","Njemačka doga","Nizozemski ovčar","Nizozemski španijel",
    "Njemački dugodlaki ptičar","Njemački igličar ptičar","Njemački kratkodlaki ptičar","Njemački oštrodlaki pričar","Njemački ovačar",
    "Patuljasti kontinentalni španijel","Pirinejski mastif","Pirenejski planinski pas","Pas sv. Huberta","Pas Sv. Miguela","Pastirski pas iz Laboreira",
    "Pikardijski španijel","Poatevenski gonič","Podhalanski pastirski pas","Poljski gonič","Pudelpointer",
    "Ruski patuljasti pas","Rotvajler","Ravnodlaki retriver","Retriver zaljeva Chesapeake","Rodezijski gonič lavova","Rumunjski karpatski ovčar",
    "Rumuljski mioritski ovčar","Ruski hrt",
    "Sarloški vučjak","Slovački pastirski pas","Stari danski ptičar","Staroengleski ovčar",
    "Španjolski mastif","Španjolski hrt","Škotski jelenski hrt","Španjolski pointer","Švedski gonič losova","Švicarski bijeli ovčar",
    "Tibetanski mastif","Turski pastirski pas","Talijanski kratkodlaki ptičar","Talijanski oštrodlaki ptičar",
    "Urugvajski kimaron",
    "Vajmarski pričar","Veliki minsterland","Veliki plavi gaskonjski gonič","Veliki šnaucer","Veliki švicarski planinski pas","Veliki vendski grifon baset","Vidraš","Zlatni retriver"];
var filled = false;
var naslov,cijena,cijepljenje,vrsta,opis,file;
$(document).ready(function () 
{
    autocomplete(document.getElementById("vrsta"), dogs);
    
    loadLocationFields()
    
  
    if( localStorage.getItem("login")=="no"){
        $(':input[type="submit"]').prop("disabled",true)
        $("#loginalert").css("display","block");
    }
    else{
        $("#loginalert").css("display","none");
    }
    // Submit form data via Ajax
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
            }
          });
        }
    });
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
function logout(){
    localStorage.setItem("login","no")
    $("#login").show();
    $("#btnlogout").hide();
    location.reload();
}
var loadFile = function(event) {
    
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
    $("#tekstnaslici").text("")
  };

  function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }