**User Table:**

    CREATE TABLE User (
        UserID INT AUTO_INCREMENT PRIMARY KEY,
        Username VARCHAR(255) NOT NULL UNIQUE,
        PasswordHash VARCHAR(255) NOT NULL, -- Store password securely
        Email VARCHAR(255) NOT NULL UNIQUE,
        FirstName VARCHAR(255),
        LastName VARCHAR(255),
        DateOfBirth DATE,
        ProfilePicture VARCHAR(255),
        Bio TEXT,
        Website VARCHAR(255),
        JoinDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

**Relationships:**
 - One-to-Many with Photo Table: A user can post multiple photos, but each photo is associated with only one user.
 - One-to-Many with Album Table: A user can create multiple albums, but each album belongs to one user.
 - One-to-Many with Comment Table: A user can make multiple comments, but each comment is made by one user.
 - One-to-Many/Many-to-One with Follower Table: The Follower table represents a many-to-many relationship between users, but it's implemented as two one-to-many relationships. Each user can follow many users, and each user can be followed by many users.
 - One-to-Many with Favorite Table: A user can favorite many photos, and this relationship is tracked in the Favorite table.

**Photo Table:**

    CREATE TABLE Photo (
        PhotoID INT AUTO_INCREMENT PRIMARY KEY,
        UserID INT,
        Image VARCHAR(255),
        Description TEXT,
        Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (UserID) REFERENCES User(UserID)
    );

**Relationships:**
 - Many-to-One with User Table: Each photo is posted by one user.
 - Many-to-Many with Album Table: Photos can belong to many albums, and albums can contain many photos. This relationship is managed through the AlbumPhoto junction table.
 - One-to-Many with Comment Table: A photo can have many comments.
 - Many-to-Many with User Table (Favorites): Users can favorite many photos, and photos can be favorited by many users, managed by the Favorite table.

**Album Table:**

    CREATE TABLE Album (
        AlbumID INT AUTO_INCREMENT PRIMARY KEY,
        UserID INT,
        Name VARCHAR(255) NOT NULL,
        Description TEXT,
        CreatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (UserID) REFERENCES User(UserID)
    );

**Relationships:**
 - Many-to-One with User Table: Each album is created by one user.
 - Many-to-Many with Photo Table: Albums can contain many photos, and photos can belong to many albums. (Note: May need a junction table)

**Album Junction:**

        CREATE TABLE AlbumJunc (
            AlbumID INT,
            ImageID INT,
            FOREIGN KEY (AlbumID) REFERENCES Album(AlbumID),
            FOREIGN KEY (ImageID) REFERENCES Image(ImageID)
        );

**Relationships:**
 - Associate multiple images with an album.

**Comment Table:**

    CREATE TABLE Comment (
        CommentID INT AUTO_INCREMENT PRIMARY KEY,
        PhotoID INT,
        UserID INT,
        Content TEXT,
        Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ParentCommentID INT NULL,
        FOREIGN KEY (PhotoID) REFERENCES Photo(PhotoID),
        FOREIGN KEY (UserID) REFERENCES User(UserID),
        FOREIGN KEY (ParentCommentID) REFERENCES Comment(CommentID)
    );

**Relationships:**
 - Many-to-One with Photo Table: Each comment is associated with one photo.
 - Many-to-One with User Table: Each comment is made by one user.
 - Self-Referencing One-to-Many/Many-to-One (for replies): A comment can be a reply to another comment, creating a hierarchical structure of comments.

**Follower Table:**

    CREATE TABLE Follower (
        FollowerID INT AUTO_INCREMENT PRIMARY KEY,
        UserID INT,
        FollowerUserID INT,
        Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(UserID, FollowerUserID),
        FOREIGN KEY (UserID) REFERENCES User(UserID),
        FOREIGN KEY (FollowerUserID) REFERENCES User(UserID)
    );

**Relationships:**
 - Many-to-One with User Table (UserID): Each follow relationship has one user who is following.
 - Many-to-One with User Table (FollowerUserID): Each follow relationship has one user who is being followed. Although it involves the same User table, these relationships track different aspects (following and followers).

**Favorite Table:** (We could also create an automatic "Favorites" album, this has limitations however)

    CREATE TABLE Favorite (
        UserID INT,
        PhotoID INT,
        Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (UserID, PhotoID),
        FOREIGN KEY (UserID) REFERENCES User(UserID),
        FOREIGN KEY (PhotoID) REFERENCES Photo(PhotoID)
    );

**Relationships:**
 - Many-to-One with User Table: Each favorite record is associated with one user.
 - Many-to-One with Photo Table: Each favorite record is associated with one photo.
