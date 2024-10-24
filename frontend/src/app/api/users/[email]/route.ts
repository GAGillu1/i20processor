import { NextRequest, NextResponse } from "next/server";
import { getToken } from "@/app/api/getTokens";

// -----------------------
// GET - USER INFO
const basePath = process.env.BASE_PATH as string;
const usersApi = process.env.USERS as string;
const addSignApi = process.env.ADD_SIGN as string;
export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    const usr = "/" + params.email;
    const res = await fetch(basePath + usersApi + usr, {
      headers: getToken(request),
    });
    const data = await res.json();
    console.log("user details", data);
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
// -----------------------
// PUT - UPDATE USER
export async function PUT(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    const usr = "/" + params.email;
    const body = await request.formData();
    const res = await fetch(basePath + usersApi + usr, {
      method: "PUT",
      body: body,
      headers: getToken(request),
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
// -----------------------
// POST - ADD SIGN
export async function POST(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  if (basePath && addSignApi)
    try {
      const usr = "/" + params.email;
      const body = await request.formData();

      const res = await fetch(basePath + addSignApi + usr, {
        method: "POST",
        body: body,
        headers: getToken(request),
      });

      if (res.ok) return res;
      const data = await res.json();
      // console.log("userInfo", data);
      return NextResponse.json(data, { status: res.status });
    } catch (err: any) {
      return NextResponse.json(
        { message: "Something went wrong!" },
        { status: 500 }
      );
    }
}
// -----------------------
// DELETE - TOGGLE USER ACTIVE
export async function DELETE(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    const usr = params.email;
    console.log("user", usr);
    const res = await fetch("http://127.0.0.1:8081/users/" + usr, {
      method: "DELETE",
      headers: getToken(request),
    });
    if (res.ok) return res;
    const data = await res.json();
    // console.log("res", data);
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
