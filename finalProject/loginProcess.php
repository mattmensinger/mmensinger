<?php
    
    session_start();

    include '../dbConnection.php';
    
    $conn = getDatabaseConnection("final_project");
    
    $username = $_POST['username'];
    $password = sha1($_POST['password']);
    
    $sql = "SELECT *
            FROM login
            WHERE username = :username
            AND password = :password";
    
    $np = array();
    $np[":username"] = $username;
    $np[":password"] = $password;
    
    $stmt = $conn->prepare($sql);
    $stmt->execute($np);
    $record = $stmt->fetch(PDO::FETCH_ASSOC);  //expecting one single record
    
    if(empty($record)) {
        
       
        echo "Wrong username or password!";
        
    }
    else {
        
        $_SESSION['adminName'] = $record['firstName'] . " " . $record['lastName'];
        header("Location:admin.php");
    }
    
?>