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
    let conn = await pool.getConnection();

    return conn.query(query, param)
        .then(rows => {
            return rows;
        })
        .catch(err => {
            return err;
        });
}

async function getSingleRow(query, param) {
    return performQuery(query, param)
        .then(rows => {
            return rows[0];
        });
}

async function getSingleValue(query, param) {
    return getSingleRow(query, param)
        .then(res => {
            return Object.values(res)[0];
        })
        .catch(err => {
            return null;
        });
}

export async function getUserId(username) {
    return getSingleValue("SELECT UserId FROM Users WHERE Username = ?", [username]);
}

export async function getDisplayName(userId) {
    return getSingleValue("SELECT DisplayName FROM Users WHERE UserId = ?", [userId])
}