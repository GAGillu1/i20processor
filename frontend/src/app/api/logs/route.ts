import { getToken } from "@/app/api/getTokens";
import { NextRequest, NextResponse } from "next/server";

// -----------------------
// GET - LOGS
const basePath = process.env.BASE_PATH as string;
export async function GET(request: NextRequest) {
  try {
    const isSuperUser = request.cookies.get("role")?.value === "SuperUser";
    // console.log("admin", isSuperUser);
    const logsApi = isSuperUser ? "/alllogs" : (process.env.LOGS as string);
    const res = await fetch(basePath + logsApi, {
      headers: getToken(request),
      cache: "no-cache",
    });
    const data = await res.json();
    // console.log("logs", data.data);
    // console.log("log headers", getToken(request));
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
