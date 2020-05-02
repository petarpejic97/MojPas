<?php
 function connectToDatabase(){
    $servername='localhost';
    $username='root';
    $password='';
    $dbname="web programiranje";
    //create connecton
    $conn = new mysqli($servername,$username,$password,$dbname);
    //check connection
    if($conn->connect_error){
        die("Connection failed: " . $conn->connect_error);
    }
    else 
        return $conn;
}
    session_start();

    $conn = connectToDatabase();

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
        $_SESSION["city"] = $rs["city"];
        $_SESSION["login"] = ["yes"];

        echo "success";
    }else{
        echo "Prijava nije uspjela. Pokušajte ponovno.";
    }

?>