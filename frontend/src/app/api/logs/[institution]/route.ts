import { getToken } from "@/app/api/getTokens";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
const basePath = process.env.BASE_PATH as string;
const logsApi = process.env.LOGS as string;

// -----------------------
// GET - INSTITUTION LOGS
export async function GET(
  request: NextRequest,
  { params }: { params: { institution: string } }
) {
  try {
    const cookieStore = cookies();
    const headers = getToken(request);
    if (cookieStore.get("role")?.value === "ADMIN") {
      const institutionList = cookieStore.get("institutionList")
        ?.value as string;
      // if (request.headers.get("institutionId"))
      headers.delete("institutionId");
      headers.append(
        "institutionId",
        JSON.parse(institutionList)[params.institution]
      );
    }
    // console.log("headers", headers);
    const res = await fetch(basePath + logsApi, {
      headers: headers,
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
