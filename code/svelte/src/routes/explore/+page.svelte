<script>
    import PostCard from '$lib/images/PostCard.svelte';
    import { getExploreData } from './getExploreData.js';
  
    let feedData = getExploreData();
  </script>
  
  <div class="feed-container">
    {#each feedData as post (post.id)}
      <PostCard {post} />
    {/each}
  </div>