<?php
session_start();
include 'connectToDatabase.php';

$conn = openConnection();

if($_SESSION["email"]=="petar@gmail.com"){
    $sql =" SELECT * FROM advertisement ";
}
else{
    $sql =" SELECT * FROM advertisement WHERE owner='".$_SESSION["nickname"]."'";
}

        
$advertisements= Array();

$result = $conn->query($sql);

if($result->num_rows > 0){
    while($row = $result->fetch_assoc()){ 
        $advertisements[] = $row;
    }
}
echo json_encode($advertisements);
$conn->close();
?>