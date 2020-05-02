
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

$nickname = $_POST['nickname'];

$sql = "SELECT nickname FROM users WHERE nickname = '".$nickname."'";

$result = $conn->query($sql);

if($result -> num_rows > 0){
    echo 0;
}else{
    echo 1;
}

?>