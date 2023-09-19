import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const basePath = process.env.BASE_PATH as string;
const forgotApi = process.env.FORGOT as string;
const loginApi = process.env.LOGIN as string;

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const headers = new Headers(request.headers);
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
