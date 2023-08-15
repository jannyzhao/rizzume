import { NextResponse } from "next/server";
import { PdfReader } from "pdfreader";

const parsePdf = async (pdfFile: File) => {
  const resumeFileBuffer = Buffer.from(await pdfFile.arrayBuffer());
  let pdfText = "";
  return new Promise<string>((resolve, reject) => {
    new PdfReader({}).parseBuffer(resumeFileBuffer, (err, item) => {
      if (err) {
        reject(err);
      } else if (!item) {
        resolve(pdfText);
      } else if (item.text) {
        pdfText += item.text;
      }
    });
  });
};

const generateScore = (resumeText: string, jobDescription: string) => {
  // TODO: Remove common unimportant english prepositions, e.g. "to", "and", etc.
  const jobDescriptionKeywords = jobDescription
    .replaceAll(/\s+/g, " ")
    .split(" ");

  // TODO: Remove this when we use OCR to read the resume text instead.
  // Removes whitespace because pdf reader often adds whitespace in random places.
  const whitespaceRemovedResumeText = resumeText.replaceAll(/\s+/g, "");

  const matchedKeywords = jobDescriptionKeywords.reduce<string[]>(
    (matches, keyword) => {
      if (whitespaceRemovedResumeText.includes(keyword)) {
        return [...matches, keyword];
      }
      return matches;
    },
    [],
  );

  const score = Math.round(
    (matchedKeywords.length / jobDescriptionKeywords.length) * 100,
  );

  return {
    matchedKeywords,
    score,
  };
};

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
  const { matchedKeywords, score } = generateScore(resumeText, jobDescription);
  return NextResponse.json({ matchedKeywords, score }, { status: 200 });
}
