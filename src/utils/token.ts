import jwt from 'jsonwebtoken';
import { verify } from 'node:crypto';

function generateRefreshToken(userId: string): string {
    const payload = {id: userId};
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "7d"
    });

    return token;
}

function generateAccessToken(userId: string): string {
    const payload = {id: userId};
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "15m"
    });

    return token;
}

// function verifyToken(token: string, secret: string): string{
//     const decodeToken = jwt.verify(token, secret)
//     return decodeToken
// }

export { generateRefreshToken, generateAccessToken }
