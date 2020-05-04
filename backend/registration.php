<?php 

    include 'connectToDatabase.php';

    $conn = openConnection();

    $nickname = $_POST['nickname'];
    $email = $_POST['email'];
    $password = hash('sha512',$_POST['password']);

    $sql = "INSERT INTO users(nickname,email,password) VALUES ('$nickname','$email','$password')";

    if($conn->query($sql) === TRUE){
        echo "succesfully";
    }
    else {
        echo "Error: " . $sql . "<br>" . $conn->error ;
    }
?>