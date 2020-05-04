<?php 
include 'connectToDatabase.php';

$conn = openConnection();

$nickname = $_POST['nickname'];

$sqlNickname = "SELECT nickname FROM users WHERE nickname = '".$nickname."'";

$result = $conn->query($sqlNickname);

if($result -> num_rows > 0){
    echo 0;
}
else{
    echo 1;
}

?>