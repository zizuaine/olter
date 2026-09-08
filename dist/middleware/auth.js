import jwt, {} from "jsonwebtoken";
import { getJwtSecret } from "../controllers/auth.controller.js";
export const AuthMiddleware = async (req, res, next) => {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        return res.status(401).json({
            message: "token header is missing"
        });
    }
    const token = tokenHeader?.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            message: "token not found"
        });
    }
    try {
        const decodedData = jwt.verify(token, getJwtSecret());
        if (typeof decodedData === "string" || !decodedData.id) {
            throw new Error("Invalid token payload");
        }
        req.userId = decodedData.id;
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: "jwt could not be verified"
        });
    }
};
//# sourceMappingURL=auth.js.map