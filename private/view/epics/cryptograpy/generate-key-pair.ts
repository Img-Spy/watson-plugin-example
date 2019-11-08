import { switchMap,
         pluck,
         flatMap }                  from "rxjs/operators";
import { ofType }                   from "redux-observable";

import { ActionEpic }               from "watson-core";
import { terminalActions }          from "watson-modules/terminal";
import { ApiCall,
         api$ }                     from "watson-api";

import State                        from "@public/state";
import workerInfo                   from "@public/worker-info";
import { cryptographyTypes,
         cryptographyActions,
         KeyInfo }                  from "@public/modules/cryptography";


const generateKeyPair = (
    keyInfo: KeyInfo
): ApiCall<KeyInfo> => (
    api
) => api
    .worker(workerInfo)
    .generateKey(keyInfo.path, keyInfo.length);

type Input = KeyInfo;
const generateKeyPairEpic: ActionEpic<Input, State> = (
    action$, state$
) => action$.pipe(
    ofType(cryptographyTypes.GENERATE),
    pluck("payload"),
    switchMap((keyInfo) => api$(generateKeyPair(keyInfo))),
    flatMap((result) => [
        terminalActions.pushLine({
            level: "notice",
            text: `Key file generated on folder --> ${result.path}`
        }),
        cryptographyActions.finish(result.path, result.length)
    ])
);

export default generateKeyPairEpic;
