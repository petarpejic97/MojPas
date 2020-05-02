<?php 

function conenctToDatabase(){
    $servername='localhost';
    $username='root';
    $password='';
    $dbname="web programiranje";
    //create connecton
    $conn = new mysqli($servername,$username,$password,$dbname);

    if($conn->connect_error)
        die ("Connect filed " . $conn->connect_error);
    else 
        return $conn;
}

$conn = conenctToDatabase();

$email = $_POST['email'];

$sql = "SELECT email FROM users WHERE email = '".$email."'";

$result = $conn->query($sql);

if($result -> num_rows > 0){
    echo "true";
}else{
    echo "false";
}

?>