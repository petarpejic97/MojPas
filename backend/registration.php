<?php 

    function connectToDatabase(){
        $servername='localhost';
        $username='root';
        $password='';
        $dbname="web programiranje";
        //create connecton
        $conn = new mysqli($servername,$username,$password,$dbname);
        //check connection
        if($conn->connect_error){
            die("Connection failed: " . $conn->connect_error);
        }
        else 
            return $conn;
    }

    $conn = connectToDatabase();

    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $nickname = $_POST['nickname'];
    $country = $_POST['state'];
    $city = $_POST['city'];
    $sex = $_POST['gender'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $password = hash('sha512',$_POST['password']);

    $sql = "INSERT INTO users(firstname,lastname,nickname,state,city,gender,email,phone,password) VALUES ('$firstname','$lastname','$nickname','$country','$city','$sex','$email','$phone','$password')";

    if($conn->query($sql) === TRUE){
        echo "succesfully";
    }
    else {
        echo "Error: " . $sql . "<br>" . $conn->error ;
    }
?>