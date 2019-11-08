import produce                  from "immer";

import { Reducer }              from "redux-actions";
import { reducerBuilder }       from "watson-core";

import { CryptographyModule,
         KeyInfo }              from "./cryptography.models";
import types                    from "./cryptography.types";



const finish: Reducer<CryptographyModule, KeyInfo> = (
    state, action
) => produce(state, (draft) => {
    const keyInfo = action.payload;

    draft.selectedKey = keyInfo;
    draft.keys[keyInfo.path] = keyInfo;
});

type Payload = KeyInfo;
export default reducerBuilder<CryptographyModule, Payload>({
    // [types.SELECT_FILE]: selectFile,
    // [types.ACTIVATE_FILE]: activateFile,

    // [types.OPEN_PANEL]: openPanel,
    [types.SELECT]: finish,
    [types.FINISH]: finish
}, {
    selectedKey: undefined,
    keys: {},
    lastCiphertext: undefined
});
