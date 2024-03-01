import mariadb from 'mariadb';
const pool = mariadb.createPool({
    host: import.meta.env.VITE_DB_HOST,
    user: import.meta.env.VITE_DB_USER,
    password: import.meta.env.VITE_DB_PASS,
    database: "team02m_db"
});

console.log(`DB_HOST: ${import.meta.env.VITE_DB_HOST}, DB_USER: ${import.meta.env.VITE_DB_USER}`);

export async function testConnection() {
    let conn = await pool.getConnection();

    return conn.query("SELECT 1 as val")
        .then(rows => {
            console.log(rows);
            return "Connected!";
        })
        .catch(err => {
            return err;
        });
}

async function performQuery(query, param) {
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
        console.log(err);
        return null;
    } finally {
        if (conn) conn.end();
    }
}

async function getSingleRow(query, param) {
    return performQuery(query, param)
        .then(rows => {
            return rows[0];
        })
        .catch(err => {
            return err;
        });
}

async function getSingleValue(query, param) {
    return getSingleRow(query, param)
        .then(res => {
            return Object.values(res)[0];
        })
        .catch(err => {
            return err;
        });
}

// User Profile ABOUT
export async function getUserId(username) {
    return getSingleValue("SELECT UserID FROM Users WHERE Username = ?", [username]);
}

export async function getDisplayName(userId) {
    return getSingleValue("SELECT DisplayName FROM Users WHERE UserID = ?", [userId]);
}

export async function getPhotosCount(userId) {
    return getSingleValue("SELECT COUNT(*) FROM Photos WHERE UserID = ?", [userId]);
}

export async function getFollowersCount(userId) {
    return getSingleValue("SELECT COUNT(*) FROM Follows WHERE UserID = ?", [userId]);
}

export async function getFollowingCount(userId) {
    return getSingleValue("SELECT COUNT(*) FROM Follows WHERE FollowerID = ?", [userId]);
}

// User Profile PHOTOS
export async function getPhotos(userId) {
    // TODO: Pagination
    return performQuery("SELECT * FROM Photos WHERE UserID = ?", [userId]);
}

export async function getRecentPhotos(userId, amount = 4) {
    return performQuery("SELECT * FROM Photos WHERE UserID = ? ORDER BY Timestamp DESC LIMIT ?", [userId, amount]);
}

// User Profile ALBUMS
export async function getAlbums(userId) {
    return performQuery("SELECT * FROM Albums WHERE UserID = ?", [userId]);
}

// User Profile FAVORITES
export async function getFavorites(userId) {
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
export async function uploadPhoto(userId, photo) {
    return performQuery("INSERT INTO Photos (UserID, Title, Description, Path) VALUES (?, ?, ?, ?)", [userId, photo.title, photo.description, photo.path]);
}

export async function deletePhoto(photoId) {
    return performQuery("DELETE FROM Photos WHERE PhotoID = ?", [photoId]);
}