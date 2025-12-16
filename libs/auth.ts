import sql from 'better-sqlite3';
import { cookies } from 'next/headers';
import { Lucia } from 'lucia';
import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite';

const db = sql('meals.db');

const adapter = new BetterSqlite3Adapter(db, {
  user: 'users',
  session: 'sessions',
});

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
});

// Create auth session for user
export async function createAuthSession(userId: string) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  const cookieStore = await cookies();
  cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}

// Verify auth session for user
export async function verifyAuth() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(lucia.sessionCookieName);

  if (!sessionCookie) {
    return {
      user: null,
      session: null,
    };
  }

  const sessionId = sessionCookie.value;

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const sessionResponse = await lucia.validateSession(sessionId);

  try {
    if (sessionResponse.session && sessionResponse.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(sessionResponse.session.id);
      const cookieStore = await cookies();
      cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    if (!sessionResponse.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      const cookieStore = await cookies();
      cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
  } catch (error) {
    console.log(error);
  }

  return sessionResponse;
}

// Desctroy auth session for user
export async function destroySession() {
  const { session } = await verifyAuth();

  if (!session) {
    return {
      error: 'Unauthorized1',
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  const cookieStore = await cookies();
  cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}
