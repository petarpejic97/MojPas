<?php

include 'connectToDatabase.php';

$conn = openConnection();

session_start();

$oldpass =substr(hash('sha512',$_POST['oldpass']), 0,50) ;
$newpass = $_POST['newpass'];
$againpass = $_POST['againpass'];

$sql ="SELECT * FROM users WHERE
        password='".$oldpass."' AND email='".$_SESSION["email"]."'";
        
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    if($newpass == $againpass){
        $haspass =  hash('sha512',$newpass);
        $sql =" UPDATE users SET password= '".$haspass."'
             WHERE email = '".$_SESSION["email"]."'";
        if($conn->query($sql) === TRUE){
            echo "succesfully";
        }
    }
    else{
        echo "error 1";
    }
}
else{
    echo "error 0" ;
}
$conn->close();
?>