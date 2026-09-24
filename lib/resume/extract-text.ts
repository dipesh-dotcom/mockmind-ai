function parsePdfBuffer(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const PDFParser = require("pdf2json");
    const pdfParser = new PDFParser(null, 1);

    pdfParser.on("pdfParser_dataError", (errData: any) => {
      reject(
        new Error(
          errData?.parserError?.message ??
            "Couldn't extract text from this PDF.",
        ),
      );
    });

    pdfParser.on("pdfParser_dataReady", () => {
      const text = pdfParser.getRawTextContent();
      resolve(text.trim());
    });

    pdfParser.parseBuffer(buffer);
  });
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
