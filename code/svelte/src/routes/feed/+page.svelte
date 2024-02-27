<script>
    import PostCard from '$lib//images/PostCard.svelte';
    import { getRecentPostsFromFollowedUsers } from './getRecentPostsFromFollowedUsers.js';
  
    let feedData = getRecentPostsFromFollowedUsers();
  </script>
  
  <div class="feed-container">
    {#each feedData as post (post.id)}
      <PostCard {post} />
    {/each}
  </div>