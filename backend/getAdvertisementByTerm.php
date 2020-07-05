<?php
include 'connectToDatabase.php';

$conn = openConnection();

$term = $_POST['term'];

$sql = "SELECT * FROM advertisement 
        WHERE title LIKE '%$term%' OR sort LIKE '%$term%' OR description LIKE '%$term%'";

$advertisements= Array();

$result = $conn->query($sql);

if($result->num_rows > 0){
    while($row = $result->fetch_assoc()){ 
        $advertisements[] = $row;
    }
    echo json_encode($advertisements);
}
else{
    echo 0;
}

$conn->close();
?>