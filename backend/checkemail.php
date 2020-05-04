<?php 

include 'connectToDatabase.php';

$conn = openConnection();

$email = $_POST['email'];

$sql = "SELECT email FROM users WHERE email = '".$email."'";

$result = $conn->query($sql);

if($result -> num_rows > 0){
    echo 0;
}else{
    echo 1;
}

?>