"use server";

import { createSession, deleteSession } from "@/lib/session";
import { loginSchema } from "@/lib/utils";
import { redirect } from "next/navigation";

const testUser = {
  id: "1",
  email: "test@test.com",
  password: "12345678",
};
export async function login(prevState: unknown, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  if (email !== testUser.email || password !== testUser.password) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  await createSession(testUser.email);

  redirect("/dashboard");
}
export async function logout() {
  await deleteSession();
  redirect("/sign-in");
}
