<script>
  import GoogleIcon from '$lib/images/GoogleLogo.png';
  import { goto } from '$app/navigation';

	let email = '';
  let password = '';

	// Function to handle the login logic
	function handleLogin() {
		// Implement login logic here
		console.log('Login with:', { email, password });
    const isLoginSuccessful = true; // Replace with actual login check

    if (isLoginSuccessful) {
        // Navigate to the desired page on successful login
        goto('/feed');
    } else {
        // Handle login failure (e.g., show error message)
        console.error('Login failed');
    }
	}


	function handleGoogleSignIn() {
		// Implement login logic here
    console.log('Login with Google as', { email, password });
    window.location.href='/auth/google/';
	}
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login Page" />
</svelte:head>

<main>
	<div class="login-container">
		<div class="login-box">
		  <h2>Login to Website</h2>
      <label for="email">Email address</label>
      <input id="email" type="email" bind:value={email} />
      <label for="password">Password</label>
      <input id="password" type="password" bind:value={password} />
		  <button on:click={handleLogin}>Log in</button>
      <button on:click={handleGoogleSignIn} class="google-signin-button">
        <img src={GoogleIcon} alt="Google sign-in" />
        Sign in with Google
      </button>
      <a href="/explore" class="skip">Skip login/signup</a>
		  <a href="/signup" class="signup-link">Not a member? Sign up</a>
		</div>
	</div>
</main>


<style>  
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
    .login-box {
      background: white;
      padding: 1.5rem;
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

    h2 {
      color: #5e5eb7; /* Match the color of your button or theme */
      text-align: center;
      margin-top: -0.5em;
      margin-bottom: 1.5rem; /* Adjust spacing as needed */
      font-size: 1.5rem; /* Adjust size as needed */
      font-weight: 600; /* Adjust weight as needed */
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333; /* Or any color you prefer */
      font-size: 0.9rem; /* Match the size to your design */
      font-weight: 600; /* Make it bold to stand out like in the second image */
    }
  
    .login-box {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      width: 300px; /* Or wider if you want to match the second image */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      position: relative; /* For absolute positioning of the h2 element */
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
