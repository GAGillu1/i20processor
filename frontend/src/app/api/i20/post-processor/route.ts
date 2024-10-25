import { getToken } from "@/app/api/getTokens";
import { NextRequest, NextResponse } from "next/server";

const basePath = process.env.BASE_PATH as string;
const i20Api = process.env.I20_POST_PROCESSOR as string;
// ----------------------------
// POST - POST-PROCESSOR
export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    const res = await fetch(basePath + i20Api, {
      method: "POST",
      body: body,
      headers: getToken(request),
    });
    if (!res.ok) throw res;
    return res;
  } catch (err: any) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
// ----------------------------
// GET - RESULTS
export async function GET(request: NextRequest) {
  try {
    const res = await fetch(basePath + i20Api, {
      headers: getToken(request),
    });

    const data = await res.json();
    // console.log("get response", data, res.status);
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
