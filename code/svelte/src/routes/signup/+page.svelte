<script>
  import GoogleIcon from '$lib/images/GoogleLogo.png';
  import { goto } from '$app/navigation';

  let fullName = '';
  let email = '';
  let username = '';
  let password = '';
  
  // Function to handle the login logic
  function handleSignup() {
    // Implement sign up logic here
    console.log('Signup with:', { fullName, email, username, password });
    const isLoginSuccessful = true; // Replace with actual login check

    if (isLoginSuccessful) {
        // Navigate to the desired page on successful login
        goto('/feed');
    } else {
        // Handle login failure (e.g., show error message)
        console.error('Login failed');
    }
  }

	function handleGoogleSignUp() {
		// Implement login logic here
		console.log('Login with Google as', { email, password });
	}

</script>


<svelte:head>
	<title>Signup</title>
	<meta name="description" content="Signup Page" />
</svelte:head>

<div class="signup-container">
    <div class="signup-box">
      <h2>SignUp for Website</h2>
      <label for="fullName">Full Name:</label>
      <input id="fullName" type="text" bind:value={fullName} />
      <label for="email">Email:</label>
      <input id="email" type="email" bind:value={email} />
      <label for="username">Username:</label>
      <input id="username" type="text" bind:value={username} />
      <label for="password">Password:</label>
      <input id="password" type="password" bind:value={password} />
      <button on:click={handleSignup}>Sign Up</button>
      <button on:click={handleGoogleSignUp} class="google-signin-button">
        <img src={GoogleIcon} alt="Google sign-in" />
        Sign in with Google
      </button>
      <a href="/explore" class="skip">Skip login/signup</a>
      <a href="/" class="login-link">Already a member? Login</a>
    </div>
</div>

<style>
  /* Global override within a local component */
  :global(main.profile-page) {
    display: block;
    margin: 0;
  }
  
  .google-signin-button {
    background-color: #4285F4; /* Google's brand color */
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 2px;
    font-size: 16px;
    font-weight: bold;
    margin-top: 10px; /* Adjust as necessary */
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px; /* Space between icon and text */
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.25);
  }

  .google-signin-button img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }

  .google-signin-button:hover {
    box-shadow: 0 0 6px #4285F4;
  }

  .google-signin-button:active {
    background-color: #357ae8;
    box-shadow: inset 0 0 0 2px #ffffff;
  }
    .signup-box {
      background: white;
      padding: 1.5rem;
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

    h2 {
      color: #5e5eb7; /* Match the color of your button or theme */
      text-align: center;
      margin-top: -1em;
      margin-bottom: 1.5rem; /* Adjust spacing as needed */
      font-size: 1.5rem; /* Adjust size as needed */
      font-weight: 600; /* Adjust weight as needed */
    }

    label {
      display: block;
      margin-bottom: 0.2rem;
      color: #333; /* Or any color you prefer */
      font-size: 0.9rem; /* Match the size to your design */
      font-weight: 600; /* Make it bold to stand out like in the second image */
    }
  
    .signup-box {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      width: 300px; /* Or wider if you want to match the second image */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      position: relative; /* For absolute positioning of the h2 element */
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
  
    .skip {
      display: block;
      text-align: center;
      padding: 0.5rem;
      margin-top: 1rem;
      border-radius: 4px;
      background-color: #ff400086; /* --color theme 1 */
      color: white;
      cursor: pointer;
      text-decoration: none;
    }
  
    .skip:hover {
      background-color: #ff4000c2;
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