import { KeyInfo } from "@public/modules/cryptography";

export default interface BackgroundMethods {
    generateKey(directoryPath: string, keyLength: number): KeyInfo;
    encrypt(fromFile: string, toFile: string, key: KeyInfo): void;
    decrypt(fromFile: string, toFile: string, key: KeyInfo): void;
}
