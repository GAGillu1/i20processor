import { NextRequest, NextResponse } from "next/server";
import { getToken } from "../../../components/utils/getTokens";
import { cookies } from "next/headers";
// -----------------------
// GET - ALL USERS
const basePath = process.env.BASE_PATH as string;
const usersApi = process.env.USERS as string;
export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const headers = getToken(request);
    if (cookieStore.get("role")?.value === "ADMIN") {
      const institutionList = cookieStore.get("institutionList")
        ?.value as string;
      if (request.headers.get("institutionId")) headers.delete("institutionId");
      headers.append(
        "institutionId",
        JSON.parse(institutionList)[
          request.headers.get("institutionId") as string
        ]
      );
    }
    console.log("headers", headers);
    const res = await fetch(basePath + usersApi, {
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
// -----------------------
// POST - ADD NEW USER
export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    const res = await fetch(basePath + usersApi, {
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
