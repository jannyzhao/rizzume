import { NextResponse } from "next/server";
import { PdfReader } from "pdfreader";

const parsePdf = async (pdfFile: File) => {
  const resumeFileBuffer = Buffer.from(await pdfFile.arrayBuffer());
  let pdfText = "";
  return new Promise((resolve, reject) => {
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

  return NextResponse.json({ resumeText, jobDescription }, { status: 200 });
}
