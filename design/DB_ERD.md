**Entities:**

  **User (Entity)**
  
    **Attributes:**
     - UserID (PK)
     - Username
     - Password
     - Email
     - First Name
     - Last Name
     - Date of Birth
     - Profile Picture
    **Relationships:**
     - One-to-Many Relationship: One user can have many followers.
     - One-to-Many Relationship: One user can follow many other users.
     - One-to-Many Relationship: One user can create many posts.
     - One-to-Many Relationship: One user can receive many notifications.

  **Follower (Entity)**
  
    **Attributes:**
     - FollowerID (PK)
     - UserID (FK) - Foreign Key referencing User.UserID
     - FollowerUserID (FK) - Foreign Key referencing User.UserID
    **Relationships:**
     - Many-to-One Relationship: Many followers can follow one user.
     - Many-to-One Relationship: Many followers can be followers of one user.

  **Post (Entity)**
  
    **Attributes:**
     - PostID (PK)
     - UserID (FK) - Foreign Key referencing User.UserID
     - Image (or ImageURL if storing a reference to an image)
     - Description
     - Timestamp
     - IsShowcasePost (Boolean) - Indicates whether the post is part of the user's showcase.
    **Relationships:**
     - Many-to-One Relationship: Many posts can be created by one user.
     - One-to-Many Relationship: One post can have many comments.
     - One-to-Many Relationship: One post can have many likes.
     - One-to-Many Relationship: One post can have many saves.
     - One-to-Many Relationship: One post can generate many notifications.
     - Many-to-Many Relationship: Many posts can be associated with many tags.

  **Comment (Entity)**
  
    **Attributes:**
     - CommentID (PK)
     - PostID (FK) - Foreign Key referencing Post.PostID
     - UserID (FK) - Foreign Key referencing User.UserID
     - Content
     - Timestamp
    **Relationships:**
     - Many-to-One Relationship: Many comments can belong to one post.
     - Many-to-One Relationship: Many comments can be made by one user.
     - One-to-Many Relationship: One comment can have many replies.

  **Like (Entity)**
  
    **Attributes:**
     - LikeID (PK)
     - PostID (FK) - Foreign Key referencing Post.PostID
     - UserID (FK) - Foreign Key referencing User.UserID
     - Timestamp
    **Relationships:**
     - One-to-One Relationship: Each like is associated with one post and one user.

  **Reply (Entity)**
  
    **Attributes:**
     - ReplyID (PK)
     - CommentID (FK) - Foreign Key referencing Comment.CommentID
     - UserID (FK) - Foreign Key referencing User.UserID
     - Content
     - Timestamp
    **Relationships:**
     - Many-to-One Relationship: Many replies can belong to one comment.
     - Many-to-One Relationship: Many replies can be made by one user.

  **Favorite (Entity)**
  
    **Attributes:**
     - FavoriteID (PK)
     - PostID (FK) - Foreign Key referencing Post.PostID
     - UserID (FK) - Foreign Key referencing User.UserID
     - Timestamp
    **Relationships:**
     - Many-to-One Relationship: Many favorite entries can be associated with one user.
     - Many-to-One Relationship: Many favorite entries can be associated with one post.

  **Tag (Entity)**
  
    **Attributes:**
     - TagID (PK)
     - Name
    **Relationships:**
     - Many-to-Many Relationship: Many tags can be associated with many posts.

    **Notification (Entity)**
    
      **Attributes:**
       - NotificationID (PK)
       - UserID (FK) - Foreign Key referencing User.UserID
       - Type (e.g., 'Follow', 'Like', 'Save', 'Comment')
       - ActorUserID (FK) - Foreign Key referencing User.UserID, represents the user who performed the action (e.g., the user who followed, liked, saved, or commented)
       - PostID (FK, Optional) - Foreign Key referencing Post.PostID, the post associated with the action (if applicable)
       - Timestamp
      **Relationships:**
       - Many-to-One Relationship: Many notifications can be associated with one user.
       - Many-to-One Relationship: Many notifications can be associated with one post (if applicable).
       - Many-to-One Relationship: Many notifications can be associated with one actor user (e.g., the user who followed, liked, saved, or commented).
