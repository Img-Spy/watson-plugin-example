import { combineEpics }     from "redux-observable";

import State                from "@public/state";

import generateKeyMenu      from "./generate-key-menu";
import useKeyMenu           from "./use-key-menu";
import encryptMenu          from "./encrypt-menu";
import decryptMenu          from "./decrypt-menu";


export default combineEpics<any, any, State>(
    generateKeyMenu,
    useKeyMenu,
    encryptMenu,
    decryptMenu
);
