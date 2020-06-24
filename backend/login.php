<?php

include 'connectToDatabase.php';

$conn = openConnection();

session_start();

$email = $_POST['email'];
$password =substr(hash('sha512',$_POST['password']), 0,50) ;

$sql = "SELECT * FROM users where email = '".$email.
        "' and password = '".$password."'";

$result = $conn->query($sql);

$rs = mysqli_fetch_array($result);

if($result -> num_rows > 0){

    $_SESSION["email"] = $rs["email"];
    $_SESSION["nickname"] = $rs["nickname"];
    $_SESSION["phone"] = $rs["phone"];
    $_SESSION["drzava"] = $rs["state"];
    $_SESSION["login"] = "yes";    
    echo $_SESSION["nickname"];
}else{
    echo 0;
}

?>