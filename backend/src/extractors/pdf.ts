import { PDFParse } from "pdf-parse";

import type { ExtractedContent } from "../types/extracted-content.js";

export const parsePDF = async (
    source: string | Express.Multer.File
): Promise<ExtractedContent> => {

    let parser: PDFParse;

    if (typeof source === "string") {

        parser = new PDFParse({
            url: source
        });

    } else {

        parser = new PDFParse({
            url: source.path
        });

    }

    const result = await parser.getText();

    if (!result) {
        throw new Error("PDF file not found");
    }

    const cleanedContent = result.text
        .replace(/\r?\n/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    return {
        content: cleanedContent,
        sitename: "PDF",
    };
};