import jwt from "jsonwebtoken";
import serverConfig from "../config/serverConfig.js";

const JwtUtility = {
    generateJWTToken: (userId: string) => {
        const payload = { id: userId };
        return jwt.sign(payload, serverConfig.JWT_SECRET!, { expiresIn: "1d" });
    }
}

export default JwtUtility;
