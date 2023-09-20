import { NextRequest } from "next/server";

export function getToken(request: NextRequest) {
  const headers = new Headers();
  const token = request.cookies.get("authorization")?.value;
  const institutionid = request.cookies.get("institutionid")?.value;
  const username = request.cookies.get("username")?.value;
  if (token) headers.append("authorization", token);
  if (institutionid) headers.append("institutionid", institutionid);
  if (username) headers.append("username", username);
  headers.append("Access-Control-Allow-Origin", "*");
  return headers;
}

export function getGreeting() {
  const hours = Number(new Date().getHours());
  if (hours < 12) return "Good Morning";
  else if (hours < 16) return "Good Afternoon";
  return "Good Evening";
}
