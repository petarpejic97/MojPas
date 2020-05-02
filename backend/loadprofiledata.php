<?php

    // Include the database configuration file
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

?>