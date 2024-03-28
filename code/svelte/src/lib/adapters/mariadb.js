import * as db from "$lib/server/mariadb";

/** @type {import('lucia').Adapter} */
export class MariaDBAdapter {
    async deleteExpiredSessions() {
        return await db.performQuery("DELETE FROM user_session WHERE expires_at < NOW()");
    }

    async deleteSession(sessionId) {
        return await db.performQuery("DELETE FROM user_session WHERE id = ?", [sessionId]);
    }

    async deleteUserSessions(userId) {
        return await db.performQuery("DELETE FROM user_session WHERE user_id = ?", [userId]);
    }

    async getSessionAndUser(sessionId) {
        const databaseSession = await db.getSingleRow("SELECT * FROM user_session WHERE id = ?", [sessionId]);
        if (!databaseSession) return [null, null];
        const databaseUser = await db.getSingleRow("SELECT * FROM user WHERE id = ?", [databaseSession.user_id]);

        // Converts the database session and user to the format expected by Lucia
        const session = databaseSession ? {
            id: databaseSession.id,
            userId: databaseSession.user_id,
            expiresAt: databaseSession.expires_at
        } : null;

        const user = databaseUser ? {
            id: databaseUser.id,
            // Exposes custom attributes from the user table
            // Also needs to be added to getUserAttributes() in $lib/server/auth.js
            attributes: {
                email: databaseUser.email,
                username: databaseUser.Username,
                displayName: databaseUser.DisplayName,
                picture: databaseUser.ProfilePicture,
            }
        } : null;
        
        return [session, user];
    }

    async getUserSession(userId) {
        return db.performQuery("SELECT * FROM user_session WHERE user_id = ?", [userId]);
    }

    async setSession(session) {
        console.log(session);
        const result = await db.performQuery("INSERT INTO user_session (id, user_id, expires_at) VALUES (?, ?, ?)", [session.id, session.userId, session.expiresAt]);
        console.log(result);
        return;
    }

    async setSessionExpiration(sessionId, expiresAt) {
        return db.performQuery("UPDATE user_session SET expires_at = ? WHERE id = ?", [expiresAt, sessionId]);
    }
}
