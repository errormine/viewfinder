CREATE DATABASE team02m_db;
USE team02m_db;

CREATE TABLE user (
    id VARCHAR(255) PRIMARY KEY,
    google_id VARCHAR(255) NOT NULL UNIQUE,
    Email VARCHAR(255) NOT NULL UNIQUE,
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
    UserID VARCHAR(255),
    Image VARCHAR(255),
    Description TEXT,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES user(id)
);

CREATE TABLE Albums (
    AlbumID INT AUTO_INCREMENT PRIMARY KEY,
    UserID VARCHAR(255),
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    CreatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES user(id)
);

CREATE TABLE AlbumJunc (
    AlbumID INT,
    ImageID INT,
    FOREIGN KEY (AlbumID) REFERENCES Albums(AlbumID),
    FOREIGN KEY (ImageID) REFERENCES Photos(PhotoID)
);

CREATE TABLE Comments (
    CommentID INT AUTO_INCREMENT PRIMARY KEY,
    PhotoID INT,
    UserID VARCHAR(255),
    Content TEXT,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ParentCommentID INT NULL,
    FOREIGN KEY (PhotoID) REFERENCES Photos(PhotoID),
    FOREIGN KEY (UserID) REFERENCES user(id),
    FOREIGN KEY (ParentCommentID) REFERENCES Comments(CommentID)
);

CREATE TABLE Follows (
    UserID VARCHAR(255),
    FollowerID INT,
    FOREIGN KEY (UserID) REFERENCES user(id),
    FOREIGN KEY (FollowerID) REFERENCES user(id)
);

CREATE TABLE Favorites (
    UserID VARCHAR(255),
    PhotoID INT,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (UserID, PhotoID),
    FOREIGN KEY (UserID) REFERENCES user(id),
    FOREIGN KEY (PhotoID) REFERENCES Photos(PhotoID)
);