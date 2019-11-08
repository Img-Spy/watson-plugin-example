import { Action }               from "redux-actions";
import types                    from "./cryptography.types";
import { KeyInfo, CipherInfo }              from "./cryptography.models";


const generate = (
    keyPath: string,
    keyLength: number
): Action<KeyInfo> => ({
    type: types.GENERATE,
    payload: {
        path: keyPath,
        length: keyLength
    }
});

const select = (
    keyPath: string
): Action<KeyInfo> => ({
    type: types.SELECT,
    payload: {
        path: keyPath,
        length: 0
    }
});

const encrypt = (
    fromFile: string,
    toFile: string,
    key: KeyInfo
): Action<CipherInfo> => ({
    type: types.ENCRYPT,
    payload: { fromFile, toFile, key }
});

const decrypt = (
    fromFile: string,
    toFile: string,
    key: KeyInfo
): Action<CipherInfo> => ({
    type: types.DECRYPT,
    payload: { fromFile, toFile, key }
});


const finish = (
    keyPath: string,
    keyLength: number
): Action<KeyInfo> => ({
    type: types.FINISH,
    payload: {
        path: keyPath,
        length: keyLength
    }
});

export default {
    generate,
    select,
    encrypt,
    decrypt,
    finish
};
