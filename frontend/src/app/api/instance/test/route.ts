import { getToken } from "@/app/api/getTokens";
import { NextRequest, NextResponse } from "next/server";
// -----------------------
// POST - TEST INSTANCE
const basePath = process.env.BASE_PATH as string;
const instanceApi = process.env.INSTANCE as string;
export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    const res = await fetch(basePath + instanceApi + "/test", {
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
