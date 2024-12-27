<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-4">Login</h2>
      <p class="text-gray-500 mb-6">name , password input please</p>
      <form onSubmit={handleSubmit}>
        <div class="mb-4">
          <label htmlFor="email" class="block text-gray-700 text-sm font-bold mb-2">
            UserName :
          </label>
          <input
            type="text"
            id="username"
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder=""
            required
          />
        </div>
        <div class="mb-6">
          <label htmlFor="password" class="block text-gray-700 text-sm font-bold mb-2">
            Password :
          </label>
          <input
            type="password"
            id="password"
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder=""
            required
          />
        </div>
        <div class="flex items-center justify-between">
          <button
           @click="handleSubmit"
            class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
          >
            GO
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      param1: 0,
    };
  },
  methods: {
    async handleSubmit(){
      //e.preventDefault();
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
        location.href = "/";
      } else {
        alert("Invalid credentials.");
      }
    },
  },
}
</script>