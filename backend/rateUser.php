<?php

include 'connectToDatabase.php';

$conn = openConnection();

session_start();

$rate = $_POST['rate'];
$rated_user = $_POST['rated_user'];

if(isset($_SESSION["nickname"])){
    $rated_by = $_SESSION["nickname"];

    $sql = "SELECT * FROM ratings WHERE rated_user='".$rated_user."' 
    AND rated_by='".$rated_by."'";

    $result = $conn->query($sql);

    if($result->num_rows > 0){
        $updateSql = "UPDATE ratings 
                    SET rate=$rate
                    WHERE rated_user='".$rated_user."' AND rated_by='".$rated_by."'";
        $conn->query($updateSql);
    }
    else{
        $sql = "INSERT INTO ratings(rated_user,rated_by,rate) 
        VALUES ('".$rated_user."','".$rated_by."','".$rate."')";
    
        if($conn->query($sql) === TRUE){
            echo "succesfully";
        }
        else {
            echo "Error: " . $sql . "<br>" . $conn->error ;
        }
    }
}
else{
    echo "0";
}


    
?>