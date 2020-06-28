<script src="frontendcode/navbarFunctions.js"></script>
<nav class="navbar navbar-expand-md">
    <div class="navbar-header">
        <a class="navbar-brand" href="./index.php">MojPas</a>
    </div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigationBar">
        <span class="fas fa-align-justify" style="color:white">
        </span>
    </button>
      <div class="collapse navbar-collapse" id="navigationBar">
        <div class="container-fluid">
            <ul class="nav navbar-nav navbar-left">
                <li id="index"><a href="./index.php">Početna</a></li>
                <li id="pregledoglasa"><a href="pregledoglasa.html" >Pregled oglasa</a></li>
                <li id="predajoglas"><a href="./predajoglas.html">Predaj oglas</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right " >
            <?php
                  session_start();
                  if(isset($_SESSION["nickname"])){
                    if($_SESSION["nickname"] !=""){
                      $out = '<li class="dropdown" id="dropdown">
                      <a class="dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                          '.$_SESSION["nickname"].'
                      </a>
                      <div class="dropdown-menu">
                          <a class="dropdown-item" href="./profil.html">Profil</a>
                          <a class="dropdown-item" href="./mojioglasi.html">Moji oglasi</a>
                          <a class="dropdown-item" onclick=logout() href="#">Odjava</a>
                      </div>
                      </li>';
                    }
                    else{
                      $out ='<li id="login"><a href="./login.html"><span><i class="fas fa-sign-in-alt"></i>Prijava</span></a></li>';
                    }
                  }
                  else{
                      $out ='<li id="login"><a href="./login.html"><span><i class="fas fa-sign-in-alt"></i>Prijava</span></a></li>';
                  }
                  echo $out;
              ?>
              
                <li id="registracija"><a href="./registration.html"><span><i class="fas fa-user"></i>Registracija</a></span></li>
            </ul>
        </div>
      </div>
</nav>

    