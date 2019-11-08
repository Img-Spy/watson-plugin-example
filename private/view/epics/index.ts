import { combineEpics }         from "redux-observable";

import State                    from "@public/state";

import contextMenu              from "./context-menu";
import cryptography                  from "./cryptograpy";


export default combineEpics<any, any, State>(
    contextMenu,
    cryptography
);
