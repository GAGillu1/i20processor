import { getToken } from "@/components/utils/getTokens";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.formData();

  const res = await fetch("https://localhost:8081/dso", {
    method: "POST",
    body: body,
    headers: getToken(request),
  });
  return res;
}

export async function GET(request: NextRequest) {
  const res = await fetch("http://127.0.0.1:8081/dso", {
    headers: getToken(request),
  });

  switch (res.status) {
    case 200: {
      const data = await res.json();
      return NextResponse.json(
        {
          message: "Users fetched successfully",
          data: data,
        },
        { status: 200 }
      );
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
