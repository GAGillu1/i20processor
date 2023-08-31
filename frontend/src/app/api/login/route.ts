import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// const userData = ["username", "fullname", "role", "authorization"];

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const headers = new Headers(request.headers);
  try {
    const res = await fetch("http://127.0.0.1:8081/login", {
      method: "POST",
      body: "Login Request",
      headers: headers,
    });

    const data = await res.json();
    console.log("login data", data);
    if (!res.ok) throw res;

    res.headers.forEach((e, k) => {
      console.log("headers", k, e);
      cookieStore.set(k, e, {
        secure: true,
        httpOnly: true,
        expires: Date.now() + 60 * 60 * 1000,
      });
    });

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(err);
  }
}
