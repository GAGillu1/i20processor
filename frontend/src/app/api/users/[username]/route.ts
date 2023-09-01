import { NextRequest, NextResponse } from "next/server";
import { getToken } from "@/components/utils/getTokens";

// -----------------------
// GET - USER INFO
export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const usr = params.username;
    const res = await fetch("http://127.0.0.1:8081/users/" + usr, {
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
// PUT - UPDATE USER
export async function PUT(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const usr = params.username;
    const body = await request.formData();
    const res = await fetch("http://127.0.0.1:8081/users/" + usr, {
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
  { params }: { params: { username: string } }
) {
  try {
    const usr = params.username;
    const body = await request.formData();
    // body.append("password", "password");
    // console.log("formData", body);

    const res = await fetch("http://127.0.0.1:8081/addSign/" + usr, {
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
