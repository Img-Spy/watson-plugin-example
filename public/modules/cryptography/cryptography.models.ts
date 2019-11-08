export interface CryptographyModuleState {
    cryptography: CryptographyModule;
}

export interface CryptographyModule {
    selectedKey: KeyInfo;
    keys: { [k: string]: KeyInfo };
    lastCiphertext: string;
}

export interface KeyInfo {
    path: string;
    length: number;
}

export interface CipherInfo {
    fromFile: string;
    toFile: string;
    key: KeyInfo;
}
