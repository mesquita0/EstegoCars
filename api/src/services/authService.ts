import jwt, { JwtPayload } from "jsonwebtoken";
import { private_key } from "../configs/auth.config";

function checkAuth(token: string): boolean {
  try {
    jwt.verify(token, private_key);
    return true;
  }
  catch (err) {
    return false;
  }
}

function generateToken(user_id: number): string {
  return jwt.sign({ id: user_id }, private_key);
}

function decodeAuth(token: string): JwtPayload {
  return jwt.decode(token) as JwtPayload;
}

export { checkAuth, generateToken, decodeAuth };
