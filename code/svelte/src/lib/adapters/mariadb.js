import * as db from "$lib/server/mariadb";

/** @type {import('lucia').Adapter} */
export class MariaDBAdapter {
    async deleteExpiredSessions() {
        return await db.performAuthQuery("DELETE FROM user_session WHERE expires_at < NOW()");
    }

    async deleteSession(sessionId) {
        return await db.performAuthQuery("DELETE FROM user_session WHERE id = ?", [sessionId]);
    }

    async deleteUserSessions(userId) {
        return await db.performAuthQuery("DELETE FROM user_session WHERE user_id = ?", [userId]);
    }

    async getSessionAndUser(sessionId) {
        const databaseSession = await db.getAuthRow("SELECT * FROM user_session WHERE id = ?", [sessionId]);
        const databaseUser = await db.getAuthRow("SELECT * FROM user WHERE id = ?", [databaseSession.user_id]);

        // Converts the database session and user to the format expected by Lucia
        const session = databaseSession ? {
            id: databaseSession.id,
            userId: databaseSession.user_id,
            expiresAt: databaseSession.expires_at
        } : null;

        const user = databaseUser ? {
            id: databaseUser.id
        } : null;
        
        return [session, user];
    }

    async getUserSession(userId) {
        return db.performAuthQuery("SELECT * FROM user_session WHERE user_id = ?", [userId]);
    }

    async setSession(session) {
        console.log(session);
        const result = await db.performAuthQuery("INSERT INTO user_session (id, user_id, expires_at) VALUES (?, ?, ?)", [session.id, session.userId, session.expiresAt]);
        console.log(result);
        return;
    }

    async setSessionExpiration(sessionId, expiresAt) {
        return db.performAuthQuery("UPDATE user_session SET expires_at = ? WHERE id = ?", [expiresAt, sessionId]);
    }
}