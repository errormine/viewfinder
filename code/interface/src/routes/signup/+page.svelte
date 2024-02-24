<script>
    let fullName = '';
    let email = '';
    let username = '';
    let password = '';
    
    // Function to handle the sign-up logic
    function handleSignUp() {
      // Implement sign-up logic here
      console.log('Sign up with:', { fullName, email, username, password });
    }
  </script>
  
  <style>
    .signup-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh; /* Full height of the viewport */
    }
  
    .signup-box {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      width: 300px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  
    .signup-box input {
      width: 100%;
      margin-bottom: 1rem;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  
    .signup-box button {
      width: 100%;
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
      background-color: #5e5eb7;
      color: white;
      cursor: pointer;
    }
  
    .signup-box button:hover {
      background-color: #484580;
    }
  
    .login-link {
      display: block;
      text-align: center;
      margin-top: 1rem;
      color: #5e5eb7;
      text-decoration: none;
    }
  
    .login-link:hover {
      text-decoration: underline;
    }
  </style>
  
  <div class="signup-container">
    <div class="signup-box">
      <h2>Sign up for Website</h2>
      <input type="text" placeholder="Full Name" bind:value={fullName} />
      <input type="email" placeholder="Email address" bind:value={email} />
      <input type="text" placeholder="Username" bind:value={username} />
      <input type="password" placeholder="Password" bind:value={password} />
      <button on:click={handleSignUp}>Sign up</button>
      <a href="/login" class="login-link">Already a member? Log in</a>
    </div>
  </div>
  