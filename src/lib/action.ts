"use server";

import { cookies } from "next/headers";

export async function logout() {
  await deleteToken();
}

export async function storeToken(token: string): Promise<void> {
  //  Server-side httpOnly cookie (secure, can't be accessed by JavaScript)
  (await cookies()).set("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export async function deleteToken(): Promise<void> {
  (await cookies()).delete("authToken");
}

export async function getAuthToken(): Promise<string | undefined> {
  const token = (await cookies()).get("authToken")?.value;
  return token;
}
