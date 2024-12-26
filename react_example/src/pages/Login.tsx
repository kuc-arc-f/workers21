import renderLayout from './renderLayout';
//
export default function Page(props: any) { 
  //
  const htm = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login</title>
</head>
<body>
  <h1>Login</h1>
  <form id="loginForm">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required />
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required />
    <button type="submit">Login</button>
  </form>
  <script>
    document.getElementById("loginForm").addEventListener("submit", async (event) => {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
console.log("response=", response.ok);
      if (response.ok) {
        alert("Login successful!");
      } else {
        alert("Invalid credentials.");
      }
    });
  </script>
</body>
</html>
  `;
  return htm;
}
/*
src="/public/static/entry-client.js"
*/
