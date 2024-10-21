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

$result1=mysqli_query($conn, "SELECT * FROM emp");
$result2=mysqli_query($conn, "SELECT * FROM dept");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <title>HR Management System</title>
</head>
<body>
    <div class="container">
        <h3>Employee Management</h3>
<form action="hr.php">
    <label for="emp">Search Employee</label>
    <input type="searchbox" placeholder="Search by name" name="emp">
    <button type="button" class="btn btn-primary">Insert</button>
    <button type="button" class="btn btn-primary">Update</button>
    <button type="button" class="btn btn-danger">Delete</button>
</form>
    <table class="table table-dark">
        <thead>
          <tr>
          <th scope="col">No.</th>
            <th scope="col">Name</th>
            <th scope="col">Designation</th>
            <th scope="col">Department</th>
            <th scope="col">Salary</th>
            <th scope="col">Starting Date</th>
            <th scope="col">Personal Email</th>
            <th scope="col">Organization Email</th>
            <th scope="col">Phone no.</th>
            <th scope="col">Address</th>
          </tr>
        </thead>
        <?php
  while($r=mysqli_fetch_assoc($result1)){ ?>
        <tbody>
          <tr>
          <td><?php echo $r['emp_no']; ?></td>
          <td><?php echo $r['name']; ?></td>
          <td><?php echo $r['designation']; ?></td>
          <td><?php echo $r['dept']; ?></td>
          <td><?php echo $r['salary']; ?></td>
          <td><?php echo $r['emp_s_date']; ?></td>
          <td><?php echo $r['p_email']; ?></td>
          <td><?php echo $r['org_email']; ?></td>
          <td><?php echo $r['phone_num']; ?></td>
          <td><?php echo $r['address']; ?></td>
          </tr>
        </tbody>
        <?php
        }
        ?>
      </table>
      </div>


      <div class="container">
        <h3>Department Management</h3>
<form action="hr.php">
    <label for="emp">Search Department</label>
    <input type="searchbox" placeholder="Search by name" name="emp">
    <button type="button" class="btn btn-primary">Insert</button>
    <button type="button" class="btn btn-primary">Update</button>
    <button type="button" class="btn btn-danger">Delete</button>
</form>
    <table class="table table-dark">
        <thead>
          <tr>
          <th scope="col">Dept No.</th>
            <th scope="col">Name</th>
            <th scope="col">Chairman</th>
            <th scope="col">Dean</th>
          </tr>
        </thead>
        <?php
  while($r=mysqli_fetch_assoc($result2)){ ?>
        <tbody>
          <tr>
          <td><?php echo $r['dept_no']; ?></td>
          <td><?php echo $r['dept_name']; ?></td>
          <td><?php echo $r['dept_chairman']; ?></td>
          <td><?php echo $r['dept_dean']; ?></td>
          </tr>
        </tbody>
        <?php
        }
        ?>
      </table>
      </div>
</body>
</html>