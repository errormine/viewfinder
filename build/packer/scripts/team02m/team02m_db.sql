CREATE DATABASE team02m_db;
USE team02m_db;

-- COLUMNS in user, user_session which are snake_case are used for OAUTH2
CREATE TABLE user (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    DisplayName VARCHAR(255),
    DateOfBirth DATE,
    ProfilePicture VARCHAR(255),
    Bio TEXT,
    Website VARCHAR(255),
    Contact VARCHAR(255),
    JoinDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_session (
    id VARCHAR(255) PRIMARY KEY,
    expires_at DATETIME NOT NULL,
    user_id VARCHAR(255) NOT NULL REFERENCES user(id)
);

CREATE TABLE Photos (
    PhotoID INT AUTO_INCREMENT PRIMARY KEY,
    UserID VARCHAR(255) REFERENCES user(id),
    Title VARCHAR(255),
    Image VARCHAR(255),
    Description TEXT,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Albums (
    AlbumID INT AUTO_INCREMENT PRIMARY KEY,
    UserID VARCHAR(255) REFERENCES user(id),
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    CreatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE AlbumJunc (
    AlbumID INT REFERENCES Albums(AlbumID),
    ImageID INT REFERENCES Photos(PhotoID)
);

CREATE TABLE Comments (
    CommentID INT AUTO_INCREMENT PRIMARY KEY,
    ParentCommentID INT NULL REFERENCES Comments(CommentID),
    PhotoID INT REFERENCES Photos(PhotoID),
    UserID VARCHAR(255) REFERENCES user(id),
    Content TEXT,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Follows (
    UserID VARCHAR(255) REFERENCES user(id),
    FollowerID VARCHAR(255) REFERENCES user(id)
);

CREATE TABLE Favorites (
    UserID VARCHAR(255) REFERENCES user(id),
    PhotoID INT REFERENCES Photos(PhotoID),
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (UserID, PhotoID)
);
