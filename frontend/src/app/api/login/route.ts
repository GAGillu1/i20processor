import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const basePath = process.env.BASE_PATH;
const forgotApi = process.env.FORGOT;
const loginApi = process.env.LOGIN;

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const headers = new Headers(request.headers);
  if (basePath && loginApi)
    try {
      const res = await fetch(basePath + loginApi, {
        method: "POST",
        headers: headers,
      });
      const data = await res.json();
      if (res.ok) {
        res.headers.forEach((e, k) => {
          console.log("headers", k, e);
          cookieStore.set(k, e, {
            secure: true,
            httpOnly: true,
            expires: Date.now() + 60 * 60 * 1000,
          });
        });
      }
      return NextResponse.json(data, { status: res.status });
    } catch (err: any) {
      return NextResponse.json(
        { message: "Something went wrong!" },
        { status: 500 }
      );
    }
}

// -----------------------
// PUT - FORGOT PASSWORD
export async function PUT(request: NextRequest) {
  if (basePath && forgotApi)
    try {
      const body = await request.formData();
      const res = await fetch(basePath + forgotApi, {
        method: "PUT",
        body: body,
      });
      const data = await res.json();
      return NextResponse.json(data, { status: res.status });
    } catch (err: any) {
      return NextResponse.json(
        { message: "Something went wrong!" },
        { status: 500 }
      );
    }
}
