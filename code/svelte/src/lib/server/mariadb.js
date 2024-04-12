import mariadb from 'mariadb';
import * as placeholders from '$lib/server/db-placeholders';
import { NO_DB, DB_HOST, DB_PORT, DB_USER, DB_PASS } from '$env/static/private';
import { DB_REPLICA, READ_FROM_REPLICA } from '$env/static/private';

console.log(`DB_HOST: ${DB_HOST}, DB_USER: ${DB_USER}`);
console.log(`USING REPLICA: ${READ_FROM_REPLICA}`); 

/*
Make sure the database has correct privileges before connecting.
This example is not secure, but it's just for testing purposes.

CREATE USER 'your_username'@'host' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON your_database.* TO 'your_username'@'host';
FLUSH PRIVILEGES;

host = DB_HOST
your_username = DB_USER
your_password = DB_PASS

*/

const pool = mariadb.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
    database: "team02m_db"
});

export let DEV_MODE = process.env.NODE_ENV === 'development' && NO_DB === 'true';

export async function performQuery(query, param, from = "primary") {
    let conn;

    try {
        conn = await pool.getConnection();

        return conn.query(query, param)
            .then(rows => {
                return rows;
            })
            .catch(err => {
                return err;
            });
    } catch (err) {
        return err;
    } finally {
        if (conn) conn.end();
    }
}

export async function getSingleRow(query, param, from) {
    return performQuery(query, param, from)
        .then(rows => {
            return rows[0];
        })
        .catch(err => {
            console.log("QUERY FAILED: " + query);
            return err;
        });
}

export async function getSingleValue(query, param, from) {
    return getSingleRow(query, param, from)
        .then(res => {
            return Object.values(res)[0];
        })
        .catch(err => {
            console.log("QUERY FAILED: " + query);
            return err;
        });
}

// User Profile ABOUT
export async function getUserId(username) {
    if (DEV_MODE) return placeholders.userId;
    return getSingleValue("SELECT id FROM user WHERE Username = ?", [username], "replica");
}

export async function getUsername(userId) {
    if (DEV_MODE) return placeholders.username;
    return getSingleValue("SELECT Username FROM user WHERE id = ?", [userId], "replica");
}

export async function getProfilePicture(userId) {
    if (DEV_MODE) return "/images/pfp128.jpg";

    const picture = await getSingleValue("SELECT ProfilePicture FROM user WHERE id = ?", [userId], "replica");

    if (picture === null) {
        return "/images/pfp128.jpg";
    }

    return picture;
}

export async function getDisplayName(userId) {
    if (DEV_MODE) return placeholders.displayName;
    return getSingleValue("SELECT DisplayName FROM user WHERE id = ?", [userId], "replica");
}

export async function getPhotosCount(userId) {
    if (DEV_MODE) return placeholders.photos.length;
    return getSingleValue("SELECT COUNT(*) FROM Photos WHERE UserID = ?", [userId], "replica");
}

export async function getFollowersCount(userId) {
    if (DEV_MODE) return 0;
    return getSingleValue("SELECT COUNT(*) FROM Follows WHERE UserID = ?", [userId], "replica");
}

export async function getFollowingCount(userId) {
    if (DEV_MODE) return 0;
    return getSingleValue("SELECT COUNT(*) FROM Follows WHERE FollowerID = ?", [userId], "replica");
}

export async function getWebsite(userId) {
    if (DEV_MODE) return placeholders.website;
    return getSingleValue("SELECT Website FROM user WHERE id = ?", [userId], "replica");
}

export async function getContact(userId) {
    if (DEV_MODE) return placeholders.contact;
    return getSingleValue("SELECT Contact FROM user WHERE id = ?", [userId], "replica");
}

export async function getLocation(userId) {
    if (DEV_MODE) return placeholders.location;
    return getSingleValue("SELECT Location FROM user WHERE id = ?", [userId], "replica");
}

export async function getJoinDate(userId) {
    if (DEV_MODE) return placeholders.joinDate;
    return getSingleValue("SELECT JoinDate FROM user WHERE id = ?", [userId], "replica");
}

export async function getBio(userId) {
    if (DEV_MODE) return placeholders.bio;
    return getSingleValue("SELECT Bio FROM user WHERE id = ?", [userId], "replica");
}

export async function getUserAlbums(userId) {
    if (DEV_MODE) return placeholders.albums;
    return performQuery("SELECT * FROM Albums WHERE UserID = ?", [userId], "replica");
}

export async function updateBio(userId, bio) {
    return performQuery("UPDATE user SET Bio = ? WHERE id = ?", [bio, userId]);
}

// User Profile PHOTOS
export async function getPhotos(userId) {
    if (DEV_MODE) return placeholders.photos;
    // TODO: Pagination
    return performQuery("SELECT * FROM Photos WHERE UserID = ? LIMIT 10", [userId], "replica");
}

export async function getRecentPhotos(userId, amount = 4) {
    if (DEV_MODE) return placeholders.photos;
    return performQuery("SELECT * FROM Photos WHERE UserID = ? ORDER BY Timestamp DESC LIMIT ?", [userId, amount], "replica");
}

// User Profile ALBUMS
export async function getAlbums(userId) {
    if (DEV_MODE) return placeholders.albums;
    return performQuery("SELECT * FROM Albums WHERE UserID = ?", [userId], "replica");
}

// User Profile FAVORITES
export async function getFavorites(userId) {
    if (DEV_MODE) return placeholders.photos;
    return performQuery("SELECT * FROM Photos WHERE PhotoID IN (SELECT PhotoID FROM Favorites WHERE UserID = ?)", [userId], "replica");
}

// User Interactions
export async function followUser(userId, followerId) {
    return performQuery("INSERT INTO Follows (UserID, FollowerID) VALUES (?, ?)", [userId, followerId]);
}

export async function unfollowUser(userId, followerId) {
    return performQuery("DELETE FROM Follows WHERE UserID = ? AND FollowerID = ?", [userId, followerId]);
}

export async function isFollowing(userId, followerId) {
    let following = await getSingleValue("SELECT COUNT(*) FROM Follows WHERE UserID = ? AND FollowerID = ?", [userId, followerId], "replica");

    return following > 0;
}

// View album page
export async function getAlbum(albumId) {
    if (DEV_MODE) return placeholders.albums[0];
    return getSingleRow("SELECT * FROM Albums WHERE AlbumID = ?", [albumId], "replica");
}

export async function getAlbumPhotos(albumId) {
    if (DEV_MODE) return placeholders.photos;
    return performQuery("SELECT * FROM Photos WHERE PhotoID IN (SELECT PhotoID FROM AlbumJunc WHERE AlbumID = ?)", [albumId], "replica");
}

// View photo page
export async function getPhoto(photoId) {
    if (DEV_MODE) return placeholders.photos[0];
    return getSingleRow("SELECT * FROM Photos WHERE PhotoID = ?", [photoId], "replica");
}

export async function getPhotoCreatorId(photoId) {
    if (DEV_MODE) return placeholders.userId;
    return getSingleValue("SELECT UserID FROM Photos WHERE PhotoID = ?", [photoId], "replica");
}

export async function getAlbumsByPhoto(photoId) {
    if (DEV_MODE) return placeholders.albums;
    return performQuery("SELECT * FROM Albums WHERE AlbumID IN (SELECT AlbumID FROM AlbumJunc WHERE PhotoID = ?)", [photoId], "replica")
        .then(rows => {
            return rows;
        })
        .catch(err => {
            console.log(err);
            return [];
        });
}

// Front page
export async function getFeaturedImage() {
    if (DEV_MODE) return posts[0];
    let photo = await getSingleRow("SELECT * FROM Photos ORDER BY RAND() LIMIT 1", [], "replica");
    let creator = await getSingleRow("SELECT * FROM user WHERE id = ?", [photo.UserID], "replica");

    return {photo, creator};
}

// Photo interactions
export async function favoritePhoto(userId, photoId) {
    return performQuery("INSERT INTO Favorites (UserID, PhotoID) VALUES (?, ?)", [userId, photoId]);
}

export async function unfavoritePhoto(userId, photoId) {
    return performQuery("DELETE FROM Favorites WHERE UserID = ? AND PhotoID = ?", [userId, photoId]);
}

export async function isFavorite(userId, photoId) {
    return getSingleValue("SELECT COUNT(*) FROM Favorites WHERE UserID = ? AND PhotoID = ?", [userId, photoId], "replica");
}

export async function postComment(userId, photoId, content) {
    return performQuery("INSERT INTO Comments (UserID, PhotoID, Content) VALUES (?, ?, ?)", [userId, photoId, content]);
}

export async function getComments(photoId) {
    let comments = await performQuery("SELECT * FROM Comments WHERE PhotoID = ? ORDER BY Timestamp DESC", [photoId], "replica");

    for (let comment of comments) {
        comment.creator = await getSingleRow("SELECT * FROM user WHERE id = ?", [comment.UserID], "replica");
    }

    return comments;
}

// Photo upload
export async function uploadPhoto(userId, UUID, metadata) {
    performQuery("INSERT INTO Photos (UserID, UUID, Title, Description) VALUES (?, ?, ?, ?)", [userId, UUID, metadata.title, metadata.description])
        .then(res => {
            if (metadata.albumId) {
                performQuery("INSERT INTO AlbumJunc (AlbumID, PhotoID) VALUES (?, ?)", [metadata.albumId, res.insertId]);
                performQuery("UPDATE Albums SET Thumbnail = ? WHERE AlbumID = ?", [UUID, metadata.albumId]);
            }
        });
}

export async function deletePhoto(photoId) {
    return performQuery("DELETE FROM Photos WHERE PhotoID = ?", [photoId]);
}

// Update user account
export async function updateUser(userId, displayName, email, username) {
    return performQuery("UPDATE user SET DisplayName = ?, Email = ?, Username = ? WHERE id = ?", [displayName, email, username, userId]);
}

// Update album
export async function createOrUpdateAlbum(userId, name, description, albumId) {
    if (albumId != null) {
        // If album exists
        console.log("Updating album")
        return performQuery("UPDATE Albums SET UserID = ?, Name = ?, Description = ? WHERE AlbumID = ?", [userId, name, description, albumId]);
    } else {
        // Create new album if it doesn't
        console.log("Creating new album")
        return performQuery("INSERT INTO Albums (UserID, Name, Description) VALUES (?, ?, ?)", [userId, name, description]);
    }
}

// Search functions
export async function searchTitles(term) {
    return performQuery("SELECT Title FROM Photos WHERE Title LIKE CONCAT('%', ?, '%') LIMIT 10", [term], "replica");
}

export async function searchPhotos(searchTokens, stems) {
    if (DEV_MODE) return placeholders.photos;

    try {
        // Natural language search first (hopefully gives most relevant results)
        let results = await performQuery("SELECT * FROM Photos WHERE MATCH (Title, Description) AGAINST (?) LIMIT 10", [searchTokens], "replica");

        // Stemmed queries to find more matches. quite possibly very slow
        for (let root of stems) {
            let result = await performQuery("SELECT * FROM Photos WHERE MATCH (Title, Description) AGAINST (CONCAT(?, '*') IN BOOLEAN MODE) LIMIT 10", [root], "replica");
            console.log(result);
            
            for (let row of result) {
                if (!results.some(r => r.PhotoID === row.PhotoID)) {
                    results.push(row);
                }
            }
        }

        return results;
    } catch (err) {
        console.log(err);
        return [];
    }
}

// Explore page
export async function getSuggestedPhotos(page = 0) {
    if (DEV_MODE) return placeholders.photos;
    return performQuery("SELECT * FROM Photos ORDER BY Timestamp DESC LIMIT 25 OFFSET ?", [(page) * 25], "replica");
}

// Feed page
export async function getRecentPosts(userId, amount = 10) {
    if (DEV_MODE) return placeholders.posts;
    let posts = [];
    let photos = await performQuery("SELECT * FROM Photos WHERE UserID IN (SELECT UserID FROM Follows WHERE FollowerID = ?) ORDER BY Timestamp DESC LIMIT ?", [userId, amount], "replica");

    for (let photo of photos) {
        let creator = await getSingleRow("SELECT * FROM user WHERE id = ?", [photo.UserID], "replica");
        posts.push({
            creator: creator,
            photo: photo
        });
    }

    return posts;
}
