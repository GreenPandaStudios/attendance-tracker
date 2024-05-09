
import { SHA256 } from 'crypto-js';

export function hash(input: string): string {
    const hash = SHA256(input);
    return hash.toString(CryptoJS.enc.Hex);
}