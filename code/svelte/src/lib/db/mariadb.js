import mariadb from 'mariadb';
const pool = mariadb.createPool({
    host: import.meta.env.VITE_DB_HOST,
    user: import.meta.env.VITE_DB_USER,
    password: import.meta.env.VITE_DB_PASS
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
        })
}