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
  // Props passed into the component, expected from parent
  export let post;

</script>

<style>
  .post-card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin: 2rem auto;
    overflow: hidden;
  }


  .user-info {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #eee;
  }

  .profile-pic {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 1rem;
    object-fit: cover;
  }

  .post-image {
    width: 100%;
    display: block;
  }

  .post-image img {
    width: 100%;
    display: block;
  }

  .caption-and-tags {
    padding: 1rem;
  }

  .caption {
    margin-bottom: 0.5rem;
  }

  .hashtags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .hashtag {
    color: #007bff;
    text-decoration: none;
  }
</style>

<div class="post-card">
  <div class="user-info">
    <!-- src={`/lib/${post.user.profilePic}`} -->
    <img class="profile-pic" src={profile} alt={`Profile picture of ${post.user.name}`} />
    <div>
      <div><strong>{post.user.name}</strong></div>
      <div class="post-meta">{post.createdAt}</div>
    </div>
  </div>
  <div class="post-image">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img src={`/${post.image}`} alt="Post Image" />
  </div>
  <div class="caption-and-tags">
    <div class="caption">{post.caption}</div>
    <div class="hashtags">
      {#each post.hashtags as hashtag}
        <a class="hashtag" href={`/tags/${hashtag.substring(1)}`}>{hashtag}</a>
      {/each}
    </div>
  </div>
</div>
