import { NextRequest, NextResponse } from "next/server";
import { getToken } from "../getTokens";
import { cookies } from "next/headers";
import { object } from "yup";
// -----------------------
// GET - ALL INSTITUTIONS
const basePath = process.env.BASE_PATH as string;
const institutionApi = process.env.INSTITUTION as string;
export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  try {
    const res = await fetch(basePath + institutionApi, {
      headers: getToken(request),
    });
    let data = await res.json();
    data = data.data;
    const message = data.message;
    type cookies = { [s: string]: string };
    let cookies: cookies = {};
    let processedData = [];
    // console.log("Keys", data);
    for (const key in data) {
      const s = data[key].institutionName as keyof cookies;
      // console.log(s);
      cookies[s] = data[key].institutionId;
      processedData.push({ institutionName: data[key].institutionName });
    }
    // console.log("universities", data);
    cookieStore.set("institutionList", JSON.stringify(cookies), {
      httpOnly: true,
      expires: Date.now() + 60 * 60 * 1000,
    });
    return NextResponse.json(
      { data: processedData, message: message },
      { status: res.status }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
// -----------------------
// POST - ADD INSTITUTION
export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    const res = await fetch(basePath + institutionApi, {
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
