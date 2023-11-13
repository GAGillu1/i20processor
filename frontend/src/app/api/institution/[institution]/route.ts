import { NextRequest, NextResponse } from "next/server";
import { getToken } from "@/app/api/getTokens";

const basePath = process.env.BASE_PATH as string;
const institutionApi = process.env.INSTITUTION as string;
// -----------------------
// GET - INSTITUTION INFO
export async function GET(
  request: NextRequest,
  { params }: { params: { institution: string } }
) {
  try {
    const institution = "/" + params.institution;
    const res = await fetch(basePath + institutionApi + institution, {
      headers: getToken(request),
    });
    const data = await res.json();
    // console.log("user details", data);
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
// -----------------------
// PUT - UPDATE INSTITUTION
export async function PUT(
  request: NextRequest,
  { params }: { params: { university: string } }
) {
  try {
    const university = "/" + params.university;
    const body = await request.formData();
    const res = await fetch(basePath + institutionApi + university, {
      method: "PUT",
      body: body,
      headers: getToken(request),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
// // -----------------------
// // POST - ADD SIGN
// export async function POST(
//   request: NextRequest,
//   { params }: { params: { university: string } }
// ) {
//   if (basePath && addSignApi)
//     try {
//       const university = "/" + params.university;
//       const body = await request.formData();

//       const res = await fetch(basePath + addSignApi + university, {
//         method: "POST",
//         body: body,
//         headers: getToken(request),
//       });

//       if (res.ok) return res;
//       const data = await res.json();
//       // console.log("userInfo", data);
//       return NextResponse.json(data, { status: res.status });
//     } catch (err: any) {
//       return NextResponse.json(
//         { message: "Something went wrong!" },
//         { status: 500 }
//       );
//     }
// }
// -----------------------
// DELETE - TOGGLE UNIVERSITY ACTIVE
export async function DELETE(
  request: NextRequest,
  { params }: { params: { university: string } }
) {
  try {
    const university = params.university;
    // console.log("university", university);
    const res = await fetch(basePath + institutionApi + university, {
      method: "DELETE",
      headers: getToken(request),
    });
    if (res.ok) return res;
    const data = await res.json();
    // console.log("res", data);
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
