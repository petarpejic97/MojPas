<!DOCTYPE html>
<html lang="hr">
<head>
    <title>Moj Pas</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="styles/navbar.css?rnd=132">
        <link rel="stylesheet" href="styles/index.css?rnd=132">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
</head>
<body>
    <script src = "frontendcode/loadnavbar.js"></script>    
    <div id="nav-placeholder"></div>
    <script src = "frontendcode/loadlogout.js"></script> 
    
    <div id="background">
        <div class="row searcher">
            <div class="input-group col-md-9">
            <span class="input-group-text" id="search-icon"><i class="fas fa-search text-white"
                aria-hidden="true"></i></span>
                <input class="form-control search" id="search" type="text" placeholder="Pretraži oglas..." aria-label="Search">
            </div>
            <button type="button" class="btn btn-primary col-md-3" id="btnnapravioglas" name="submit">Napravi oglas</button>
        </div>
    </div>

    <div class="container">
   <h2 style="text-align: center;">Aktualni oglasi</h2>
    <div class="row dog-list">
        <?php
            include 'backend/connectToDatabase.php';

            $conn = openConnection();

            error_reporting(E_ERROR | E_PARSE);

            $sql = "SELECT * FROM advertisement";
            $result = $conn->query($sql);
            if($result->num_rows > 0){
                while($row = $result->fetch_assoc()){ 
                    $dog = new stdClass();
                    $dog->id = $row["id"];
                    $dog->title = $row["title"];
                    echo '<div class="col-md-4 mb-1">';
                        echo '<div class="dog-box">';   
                            echo '<img class="dog-img" src="uploads/'.$row['filename'].'" alt="Dog Box 1">';
                        echo "</div>";
                        echo "<button id='title' class='btn mb-4 btn-lg'> $dog->title </button>";
                    echo "</div>";
                }
            }
                
        ?>
            
        </div>
    </div>

    <script src="frontendcode/index.js" type="text/javascript"></script>
</body>
</html>