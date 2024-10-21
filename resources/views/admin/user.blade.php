<!DOCTYPE html>
<html lang="en">
<head>
  <title>My Muet</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  <style>
    /* Set height of the grid so .sidenav can be 100% (adjust as needed) */
    .row.content {height: 550px}
    
    /* Set gray background color and 100% height */
    .sidenav {
      background-color: #f1f1f1;
      height: 100%;
    }
        
    /* On small screens, set height to 'auto' for the grid */
    @media screen and (max-width: 767px) {
      .row.content {height: auto;} 
    }
  </style>
</head>
<body>

<nav class="navbar navbar-inverse visible-xs">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      <a class="navbar-brand" href="#">My Muet</a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">Dashboard</a></li>
        <li><a href="#departments">Departments</a></li>
        <li><a href="#employee">Employees</a></li>
        <li><a href="#">Geo</a></li>
      </ul>
    </div>
  </div>
</nav>

<div class="container-fluid">
  <div class="row content">
    <div class="col-sm-3 sidenav hidden-xs">
      <h2>My Muet</h2>
      <ul class="nav nav-pills nav-stacked">
        <li class="active"><a href="#section1">Dashboard</a></li>
        <li><a href="#departments">Departments</a></li>
        <li><a href="#employee">Employees</a></li>
        <li><a href="#user_uries">User Queries</a></li>
        <li><a href="#section3">Queries Tracking</a></li>
      </ul><br>
    </div>
    <br>
    
    <div class="col-sm-9">
      <div class="well">
        <h4>Dashboard</h4>
        <p>HR MANAGEMENT SYSTEM</p>
      </div>
      <div class="row">
        <div class="col-sm-3">
          <div class="well">
            <h4>DEPARTMENTS</h4>
            <p>1</p> 
          </div>
        </div>
        <div class="col-sm-3">
          <div class="well">
            <h4>EMPLOYEES</h4>
            <p>100 Million</p> 
          </div>
        </div>
        <div class="col-sm-3">
          <div class="well">
            <h4>QUIRIES PENDING</h4>
            <p>10 Million</p> 
          </div>
        </div>
      
      </div>
      <div class="row">
        <div class="col">
          <div class="well">
                <div
                    class="table-responsive"
                >
                    <h4 class ="text-center">DEPARTMENTS</h4>
                    <table
                        class="table table-primary"
                    >
                        <thead>
                            
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Dpt Name</th>
                                <th scope="col">Dpt Chairmane</th>
                                <th scope="col">Dpt Dean</th>
                                
                                <th scope="col">
                                    Actions
                                </th>
                            </tr>
                            
                        </thead>
                        <tbody>
                        @foreach($dpt as $dptinfo)
                            <tr class="">
                            <th scope="col">{{$dptinfo->Id}}</th>
                                <th scope="col">{{$dptinfo->Dpt_Name}}</th>
                                <th scope="col">{{$dptinfo->Dpt_Chairman}}</th>
                                <th scope="col">{{$dptinfo->Dpt_Dean}}</td>
                                <td><a href="#" class="btn btn-primary">Add</a></td>
                                <td><a href="#" class="btn btn-secondary">edit</a></td>
                                <td><a href="#" class="btn btn-danger">Delete</a></td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
                
          </div>
        </div>
        <div class="well" id = "employee">
          <div class="well">
          <div
                    class="table-responsive"
                >
          <h4 class ="text-center">Employees</h4>
                    <table
                        class="table table-primary"
                    >
                        <thead>
                            
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Emp Name</th>
                                <th scope="col">Emp Designation</th>
                                <th scope="col">Emp Salary</th>
                                <th scope="col">Emp department</th>
                                <th scope="col">Employment start date</th>
                                <th scope="col">Personal email</th>
                                <th scope="col">Organization</th>
                                <th scope="col">phone number</th>
                                <th scope="col">address</th>
                                <th scope="col">
                                    Actions
                                </th>
                            </tr>
                           
                        </thead>
                        <tbody>
                        @foreach ($Emp as $empinfo)
                            <tr class="">
                                <td>{{$empinfo->Emp_Name}}</td>
                                <td>{{$empinfo->Emp_Designation}}</td>
                                <td>{{$empinfo->Emp_Salary}}</td>
                                <td>{{$empinfo->Emp_Department}}</td>
                                <td>{{$empinfo->Employment_Start_Date}}</td>
                                <td>{{$empinfo->Personal_Email}}</td>
                                <td>{{$empinfo->Organization}}</td>
                                <td>{{$empinfo->Phone_Number}}</td>
                                <td>{{$empinfo->Address}}</td>
                                <td><a href="#" class="btn btn-primary">Add</a></td>
                                <td><a href="#" class="btn btn-secondary">edit</a></td>
                                <td><a href="#" class="btn btn-danger">Delete</a></td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table> 
</div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="well">
            <p>Text</p> 
            <p>Text</p> 
            <p>Text</p> 
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-8">
          <div class="well">
            <p>Text</p> 
          </div>
        </div>
        <div class="col-sm-4">
          <div class="well">
            <p>Text</p> 
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</body>
</html>
