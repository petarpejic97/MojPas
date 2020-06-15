
<?php

include 'connectToDatabase.php';

$conn = openConnection();

$state = $_POST["drzava"];
$city = $_POST["grad"];
$od = $_POST["od"];
$do = $_POST["do"];

//Sve po jedan
if(!empty($state) && empty($city) && empty($od) && empty($do)){
    $sql =" SELECT * FROM advertisement 
        WHERE state='".$state."'";
}
else if(empty($state) && !empty($city) && empty($od) && empty($do)){
    $sql =" SELECT * FROM advertisement 
        WHERE city='".$city."'";
}
else if(empty($state) && empty($city) && !empty($od) && empty($do)){
    $sql ="SELECT * FROM advertisement 
        WHERE price >='".$od."'";
}
else if(empty($state) && empty($city) && empty($od) && !empty($do)){
    $sql ="SELECT * FROM advertisement 
        WHERE price <='".$do."'";
}
//država i nešto(1)
else if(!empty($state) && !empty($city) && empty($od) && empty($do)){
    $sql ="SELECT * FROM advertisement 
        WHERE state='".$state."' AND city='".$city."'";
}    
else if(!empty($state) && empty($city) && !empty($od) && empty($do)){
    $sql ="SELECT * FROM advertisement 
        WHERE state='".$state."' AND price >='".$od."'";
} 
else if(!empty($state) && empty($city) && empty($od) && !empty($do)){
    $sql ="SELECT * FROM advertisement 
        WHERE state='".$state."' AND price <='".$do."'";
} 
//država i nešto(2)
else if(!empty($state) && !empty($city) && !empty($od) && empty($do)){
    $sql ="SELECT * FROM advertisement 
        WHERE state='".$state."' AND city ='".$city."' AND price >='".$od."' ";
}
else if(!empty($state) && !empty($city) && empty($od) && !empty($do)){
    $sql ="SELECT * FROM advertisement 
        WHERE state='".$state."' AND city ='".$city."' AND price <='".$do."' ";
}
else if(!empty($state) && empty($city) && !empty($od) && !empty($do)){
    $sql ="SELECT * FROM advertisement 
        WHERE state='".$state."' AND price >='".$od."' AND price <='".$do."'";
}
//city i nešto(1)
else if(empty($state) && !empty($city) && !empty($od) && empty($do)){
    $sql ="SELECT * FROM advertisement 
        WHERE city='".$city."' AND price >='".$od."'";
} 
else if(empty($state) && !empty($city) && empty($od) && !empty($do)){
    $sql ="SELECT * FROM advertisement 
        WHERE city='".$city."' AND price <='".$do."'";
} 
//city i nešto(2)
else if(empty($state) && !empty($city) && !empty($od) && !empty($do)){
    $sql ="SELECT * FROM advertisement 
        WHERE city='".$city."' AND price >='".$od."' AND price <='".$do."'";
} 
//od i nešto(1)
else if(empty($state) && empty($city) && !empty($od) && !empty($do)){
    $sql ="SELECT * FROM advertisement 
        WHERE price >='".$od."' AND price <='".$do."'";
} 
else if(!empty($state) && !empty($city) && !empty($od) && !empty($do)){
    $sql ="SELECT * FROM advertisement 
        WHERE state='".$state."' AND city='".$city."' AND price >='".$od."' AND price <='".$do."'";
}
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