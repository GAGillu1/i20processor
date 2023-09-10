import { getToken } from "@/components/utils/getTokens";
import { NextRequest, NextResponse } from "next/server";

// -----------------------
// PUT - CHANGE PASSWORD
export async function PUT(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const basePath = process.env.BASE_PATH;
    const changePwdApi = process.env.CHANGE_PWD;
    if (basePath && changePwdApi) {
      const usr = params.username;
      const body = await request.formData();
      body.delete("cNPwd");
      const res = await fetch(basePath + changePwdApi + usr, {
        method: "PUT",
        body: body,
        headers: getToken(request),
      });
      const data = await res.json();
      return NextResponse.json(data, { status: res.status });
    }
  } catch (err: any) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
