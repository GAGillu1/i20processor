import { getToken } from "@/components/utils/getTokens";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    const res = await fetch("https://localhost:8081/dso", {
      method: "POST",
      body: body,
      headers: getToken(request),
    });
    return res;
  } catch (err: any) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const res = await fetch("http://127.0.0.1:8081/dso", {
      headers: getToken(request),
    });
    const data = await res.json();
    console.log("dsoData", data);
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
