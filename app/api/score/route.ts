import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const resumeFile = formData.get("resume");
  console.log(resumeFile);
  return NextResponse.json({}, { status: 200 });
}
