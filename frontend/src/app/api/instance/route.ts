import { NextRequest, NextResponse } from "next/server";
import { getToken } from "../../../components/utils/getTokens";
// -----------------------
// GET - ALL INSTANCES
export async function GET(request: NextRequest) {
  const res = await fetch("http://127.0.0.1:8081/instance", {
    headers: getToken(request),
  });

  const data = await res.json();
  console.log("instance", data);
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
// POST - ADD NEW INSTANCE
export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    const res = await fetch("http://127.0.0.1:8081/instance", {
      method: "POST",
      body: body,
      headers: getToken(request),
    });

    if (!res.ok) throw res;
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
