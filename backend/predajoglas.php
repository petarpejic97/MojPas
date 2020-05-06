<?php

include 'connectToDatabase.php';


session_start(); 
$uploadDir = 'C:/xampp/htdocs/MojPas/uploads/'; 
$response = array( 
    'status' => 0, 
    'message' => 'Form submission failed, please try again.' 
); 
// If form is submitted 
if(isset($_POST['naslov']) || isset($_POST['cijena']) || isset($_POST['file'])){ 
    // Get the submitted form data 
    $naslov = $_POST['naslov']; 
    $vrsta = $_POST['vrsta']; 
    $cijena = $_POST['cijena']; 
    $cijepljen = $_POST['customRadio']; 
    $opis = $_POST['opis']; 
    $drzava = $_POST['drzava'];
    $grad = $_POST['grad'];
    $detaljlokacija = $_POST['detaljlokacija'];
    // Check whether submitted data is not empty 
    if(!empty($naslov) && !empty($cijena)){ 
        // Validate email 
        $uploadStatus = 1; 
            
        // Upload file 
        $uploadedFile = ''; 
        if(!empty($_FILES["file"]["name"])){ 
            // File path config 
            $fileName = basename($_FILES["file"]["name"]); 
            $targetFilePath = $uploadDir . $fileName; 
            $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION); 
            $uploadedFile = $fileName;
            // Allow certain file formats 
            $allowTypes = array('pdf', 'doc', 'docx', 'jpg', 'png', 'jpeg'); 
            if(in_array($fileType, $allowTypes)){ 
                // Upload file to the server 
                if(move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)){ 
                    $uploadedFile = $fileName; 
                    
                }else{ 
                    $uploadStatus = 0; 
                    $response['message'] = 'Sorry, there was an error uploading your file.'; 
                } 
            }else{ 
                $uploadStatus = 0; 
                $response['message'] = 'Sorry, only PDF, DOC, JPG, JPEG, & PNG files are allowed to upload.'; 
            } 
        
             
            if($uploadStatus == 1){ 
                // Include the database config file 
                $conn = openConnection();
                // Insert form data in the database 
                $insert = $conn->query("INSERT INTO advertisement (title,sort,price,vacinnation,description,state,city,locationDetail,filename,owner) VALUES ('".$naslov."','".$vrsta."','".$cijena."','".$cijepljen."','".$opis."','".$drzava."','".$grad."','".$detaljlokacija."','".$fileName."','".$_SESSION["nickname"]."')"); 
                echo $insert;
                if($insert){ 
                    $response['status'] = 1; 
                    $response['message'] = 'Form data submitted successfully!'; 
                } 
            } 
        } 
    }else{ 
         $response['message'] = 'Please fill all the mandatory fields .'; 
    } 
} 
 
// Return response 
echo json_encode($response);

?>