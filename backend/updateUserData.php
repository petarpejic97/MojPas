<?php

include 'connectToDatabase.php';

$conn = openConnection();

session_start();

$nickname = $_POST['nickname'];
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$state = $_POST['state'];
$city = $_POST['city'];
$gender = $_POST['gender'];
$phone = $_POST['phone'];
$email = $_SESSION["email"];

$sql =" UPDATE users SET firstname= '".$firstname."',lastname= '".$lastname."',
        nickname= '".$nickname."',state= '".$state."',city= '".$city."',
        gender= '".$gender."',phone= '".$phone."' WHERE email = '".$email."'";
        
if($conn->query($sql) === TRUE){
    echo "succesfully";
}
else {
    echo "Error: " . $sql . "<br>" . $conn->error ;
}
$conn->close();
?>