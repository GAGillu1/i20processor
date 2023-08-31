import { NextRequest, NextResponse } from "next/server";
import { getToken } from "@/components/utils/getTokens";

// -----------------------
// GET - USER INFO
export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  const usr = params.username;
  const res = await fetch("http://127.0.0.1:8081/users/" + usr, {
    headers: getToken(request),
  });

  const data = await res.json();
  console.log("userInfo", data);
  switch (res.status) {
    case 200: {
      return NextResponse.json(data);
    }
    case 401: {
      return NextResponse.json({ message: "Not Authorized!" }, { status: 401 });
    }
    default: {
      return NextResponse.json(
        { message: "Something went wrong!" },
        { status: res.status }
      );
    }
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
    if (!res.ok) throw res;
    return NextResponse.json({
      message: "User updated successfully",
      data: res,
    });
  } catch (err: any) {
    return NextResponse.json(err);
  }
}
