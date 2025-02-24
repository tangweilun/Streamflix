import { storeToken } from "@/lib/action";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Simulate API call to register user
    const response = await fetch("http://localhost:5000/api/Auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Registration failed" },
        { status: 400 }
      );
    }

    const data = await response.json();

    // Store token in HTTP-only cookies
    await storeToken(data.token);

    return NextResponse.json({ message: "Registration successful" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
