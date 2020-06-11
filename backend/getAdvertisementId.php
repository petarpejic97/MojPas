<?php
include 'connectToDatabase.php';

$conn = openConnection();

$title = $_POST['title'];

$sql = "SELECT * FROM advertisement WHERE title='".$title."'";

$result = $conn->query($sql);

if($result->num_rows > 0){
    while($row = $result->fetch_assoc()){ 
        echo $row["id"];
    }
}

?>