import { NextRequest, NextResponse } from "next/server";
import { getToken } from "../getTokens";
// -----------------------
// GET - ALL INSTANCES
const basePath = process.env.BASE_PATH as string;
const instanceApi = process.env.INSTANCE as string;
export async function GET(request: NextRequest) {
  try {
    const res = await fetch(basePath + instanceApi, {
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
// POST - ADD NEW INSTANCE
export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    const res = await fetch(basePath + instanceApi, {
      method: "POST",
      body: body,
      headers: getToken(request),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: err.status }
    );
  }
}
