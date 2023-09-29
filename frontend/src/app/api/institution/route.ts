import { NextRequest, NextResponse } from "next/server";
import { getToken } from "../../../components/utils/getTokens";
// -----------------------
// GET - ALL UNIVERSITIES
const basePath = process.env.BASE_PATH as string;
const universityApi = process.env.UNIVERSITY as string;
export async function GET(request: NextRequest) {
  try {
    const res = await fetch(basePath + universityApi, {
      headers: getToken(request),
    });
    const data = await res.json();
    console.log("universities", data);
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
// -----------------------
// POST - ADD UNIVERSITY
export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    const res = await fetch(basePath + universityApi, {
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
