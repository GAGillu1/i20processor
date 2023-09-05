import { getToken } from "@/components/utils/getTokens";
import { NextRequest, NextResponse } from "next/server";

// -----------------------
// PUT - CHANGE PASSWORD
export async function PUT(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const usr = params.username;
    const body = await request.formData();
    body.delete("cNPwd");
    console.log("body", body);
    const res = await fetch("http://127.0.0.1:8081/changePwd/" + usr, {
      method: "PUT",
      body: body,
      headers: getToken(request),
    });
    const data = await res.json();
    console.log("changePwd", data);
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
