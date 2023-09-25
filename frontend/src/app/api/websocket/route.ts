import { NextResponse } from "next/server";
// ----------------------------
// GET - GET WEBSOCKETS URL
export async function GET() {
  try {
    const hostname = process.env.WS_HOSTNAME;
    const host = ("ws://" + hostname + ":" + process.env.WS_PORT) as string;
    console.log("WShost", host);
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
