<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HR Management System</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>HR Management System</h1>
        <form id="loginForm" action="index.php" method="post">
            <div style="display: flex;">
            <h4>Select role:<h4>
            <input type="radio" name="role" id="role" checked>
            <label for="role">HR</label>
            <input type="radio" name="role" id="role">
            <label for="role">Employee</label>
        </div>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            
            <button type="submit">Login</button>
        </form>
    </div>

</body>
</html>
