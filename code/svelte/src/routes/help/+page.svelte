<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<div class="container">
  <div class="white-box">
    <h2>Help</h2>
    <p>Getting Started</p> 
        <p>
            - <a href="/login">**Creating an Account**:</a> Learn how to create an account and set up your profile. <br>
            - <a href="/feed">**Navigating the Platform**:</a> Understand the basic layout of our platform and learn how to navigate.
        </p>
    <p>Account & Settings</p>
        <p>
            - <a href="/settings">**Managing Your Account**:</a> Learn how to change your settings, including your password and email. <br>
            - <a href="/settings">**Privacy Settings**:</a> Understand how to manage who can see your posts and profile information.
        </p>
    <p>Posting & Interacting</p>
        <p>
            <a href="/upload">- **Creating a Post**:</a> Learn how to create a post and use all the features available. <br>
            <a href="/photo/1">- **Commenting and Liking**:</a> Learn how to interact with other users' posts.
        </p>
    <p>Troubleshooting</p>
      	<p>
            - <a href="/login">**Login Issues**:</a> Get help if you're having trouble logging in. <br>
            - <a href="/photo/1">**Reporting a Problem**:</a> Learn how to report a problem or inappropriate content.
        </p>
    <p>Safety & Policies</p>
      	<p>
            - <a href="/terms-and-conditions">**Community Guidelines**:</a> Understand the rules you need to follow to keep our community safe. <br>
            - <a href="/terms-and-conditions">**Reporting Abuse**:</a> Learn how to report someone who is violating our terms of service.
        </p>
      <p>For any other questions or issues, please contact our support team at <a href="/settings">L_Bozo@makeanemail.com</a></p>
  </div>
</div>


<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150vh;
  }

  .white-box {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 400px
  }
</style>
