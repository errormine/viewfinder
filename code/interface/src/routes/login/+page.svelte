<script>
    let email = '';
    let password = '';
  
    // Function to handle the login logic
    function handleLogin() {
      // Implement login logic here
      window.location.href='http://localhost:5000/auth/google/';
      console.log('Login with:', { email, password });
    }
  </script>
  
  <style>

    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh; /* Full height of the viewport */
    }
  
    .login-box {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      width: 300px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  
    .login-box input {
      width: 100%;
      margin-bottom: 1rem;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  
    .login-box button {
      width: 100%;
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
      background-color: #5e5eb7;
      color: white;
      cursor: pointer;
    }
  
    .login-box button:hover {
      background-color: #484580;
    }
  
    .signup-link {
      display: block;
      text-align: center;
      margin-top: 1rem;
      color: #5e5eb7;
      text-decoration: none;
    }
  
    .signup-link:hover {
      text-decoration: underline;
    }
  </style>
  
  <div class="login-container">
    <div class="login-box">
      <h2>Log in to Website</h2>
      <input type="email" placeholder="Email address" bind:value={email} />
      <input type="password" placeholder="Password" bind:value={password} />
      <button on:click={handleLogin}>Log in</button>
      <a href="/signup" class="signup-link">Not a member? Sign up</a>
    </div>
  </div>
  