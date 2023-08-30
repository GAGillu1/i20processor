import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const headers = new Headers();
  const token = request.cookies.get("authorization")?.value;
  if (token) headers.append("authorization", token);
  const body = await request.formData();

  const res = await fetch("https://localhost:8081/dso", {
    method: "POST",
    body: body,
    headers: headers,
  });
  return res;
}
