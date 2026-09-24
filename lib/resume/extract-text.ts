import { PDFParse } from "pdf-parse";

async function parsePdfBuffer(buffer: Buffer): Promise<string> {
  const parser = new PDFParse({ data: buffer });

  try {
    const result = await parser.getText();
    return result.text.trim();
  } catch (err) {
    throw new Error(
      err instanceof Error
        ? `Couldn't extract text from this PDF: ${err.message}`
        : "Couldn't extract text from this PDF.",
    );
  } finally {
    await parser.destroy();
  }
}

export async function extractResumeText(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const name = file.name.toLowerCase();

  if (name.endsWith(".pdf") || file.type === "application/pdf") {
    return parsePdfBuffer(buffer);
  }

  if (name.endsWith(".docx") || file.type.includes("wordprocessingml")) {
    const mammoth = await import("mammoth");
    const result = await mammoth.extractRawText({ buffer });
    return result.value.trim();
  }

  if (name.endsWith(".doc")) {
    throw new Error(
      "Legacy .doc files aren't supported — please upload .docx or .pdf.",
    );
  }

  return buffer.toString("utf-8").trim();
}
