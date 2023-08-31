import { generateScore, parsePdf } from "@/app/api/score/_utils";
import { NextResponse } from "next/server";
import getAIResponse from "./_utils/getAIResponse";

export async function POST(request: Request) {
  const formData = await request.formData();
  const jobDescription = formData.get("jobDescription");
  const resumeFile = formData.get("resumeFile");

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
    return NextResponse.json({ error: "Missing resume text" }, { status: 400 });
  }
  if (typeof resumeFile === "string") {
    return NextResponse.json(
      { error: "Resume text is not a string" },
      { status: 400 },
    );
  }

  const resumeText = await parsePdf(resumeFile);
  const { score, matchedKeywords } = generateScore(resumeText, jobDescription);
  const aiResponse = await getAIResponse(resumeText, jobDescription);
  return NextResponse.json(
    { score, matchedKeywords, aiResponse },
    { status: 200 },
  );
}
