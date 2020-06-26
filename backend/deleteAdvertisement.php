<?php
include 'connectToDatabase.php';

$conn = openConnection();

$title = $_POST['title'];

$sql = "DELETE FROM advertisement WHERE title='".$title."'";

if ($conn->query($sql)==TRUE && $conn->affected_rows > 0) {
    echo "record deleted";
} else {
    echo "Error: " . $query . "<br>" . $conn->error;
}

?>