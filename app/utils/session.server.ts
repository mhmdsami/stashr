import { db } from "~/utils/db.server";
import bcrypt from "bcryptjs";
import { SESSION_SECRET } from "~/utils/env.server";
import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { User, users } from "~/schema";
import { eq, sql } from "drizzle-orm";

export async function signUp(
  name: string,
  email: string,
  password: string,
): Promise<{ success: false; error: string } | { success: true; data: User }> {
  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (existingUser) {
    return { success: false, error: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const [user] = await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
  });

  return { success: true, data: user };
}

export async function signIn(
  email: string,
  password: string,
): Promise<
  | {
      success: false;
      error: string;
    }
  | { success: true; data: User }
> {
  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    return { success: false, error: "User not found" };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return { success: false, error: "Incorrect password" };
  }

  return { success: true, data: user };
}

const { commitSession, getSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__stashr_session",
      secure: true,
      secrets: [SESSION_SECRET],
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
    },
  });

export async function createUserSession(userId: string, redirectTo?: string) {
  const session = await getSession();
  session.set("userId", userId);

  return redirect(redirectTo ?? "/dashboard", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

function getUserSession(request: Request) {
  return getSession(request.headers.get("Cookie"));
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");

  if (typeof userId !== "string") return null;
  return userId;
}

export async function requireUserId(request: Request) {
  const userId = await getUserId(request);

  if (!userId) {
    throw redirect("/sign-in");
  }
  return userId;
}

export async function signOut(request: Request) {
  const session = await getUserSession(request);

  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
