import { getToken } from "@/components/utils/getTokens";
import { NextRequest, NextResponse } from "next/server";

// -----------------------
// GET - LOGS
const basePath = process.env.BASE_PATH as string;
const logsApi = process.env.LOGS as string;
export async function GET(request: NextRequest) {
  try {
    const res = await fetch(basePath + logsApi, {
      headers: getToken(request),
    });
    const data = await res.json();
    console.log("log", data);
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
