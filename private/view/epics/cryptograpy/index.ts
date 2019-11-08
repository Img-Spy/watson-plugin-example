import { combineEpics }     from "redux-observable";

import State                from "@public/state";

import generateKeyPair      from "./generate-key-pair";
import encrypt              from "./encrypt";
import decrypt              from "./decrypt";


export default combineEpics<any, any, State>(
    generateKeyPair,
    encrypt,
    decrypt
);
