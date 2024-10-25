import { NextRequest, NextResponse } from "next/server";
import { getToken } from "@/app/api/getTokens";

// -----------------------
// GET - INSTANCE INFO
const basePath = process.env.BASE_PATH as string;
const instaceApi = process.env.INSTANCE as string;
export async function GET(
  request: NextRequest,
  { params }: { params: { instanceType: string } }
) {
  try {
    const type = "/" + params.instanceType;
    const res = await fetch(basePath + instaceApi + type, {
      headers: getToken(request),
    });
    const data = await res.json();
    // console.log("user details", data);
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
// -----------------------
// PUT - UPDATE INSTANCE
export async function PUT(
  request: NextRequest,
  { params }: { params: { instanceType: string } }
) {
  try {
    const type = "/" + params.instanceType;
    const body = await request.formData();
    const res = await fetch(basePath + instaceApi + type, {
      method: "PUT",
      body: body,
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
