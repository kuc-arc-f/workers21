<script lang="ts">
//console.log("#about");
const handleSubmit = async function(){
  const usernameElem = document.getElementById("username") as HTMLInputElement;
  const passwordElem = document.getElementById("password") as HTMLInputElement;
  const emailElem = document.getElementById("email") as HTMLInputElement;
  let username = usernameElem ? usernameElem.value : null;
  let password = passwordElem ? passwordElem.value : null;
  let email = emailElem ? emailElem.value : null;
//return;
  const response = await fetch("/api/users/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password , email}),
  });
console.log("response=", response.ok);
  if (response.ok) {
    console.log("Login successful!");
    //alert("Login successful!");
    location.href = "/";
  } else {
    alert("Invalid User data.");
  }
} 
</script>

<!-- -->
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Signup</title>
  <link href="/main.css" rel="stylesheet">
</head>
<body>
  <div class="App">
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 class="text-2xl font-bold mb-4">SignUp</h2><p class="text-gray-500 mb-6">name , password input please</p>
        <form>
          <div class="mb-4">
            <label for="username" class="block text-gray-700 text-sm font-bold mb-2">UserName :</label>
            <input type="text" id="username" 
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="" required="">
          </div>
          <!-- email -->
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2">Email:</label><br />
            <input type="email" 
            required=""
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             name="email" id="email" />
          </div>

          <div class="mb-6">
            <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password :</label>
            <input type="password" id="password" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="" required="">
          </div>
          <div class="flex items-center justify-between">
            <button 
            on:click={handleSubmit}
            class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="button">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  
</body>
</html>

<style>
</style>
