var AdArray=[]
var currentAction;
var currentPage;
$(document).ready(function () 
{
    setTimeout(colorizeActionLink(), 100)

    loadLocationFields()

    if(localStorage.getItem("search")==""){
        loadData();
    }
    else{
        loadByTerm(localStorage.getItem("search"));
    }

    filterButton();
  
});
function setListenerOnA(){
    var page = document.querySelector("#pagination")
    var a = page.querySelectorAll("a")
    for (i = 0; i < a.length; i++) {
        a[i].addEventListener("click", function() {
            if(this.innerHTML == "&lt;&lt;"){
                if(currentAction==1){
                    return
                }
                else{
                    changePage(currentAction-2)
                }
            }
            else if(this.innerHTML=="&gt;&gt;"){
                if(currentAction==a.length-2){
                    return
                }
                else{
                    changePage(currentAction)
                }
            }
            else{
                changePage(this.innerHTML-1)
            }
        });
    }
}
function changePage(number){
    loadContent(number)
    colorizePanination(number)
    scrollOnTop();
}
function scrollOnTop(){
    let element = document.querySelector(".content-wrapper")
    element.scrollTop = 0; 
}
function colorizePanination(number){
    let pages = document.querySelector(".pagination")
    let as = pages.querySelectorAll("a")

    as[number+1].setAttribute("class","active")

    as[currentAction].removeAttribute("class")

    currentAction = number+1
}
function loadContent(number){
    $(".advertisement-wrapper").empty()
    
    var ad_wrapper = document.querySelector(".advertisement-wrapper")
    for(let i=0;i<AdArray[number].length;i++){
        let advertisement=document.createElement('div')
        advertisement.setAttribute("class","advertisement")
        advertisement.style.border="1px solid grey"
        advertisement.style.display="flex";
        advertisement.style.height = "200px"
        advertisement.style.width ="100%"
        advertisement.style.marginBottom = "20px"

        let img = document.createElement("img")
        img.setAttribute("src","./uploads/"+AdArray[number][i].filename)
        img.style.width="150px"
        img.style.height="150px"
        img.style.objectFit="cover"
        img.style.margin="10px"
        advertisement.appendChild(img)

        let info_container = document.createElement('div')
        info_container.setAttribute("class","info-container")
        info_container.style.width="100%"
        info_container.style.overflow="hidden"
        info_container.style.textOverflow="ellipsis"
        info_container.style.margin = "10px"

        let title = document.createElement('h5')
        title.innerHTML=AdArray[number][i].title

        let price = document.createElement('div')
        price.innerHTML="Cijena: <b>"+AdArray[number][i].price +"</b>€"

        let description = document.createElement('div')
        description.innerHTML="Opis: "+AdArray[number][i].description
        
        info_container.appendChild(title)
        info_container.appendChild(price)
        info_container.appendChild(description)

        advertisement.appendChild(info_container)
        ad_wrapper.appendChild(advertisement)
    }
    setListenerOnTitles()
}
function setNickInNavBar(nickname){
    document.getElementById("navbarDropdownMenuLink").innerHTML = nickname;
}
function colorizeActionLink(){
    document.getElementById("pregledoglasa").setAttribute("class", "active");
}
function loadLocationFields(){
    $("#states").change(function () 
      {
          var val = $(this).val();
  
          if (val == "Hrvatska") 
          {    

              $("#city").html("<option value=''>-- Odaberite grad --</option>\
              <option value='Zagreb'>  Zagreb</option>\
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
            $("#city").html("<option value=''>-- Odaberite grad --</option>\
              <option value='Sarajevo'>  Sarajevo</option>\
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
            $("#city").html("<option value=''>-- Odaberite grad --</option>\
              <option value='Beograd'>Beograd</option>\
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
            $("#city").html("<option value=''>-- Odaberite grad --</option>\
              <option value='Ljubljana'>  Ljubljana</option>\
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
function loadByTerm(term){
    $.ajax({
        type: "POST",
        url: "./backend/getAdvertisementByTerm.php",
        data:{term:term},
        success: function(response)
        {
          var advertisements = JSON.parse(response)
          var pageNumber = Math.trunc((advertisements.length/10)+1);
          
          var AdCounter=0;
          
          var tempArray=[];
          for(let i = 0; i< advertisements.length; i++){
                if(AdCounter==10){
                    AdArray.push(tempArray)
                    AdCounter=0
                    tempArray=[];
                }
                if(i==advertisements.length-1){
                    AdArray.push(tempArray)
                }
            AdCounter++
            tempArray.push(advertisements[i])
            }
        createPage(pageNumber)
        }
    })
}
function loadData(){

    $.ajax({
        type: "GET",
        url: "./backend/getAllAdvertisement.php",
        success: function(response)
        {
          var advertisements = JSON.parse(response)
          var pageNumber = Math.trunc((advertisements.length/10)+1);
          
          var AdCounter=0;
          
          var tempArray=[];
          for(let i = 0; i< advertisements.length; i++){
                if(AdCounter==10){
                    AdArray.push(tempArray)
                    AdCounter=0
                    tempArray=[];
                }
                if(i==advertisements.length-1){
                    AdArray.push(tempArray)
                }
            AdCounter++
            tempArray.push(advertisements[i])
        }
        createPage(pageNumber)
    }
    })
}
function createPage(pageNumber){
    $('.pagination').empty();
    let pagination= document.querySelector(".pagination")
    let a = document.createElement("a")
    a.innerText="<<";
    pagination.appendChild(a)
    for(let i = 0;i<pageNumber;i++){
        let a = document.createElement("a")
        a.innerText=i+1;
        pagination.appendChild(a)
        if(i==0){
            a.setAttribute("class","active")
        }
    }
    a = document.createElement("a")
    a.innerText=">>";
    pagination.appendChild(a)
    currentAction=1
    loadContent(0)
    
    setListenerOnA();
}

function setListenerOnTitles(){
    var h5 = document.querySelectorAll("h5")

    for (i = 0; i < h5.length; i++) {
        h5[i].addEventListener("click", function() {
            $.ajax({
                type:'POST',
                url:'./backend/getAdvertisementId.php',
                data:{title:this.innerHTML},
                success : function(response){
                    window.location.href = "http://localhost/mojpas/oglas.php?id="+response;
                }
            })
        });
    }
}
function checkForm(){
    let state = $("#states").val()
    let city = $("#city").val()
    let od = $("#od").val()
    let do2 = $("#do").val()

    if(state=="" && city=="" && od=="" && do2 ==""){
        return true;
    }
    else return false
     
}
function filterButton(){
    $("#filter-form").on('submit', function(e){
        e.preventDefault();
        e.stopPropagation();
        if(checkForm()){
            $("#fieldAlert").css("display","block")
        }
        else{
            $("#fieldAlert").css("display","none")
            $.ajax({
                type: "POST",
                url: "./backend/filterAdvertisement.php",
                data: new FormData(this),
                processData: false,
                contentType: false,
                success:function(response){
                    if(response==0){
                        setPaginationAndAdversimentVisibliti("none","none","block")
                    }
                    else{
                        setPaginationAndAdversimentVisibliti("block","block","none")
                        var advertisements = JSON.parse(response)
                        AdArray=[]
                        var pageNumber = advertisements.length/10
                        if(!Number.isInteger(pageNumber)){
                            pageNumber = Math.trunc((advertisements.length/10))+1
                        }
                        console.log(pageNumber)

                        var AdCounter=0;
                        
                        var tempArray=[];
                        for(let i = 0; i< advertisements.length; i++){
                                if(AdCounter==10){
                                    AdArray.push(tempArray)
                                    AdCounter=0
                                    tempArray=[];
                                }
                                if(i==advertisements.length-1){
                                    AdArray.push(tempArray)
                                }
                            AdCounter++
                            tempArray.push(advertisements[i])
                        }
                        console.log(AdArray)
                        createPage(pageNumber)
                    }
                }
            });
        }
    })
}
function setPaginationAndAdversimentVisibliti(adswrapper,pag,noads){
    $(".advertisement-wrapper").css("display",adswrapper)
    $(".pagination").css("display",pag)
    $(".no-advertisements").css("display",noads)
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
    