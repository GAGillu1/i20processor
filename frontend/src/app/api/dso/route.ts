import { getToken } from "@/components/utils/getTokens";
import { NextRequest, NextResponse } from "next/server";

const basePath = process.env.BASE_PATH;
const dsoApi = process.env.DSO;
export async function POST(request: NextRequest) {
  if (basePath && dsoApi)
    try {
      const body = await request.formData();
      const res = await fetch(basePath + dsoApi, {
        method: "POST",
        body: body,
        headers: getToken(request),
      });
      return res;
    } catch (err: any) {
      return NextResponse.json(
        { message: "Something went wrong!" },
        { status: 500 }
      );
    }
}

export async function GET(request: NextRequest) {
  if (basePath && dsoApi)
    try {
      const res = await fetch(basePath + dsoApi, {
        headers: getToken(request),
      });
      const data = await res.json();
      console.log("dsoData", data);
      return NextResponse.json(data, { status: res.status });
    } catch (err: any) {
      return NextResponse.json(
        { message: "Something went wrong!" },
        { status: 500 }
      );
    }
}
