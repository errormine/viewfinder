// Simulated placeholder data
const posts = [
    { id: 1, userId: 1, image: 'birds.jpg', caption: 'Beautiful sunset', createdAt: '2021-01-01', hashtags: ['#sunset'], user: {
        name: 'John Doe',
        profilePic: 'profile.png' 
      }},
    { id: 2, userId: 1, image: 'flower.jpg', caption: 'Majestic mountains', createdAt: '2021-01-02', hashtags: ['#mountains'], user: {
        name: 'John Doe',
        profilePic: 'profile.png' 
      }},
    { id: 3, userId: 2, image: 'birds.jpg', caption: 'Cute fox', createdAt: '2021-01-03', hashtags: ['#fox'], user: {
        name: 'John Doe',
        profilePic: 'profile.png' 
      }},
    // ...more posts
  ];
  
  // Function to get the most recent post from each user
  export function getRecentPostsFromFollowedUsers() {
    const recentPosts = new Map();
  
    posts.forEach(post => {
      const existingPost = recentPosts.get(post.userId);
      if (!existingPost || new Date(post.createdAt) > new Date(existingPost.createdAt)) {
        recentPosts.set(post.userId, post);
      }
    });
  
    return Array.from(recentPosts.values());
  }
  