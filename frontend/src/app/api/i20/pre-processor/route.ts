import { getToken } from "@/components/utils/getTokens";
import { NextRequest, NextResponse } from "next/server";

const basePath = process.env.BASE_PATH;
const i20Api = process.env.I20_PRE_PROCESSOR;

export async function POST(request: NextRequest) {
  if (basePath && i20Api)
    try {
      const body = await request.formData();
      const res = await fetch(basePath + i20Api, {
        method: "POST",
        body: body,
        headers: getToken(request),
      });
      if (!res.ok) throw res;
      return res;
    } catch (err: any) {
      return NextResponse.json(
        {
          message: "Something went wrong!",
        },
        { status: 500 }
      );
    }
}
