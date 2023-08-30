import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const headers = new Headers();
  const token = request.cookies.get("authorization")?.value;
  if (token) headers.append("authorization", token);

  const body = await request.formData();
  const res = await fetch("http://127.0.0.1:8081/i20process", {
    method: "POST",
    body: body,
    headers: headers,
  });

  return res;
}
