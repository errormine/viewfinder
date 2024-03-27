import mariadb from 'mariadb';
import { NO_DB, DB_HOST, DB_PORT, DB_USER, DB_PASS } from '$env/static/private';

console.log(`DB_HOST: ${DB_HOST}, DB_USER: ${DB_USER}`);

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
export let placeholders = {
    displayName: "Placeholder User",
    username: "placeholder",
    userId: 1,
    website: "https://example.com",
    contact: "contact@example.com",
    bio: "This is a test user. They do not exist.",
    location: "Chicago, IL",
    joinDate: "2021-01-01",
    photos: [
        {
            PhotoID: 0,
            Title: "Test Photo 1 really long n a m e a a a  aaa!!!",
            UUID: "placeholder.png",
            Description: "This is a test photo."
        }
    ],
    albums: [
        {
            AlbumID: 0,
            Name: "Test Album 1",
            Description: "This is a test album 1.",
            Thumbnail: "placeholder.png",
            Count: 2
        }
    ]
}

export async function testConnection() {
    if (DEV_MODE) {
        return false;
    }

    let conn = await pool.getConnection();

    return conn.query("SELECT 1 as val")
        .then(rows => {
            console.log("DB Connection test successful!");
            console.log(`DB_HOST: ${import.meta.env.VITE_DB_HOST}, DB_USER: ${import.meta.env.VITE_DB_USER}`);
            return true;
        })
        .catch(err => {
            console.log(err);
            return false;
        });
}

export async function performQuery(query, param) {
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

export async function getSingleRow(query, param) {
    return performQuery(query, param)
        .then(rows => {
            return rows[0];
        })
        .catch(err => {
            console.log("QUERY FAILED: " + query);
            return err;
        });
}

export async function getSingleValue(query, param) {
    return getSingleRow(query, param)
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
    return getSingleValue("SELECT id FROM user WHERE Username = ?", [username]);
}

export async function getUsername(userId) {
    if (DEV_MODE) return placeholders.username;
    return getSingleValue("SELECT Username FROM user WHERE id = ?", [userId]);
}

export async function getProfilePicture(userId) {
    if (DEV_MODE) return "/images/pfp128.jpg";

    const picture = await getSingleValue("SELECT ProfilePicture FROM user WHERE id = ?", [userId]);

    if (picture === null) {
        return "/images/pfp128.jpg";
    }

    return picture;
}

export async function getDisplayName(userId) {
    if (DEV_MODE) return placeholders.displayName;
    return getSingleValue("SELECT DisplayName FROM user WHERE id = ?", [userId]);
}

export async function getPhotosCount(userId) {
    if (DEV_MODE) return placeholders.photos.length;
    return getSingleValue("SELECT COUNT(*) FROM Photos WHERE UserID = ?", [userId]);
}

export async function getFollowersCount(userId) {
    if (DEV_MODE) return 0;
    return getSingleValue("SELECT COUNT(*) FROM Follows WHERE UserID = ?", [userId]);
}

export async function getFollowingCount(userId) {
    if (DEV_MODE) return 0;
    return getSingleValue("SELECT COUNT(*) FROM Follows WHERE FollowerID = ?", [userId]);
}

export async function getWebsite(userId) {
    if (DEV_MODE) return placeholders.website;
    return getSingleValue("SELECT Website FROM user WHERE id = ?", [userId]);
}

export async function getContact(userId) {
    if (DEV_MODE) return placeholders.contact;
    return getSingleValue("SELECT Contact FROM user WHERE id = ?", [userId]);
}

export async function getLocation(userId) {
    if (DEV_MODE) return placeholders.location;
    return getSingleValue("SELECT Location FROM user WHERE id = ?", [userId]);
}

export async function getJoinDate(userId) {
    if (DEV_MODE) return placeholders.joinDate;
    return getSingleValue("SELECT JoinDate FROM user WHERE id = ?", [userId]);
}

export async function getBio(userId) {
    if (DEV_MODE) return placeholders.bio;
    return getSingleValue("SELECT Bio FROM user WHERE id = ?", [userId]);
}

export async function updateBio(userId, bio) {
    return performQuery("UPDATE user SET Bio = ? WHERE id = ?", [bio, userId]);
}

// User Profile PHOTOS
export async function getPhotos(userId) {
    if (DEV_MODE) return placeholders.photos;
    // TODO: Pagination
    return performQuery("SELECT * FROM Photos WHERE UserID = ?", [userId]);
}

export async function getRecentPhotos(userId, amount = 4) {
    if (DEV_MODE) return placeholders.photos;
    return performQuery("SELECT * FROM Photos WHERE UserID = ? ORDER BY Timestamp DESC LIMIT ?", [userId, amount]);
}

// User Profile ALBUMS
export async function getAlbums(userId) {
    if (DEV_MODE) return placeholders.albums;
    return performQuery("SELECT * FROM Albums WHERE UserID = ?", [userId]);
}

// User Profile FAVORITES
export async function getFavorites(userId) {
    if (DEV_MODE) return placeholders.photos;
    return performQuery("SELECT * FROM Photos WHERE PhotoID IN (SELECT PhotoID FROM Favorites WHERE UserID = ?)", [userId]);
}

// User Interactions
export async function followUser(userId, followerId) {
    return performQuery("INSERT INTO Follows (UserID, FollowerID) VALUES (?, ?)", [userId, followerId]);
}

export async function unfollowUser(userId, followerId) {
    return performQuery("DELETE FROM Follows WHERE UserID = ? AND FollowerID = ?", [userId, followerId]);
}

export async function isFollowing(userId, followerId) {
    return getSingleValue("SELECT COUNT(*) FROM Follows WHERE UserID = ? AND FollowerID = ?", [userId, followerId]);
}

// View photo page
export async function getPhoto(photoId) {
    if (DEV_MODE) return placeholders.photos[0];
    return getSingleRow("SELECT * FROM Photos WHERE PhotoID = ?", [photoId]);
}

export async function getPhotoCreatorId(photoId) {
    if (DEV_MODE) return placeholders.userId;
    return getSingleValue("SELECT UserID FROM Photos WHERE PhotoID = ?", [photoId]);
}

export async function getAlbumsByPhoto(photoId) {
    if (DEV_MODE) return placeholders.albums;
    performQuery("SELECT * FROM Albums WHERE AlbumID IN (SELECT AlbumID FROM AlbumJunc WHERE PhotoID = ?)", [photoId])
        .then(rows => {
            return rows;
        })
        .catch(err => {
            console.log(err);
            return [];
        });
}

// Photo interactions
export async function favoritePhoto(userId, photoId) {
    return performQuery("INSERT INTO Favorites (UserID, PhotoID) VALUES (?, ?)", [userId, photoId]);
}

export async function unfavoritePhoto(userId, photoId) {
    return performQuery("DELETE FROM Favorites WHERE UserID = ? AND PhotoID = ?", [userId, photoId]);
}

export async function isFavorite(userId, photoId) {
    return getSingleValue("SELECT COUNT(*) FROM Favorites WHERE UserID = ? AND PhotoID = ?", [userId, photoId]);
}

// Photo upload
export async function uploadPhoto(userId, UUID, metadata) {
    return performQuery("INSERT INTO Photos (UserID, UUID, Title, Description) VALUES (?, ?, ?, ?)", [userId, UUID, metadata.title, metadata.description]);
}

export async function deletePhoto(photoId) {
    return performQuery("DELETE FROM Photos WHERE PhotoID = ?", [photoId]);
}
