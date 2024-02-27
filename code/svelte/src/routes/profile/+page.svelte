<script>
    import profile from '$lib/images/github.svg';
    import welcome from '$lib/images/svelte-welcome.png';

    // You would fetch these details from your backend or store
    let userProfile = {
        banner: welcome,
        profilePic: profile, 
        name: 'User Name',
        followersCount: 1234,
        photosCount: 56
    };

    let activePage = 'about';

    function setActivePage(page) {
        activePage = page;
    }
</script>

<style>
  .profile-banner {
    position: relative;
    height: 190px; /* Adjust as needed */
    background-size: cover;
    background-position: top;
    overflow: hidden;
  }
  
  .profile-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    padding: 1rem;
  }

  .profile-pic {
    width: 100px; /* Adjust as needed */
    height: 100px;
    border-radius: 50%;
    margin-right: 1rem;
    background: rgba(255, 255, 255, 0.7); /* Semi-transparent white background */
    backdrop-filter: blur(10px); /* Optional: to add a blur effect to the background content */
    padding: 0.5rem;
    border-radius: 0.5em;
  }

  .user-details h1 {
    margin: 0;
    padding: 0;
    background: rgba(255, 255, 255, 0.7); /* Semi-transparent white background */
    backdrop-filter: blur(10px); /* Optional: to add a blur effect to the background content */
    padding: 0.5rem;
    border-radius: 0.5em;
  }
  
  .stats {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 1rem;
    background: rgba(255, 255, 255, 0.7); /* Semi-transparent white background */
    backdrop-filter: blur(10px); /* Optional: to add a blur effect to the background content */
    padding: 0.5rem;
    border-radius: 0.5em;
  }
  
  .profile-nav ul {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
    background: #fff;
    margin: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .profile-nav li {
    padding: 1rem;
    cursor: pointer;
  }

</style>


<div class="profile-banner" style="background-image: url({userProfile.banner});">
  <div class="profile-info">
    <img class="profile-pic" src={userProfile.profilePic} alt={userProfile.name} />
    <div class="user-details">
      <h1>{userProfile.name}</h1>
      <ul class="stats">
        <li><strong>{userProfile.followersCount}</strong> followers</li>
        <li><strong>{userProfile.photosCount}</strong> photos</li>
      </ul>
    </div>
  </div>
</div>

<nav class="profile-nav">
  <ul>
    <li ahref='./about'>About</li>
    <li ahref='./albums'>Albums</li>
    <li ahref='./favorites'>Favorites</li>
  </ul>
</nav>
