import { PdfReader } from "pdfreader";

export const parsePdf = async (pdfFile: File): Promise<string> => {
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
