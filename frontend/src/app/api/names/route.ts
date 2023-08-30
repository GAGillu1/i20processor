import { NextRequest, NextResponse } from "next/server";
import { getToken } from "../../../components/utils/getTokens";

export async function GET(request: NextRequest) {
  const res = await fetch("http://127.0.0.1:8081/dso");

  switch (res.status) {
    case 200: {
      const data = await res.json();
      return NextResponse.json(
        {
          message: "Users fetched successfully",
          data: data,
        },
        { status: 200 }
      );
    }
    case 401: {
      return NextResponse.json({ message: "Not Authorized!" }, { status: 401 });
    }
    default: {
      return NextResponse.json(
        { message: "Something went wrong!" },
        { status: res.status }
      );
    }
  }
}
