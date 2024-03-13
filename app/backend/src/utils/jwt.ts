import * as jwt from 'jsonwebtoken';
import TokenPayload from '../Interfaces/Token/TokenPayload';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const sign = (payload: TokenPayload): string =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: '3d' });

export const verifyToken = (token: string): TokenPayload =>
  jwt.verify(token, JWT_SECRET) as TokenPayload;
