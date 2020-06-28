<!DOCTYPE html>
<html lang="hr">
<head>
    <title>Moj Pas</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="styles/navbar.css?rnd=132">
        <link rel="stylesheet" href="styles/oglas.css?rnd=132">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
</head>
<body>
    <script src = "frontendcode/loadnavbar.js"></script>    
    <div id="nav-placeholder"></div>

        <div class="container">
        <div class="row">
        <?php
            include 'backend/connectToDatabase.php';
            session_start();
            $conn = openConnection();

            error_reporting(E_ERROR | E_PARSE);
            $id = $_GET["id"];
            $sql = "SELECT * FROM advertisement WHERE id='".$id."'";
            $result = $conn->query($sql);
            if($result->num_rows > 0){
                while($row = $result->fetch_assoc()){ 
                    $dog = new stdClass();
                    $dog->title = $row["title"];
                    $dog->price = $row["price"];
                    $dog->sort = $row["sort"];
                    $dog->vacinnation = $row["vacinnation"];
                    $dog->state = $row["state"];
                    $dog->city = $row["city"];
                    if(isset($row["locationDetail"])){
                        $dog->locationDetail = "-";
                    }
                    else{
                        $dog->locationDetail =$row["locationDetail"];
                    }
                    $dog->filename = $row["filename"];
                    $dog->description = $row["description"];
                    $dog->owner = $row["owner"];

                }
            }
            $sql2 = "SELECT * FROM users WHERE nickname='".$dog->owner."'";
                $result2 = $conn->query($sql2);
                if($result2->num_rows > 0){
                    while($row2 = $result2->fetch_assoc()){ 
                        $user = new stdClass();
                        $user->nickname = $row2["nickname"];
                        $user->email = $row2["email"];
                        $user->mobilephone = $row2["phone"];
                    }
                }
            echo '<div class="col-lg-6 left-side">';
                echo '<h2>'.$dog->title.'</h2>';
                echo '<div class="price">Cijena:<b> '.$dog->price.'</b> €</div>';
                echo '<div class="sort">Vrsta psa:<b> '.$dog->sort.'</b></div>';
                echo '<div class="vacinnation">Cijepljen: <b> '.$dog->vacinnation.'</b></div>';
                echo '<div class="location-wrapper">
                        <label style="display:block">Lokacija:</label>
                        <div class="state-wrapper">
                            <label>Država </label>
                            <label>'.$dog->state.'</label>
                        </div>
                        <div class="city-wrapper">
                            <label>Grad </label>
                            <label>'.$dog->city.'</label>
                        </div>
                        <div class="detail-wrapper">
                            <label>Detaljnije o lokaciji </label>
                            
                            <label>'.$dog->locationDetail.'</label>
                        </div>
                </div>';
                echo '<div class="description">
                        <label>Opis:</label>
                        <div> '.$dog->description.'</div>
                    </div>';
            echo '</div>';
            echo '<div class="col-lg-6 right-side">';
            echo '<div class="image-wrapper">';
                echo '<img class="dog-img" src="uploads/'.$dog->filename.'" alt="Dog Box 1">';
            echo '</div>';
            echo    '<div class=contact-wrapper>
                        <div class="star-wrapper"><div>'.$user->nickname  .'</div>
                            <div class="user-rating">';

                            $sql = "SELECT * FROM ratings WHERE rated_user='".$user->nickname."'";

                            $result = $conn->query($sql);

                            $counter = 0;
                            $sum = 0;

                            if($result->num_rows > 0){
                                
                                while($row = $result->fetch_assoc()){
                                    $counter++;
                                    $sum += $row["rate"];
                                }
                               if(round($sum/$counter, 2) == 1){
                                    echo '<label><i class="fa fa-star" style="font-size:35px;color:red"></i></label>'.round($sum/$counter, 2)."/5";
                                }
                                else if(round($sum/$counter, 2) >1 && round($sum/$counter, 2) <= 2){
                                    echo '<label><i class="fa fa-star" style="font-size:35px;color:#ff6300"></i></label>'.round($sum/$counter, 2)."/5";
                                }
                                else if(round($sum/$counter, 2) >2 && round($sum/$counter, 2) <= 3){
                                    echo '<label><i class="fa fa-star" style="font-size:35px;color:#f6ff00"></i></label>'.round($sum/$counter, 2)."/5";
                                }
                                else if(round($sum/$counter, 2) >3 && round($sum/$counter, 2) <= 4){
                                    echo '<label><i class="fa fa-star" style="font-size:35px;color:#87c14e"></i></label>'.round($sum/$counter, 2)."/5";
                                }
                                else if(round($sum/$counter, 2) >4 && round($sum/$counter, 2) <= 5){
                                    echo '<label><i class="fa fa-star" style="font-size:35px;color:#15e016"></i></label>'.round($sum/$counter, 2)."/5";
                                }
                                //echo round($sum/$counter, 2);
                                
                            }
                            else{
                                echo '<label><i class="fa fa-star" style="font-size:35px;color:black"></i></label>0/5';
                            }
                        echo '</div>
                        </div>
                        <div class="ocjenite">Ocjenite oglašivača: </div>';
                        $sql = "SELECT * FROM ratings 
                        WHERE rated_user='".$user->nickname."' AND rated_by='".$_SESSION["nickname"]."'";

                        $result = $conn->query($sql);
                        
                        if($result->num_rows > 0){
                            $row = $result->fetch_assoc();
                             
                            echo '<div class="rating">';
                            
                            for($i=5; $i>0; $i--){
                                if($i == $row["rate"]){
                                    echo '<input type="radio" name="rating" value="'.$i.'" id="'.$i.'" checked>
                                <label for="'.$i.'">☆</label>';
                                }
                                else{
                                    echo '<input type="radio" name="rating" value="'.$i.'" id="'.$i.'">
                                    <label for="'.$i.'">☆</label>';
                                }
                                
                            }
                            echo '</div>';
                                 
                        }
                        else{
                            echo '<div class="rating">' ;
                            for($i=5; $i>0; $i--){
                                echo '<input type="radio" name="rating" value="'.$i.'" id="'.$i.'">
                                <label for="'.$i.'">☆</label>';
                            }
                            echo '</div>';
                        }
                        
                        echo '<div>Kontakt</div>
                        <div>'.$user->email.'</div>
                        <div>'.$user->mobilephone.'</div>
                    </div>
                </div>';
               
        ?>
        </div>
        </div>

    <script src="frontendcode/oglas.js" type="text/javascript"></script>
</body>
</html>