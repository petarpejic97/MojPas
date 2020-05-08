<?php

include 'connectToDatabase.php';

$conn = openConnection();

session_start();

$user= new stdClass();
$user->nickname = $_SESSION["nickname"];
$sql =" SELECT * FROM users WHERE nickname='".$user->nickname."'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $user= $row;
    }
}
echo (json_encode($user));
$conn->close();
?>