import { NextRequest, NextResponse } from "next/server";
// ----------------------------
// GET - GET WEBSOCKETS URL
export async function GET(request: NextRequest) {
  try {
    const hostname =
      request.nextUrl.hostname === "localhost"
        ? "127.0.0.1"
        : request.nextUrl.hostname;
    const host = ("ws://" + hostname + ":" + process.env.WS_PORT) as string;
    const res = {
      data: host,
      message: "Port fetch successful",
    };
    return NextResponse.json(res);
  } catch (err: any) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
