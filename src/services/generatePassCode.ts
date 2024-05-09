import { hash } from "./hash";

export function generatePassCodes(firstName: string, lastName: string, passCode: string): string {
    return hash((firstName+lastName).toUpperCase() +  passCode);
}