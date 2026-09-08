import axios from "axios";
import { PDFParse } from "pdf-parse";
import type { ExtractedContent } from "../types/extracted-content.js";

export const parsePDF = async (link: string): Promise<ExtractedContent> => {
    const parser = new PDFParse({ url: link });

    const result = await parser.getText();

    if (!result) {
        throw new Error("PDF file not found")
    }

    const cleanedContent = result.text
        .replace(/\r?\n/g, " ")
        .replace(/\s+/g, " ")
        .trim()

    return {
        content: cleanedContent,
        sitename: "PDF",
    }

}




