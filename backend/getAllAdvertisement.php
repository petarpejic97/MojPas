<?php

include 'connectToDatabase.php';

$conn = openConnection();

$sql =" SELECT * FROM advertisement";
        
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