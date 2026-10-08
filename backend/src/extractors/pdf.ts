import { PDFParse } from "pdf-parse";
import { UrlValidator } from "../security/validateUrl.js";
import axios, { isAxiosError } from "axios";
import fs from "node:fs/promises";
import { ApiError } from "../utils/ApiError.js";
import type { ExtractedContent } from "../types/extracted-content.js";

export const parsePDF = async (
    source: string | Express.Multer.File
): Promise<ExtractedContent> => {

    let pdfBuffer: Buffer;

    if (typeof source === "string") {
        const { url, safeIp, family } = await UrlValidator(source);

        try {
            const response = await axios.get(url, {
                responseType: "arraybuffer",
                maxRedirects: 0,
                maxContentLength: 15 * 1024 * 1024,
                timeout: 15000,
                headers: { "User-Agent": "Mozilla/5.0" },
                lookup: (_hostname, options: any, callback: any) => {
                    if (options?.all) {
                        callback(null, [{ address: safeIp, family }]);
                    } else {
                        callback(null, safeIp, family)
                    }
                }
            });

            pdfBuffer = Buffer.from(response.data)

        } catch (error: unknown) {
            if (isAxiosError(error)) {
                if (error.response?.status && [301, 302, 303, 307, 308].includes(error.response.status)) {
                    const redirectUrl = error.response.headers["location"];
                    throw new ApiError(400, "REDIRECT_NOT_ALLOWED", `Redirects are disabled. The server tried to send you to: ${redirectUrl}`);
                }
                if (error.code === "ECONNABORTED") {
                    throw new ApiError(504, "TIMEOUT", "Request to target URL timed out");
                }
                throw new ApiError(400, "FETCH_FAILED", error.message || "Failed to fetch URL content");
            }
            throw error;
        }
    } else {
        if (source.buffer) {
            pdfBuffer = source.buffer;
        } else if (source.path) {
            pdfBuffer = await fs.readFile(source.path)
        } else {
            throw new ApiError(400, "INVALID_FILE", "Uploaded file has no readable content");
        }
    }

    const parser = new PDFParse({
        data: pdfBuffer
    });

    try {
        const parsedData = await parser.getText();

        const cleanedContent = parsedData.text
            .replace(/\r?\n/g, " ")
            .replace(/\s+/g, " ")
            .trim();
        if (!cleanedContent) {
            throw new ApiError(422, "EMPTY_PDF", "No readable text content found in the PDF");
        }
        return {
            content: cleanedContent,
            sitename: "PDF",
        };
    } finally {
        await parser.destroy();
    }

};