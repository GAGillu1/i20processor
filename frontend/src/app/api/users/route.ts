import { NextRequest, NextResponse } from "next/server";
import { getToken } from "../../../components/utils/getTokens";
import { revalidateTag } from "next/cache";
// -----------------------
// GET - ALL USERS
export async function GET(request: NextRequest) {
  const res = await fetch("http://127.0.0.1:8081/users", {
    headers: getToken(request),
    next: { tags: ["userList"] },
  });

  const data = await res.json();
  console.log("users", data);
  switch (res.status) {
    case 200: {
      return NextResponse.json(data);
    }
    default: {
      return NextResponse.json(
        { message: data.message },
        { status: res.status }
      );
    }
  }
}
// -----------------------
// POST - ADD NEW USER
export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    const res = await fetch("http://127.0.0.1:8081/users", {
      method: "POST",
      body: body,
      headers: getToken(request),
    });

    if (!res.ok) throw res;
    revalidateTag("userList");
    return NextResponse.json({
      message: "User added successfully",
      data: res,
    });
  } catch (err: any) {
    console.log("route handler", err);
    return NextResponse.json(
      {
        message: "Something went wrong!",
        data: err,
      },
      { status: err.status }
    );
  }
}
