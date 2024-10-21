<?php
$host = "localhost";
$username = "root";
$password = "";
$dbname = "issue9";
$conn = mysqli_connect($host, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
$result1=mysqli_query($conn, "SELECT username FROM identity");
$result2=mysqli_query($conn, "SELECT password FROM identity");
if(isset($_POST['username'])&&($_POST['password'])){
$f_name=$_POST['username'];
$f_pass=$_POST['password'];
  while($r=mysqli_fetch_assoc($result1) && $c=mysqli_fetch_assoc($result2)){
    if(($r==$f_name) && ($c==$f_pass)){
      console.log("login successful");
      if(isset($_POST['role'])=='HR'){
        header('Location:hr.php');
      }
      else{
        
        header('Location:emp.php');
      }

    }
  }
}
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>HR Management System</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
  <body>
<h1>index page</h1>
  </body>
</html>