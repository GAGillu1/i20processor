import { getToken } from "@/components/utils/getTokens";
import { NextRequest, NextResponse } from "next/server";

// -----------------------
// GET - LOGS
const basePath = process.env.BASE_PATH;
const logsApi = process.env.LOGS;
export async function GET(request: NextRequest) {
  if (basePath && logsApi)
    try {
      const res = await fetch(basePath + logsApi, {
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