import { getToken } from "@/components/utils/getTokens";
import { NextRequest, NextResponse } from "next/server";

const basePath = process.env.BASE_PATH;
const i20Api = process.env.I20;
export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    const res = await fetch("http://127.0.0.1:8081/i20process", {
      method: "POST",
      body: body,
      headers: getToken(request),
    });
    if (!res.ok) throw res;
    return res;
  } catch (err: any) {
    return NextResponse.json(
      {
        message: "Something went wrong!",
      },
      { status: 500 }
    );
  }
}
