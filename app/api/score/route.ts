import { generateScore, parsePdf } from "@/app/api/score/_utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const jobDescription = formData.get("jobDescription");
  const resumeFile = formData.get("resume");

  if (!jobDescription) {
    return NextResponse.json(
      { error: "Missing job description" },
      { status: 400 },
    );
  }
  if (typeof jobDescription !== "string") {
    return NextResponse.json(
      { error: "Job description is not a string" },
      { status: 400 },
    );
  }
  if (!resumeFile) {
    return NextResponse.json(
      { error: "Missing resume file or not pdf" },
      { status: 400 },
    );
  }
  if (typeof resumeFile === "string") {
    return NextResponse.json(
      { error: "Resume file is not File type" },
      { status: 400 },
    );
  }

  const resumeText = await parsePdf(resumeFile);
  const { score, matchedKeywords } = generateScore(resumeText, jobDescription);
  return NextResponse.json({ score, matchedKeywords }, { status: 200 });
}
