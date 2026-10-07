import { ApiError } from "../utils/ApiError.js";
import dns from "node:dns/promises";
import net from "net";

type ValidateUrl = {
    url: string;
    safeIp: string;
}

const isBlockedIp = (ip: string): boolean => {
    return (
        ip.startsWith("127.") ||
        ip.startsWith("10.") ||
        ip.startsWith("192.168.") ||
        ip.startsWith("169.254.") ||
        /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(ip) ||
        ip === "::1" ||
        ip.startsWith("fc00:")
    );
}
const ALLOWED_PORTS = ["", "80", "443"];

export const UrlValidator = async (string: string): Promise<ValidateUrl> => {
    let url: URL;
    try {
        url = new URL(string);
    } catch {
        throw new ApiError(400, "INVALID URL", "Invalid URL");
    }

    if (url.protocol !== "http:" && url.protocol !== "https:") {
        throw new ApiError(400, "INVALID URL", "Only http and https are allowed");
    }

    if (url.username || url.password) {
        throw new ApiError(401, "INVALID", "URLs with credentials are not allowed");
    }


    if (!ALLOWED_PORTS.includes(url.port)) {
        throw new ApiError(401, "UNAUTHORIZED", `PORT ${url.port} is not allowed`)
    }

    let safeIp: string;

    if (net.isIP(url.hostname)) {

        if (isBlockedIp(url.hostname)) {
            throw new ApiError(
                400,
                "INVALID_URL",
                "Destination IP address is not allowed"
            );
        }

        safeIp = url.hostname;

    } else {

        let addresses;

        try {
            addresses = await dns.lookup(
                url.hostname,
                { all: true }
            );
        } catch {
            throw new ApiError(400, "INVALID_URL", "Could not resolve hostname");
        }


        if (addresses.length === 0) {
            throw new ApiError(400, "INVALID_URL", "Could not resolve hostname");
        }

        for (const { address } of addresses) {

            if (isBlockedIp(address)) {
                throw new ApiError(
                    400,
                    "INVALID_URL",
                    "Destination IP address is not allowed"
                );
            }
        }

        const firstAddress = addresses[0];

        if (!firstAddress) {
            throw new ApiError(400, "INVALID_URL", "Could not resolve hostname");
        }

        safeIp = firstAddress.address;
    }

    return {
        url: url.toString(),
        safeIp
    }
}