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
         CipherInfo }               from "@public/modules/cryptography";


const encrypt = (
    cipher: CipherInfo
): ApiCall<void> => (
    api
) => api
    .worker(workerInfo)
    .encrypt(cipher.fromFile, cipher.toFile, cipher.key);

type Input = CipherInfo;
const encryptEpic: ActionEpic<Input, State> = (
    action$, state$
) => action$.pipe(
    ofType(cryptographyTypes.ENCRYPT),
    pluck("payload"),
    switchMap((cipher) => api$(encrypt(cipher))),
    flatMap(() => [
        terminalActions.pushLine({
            level: "notice",
            text: `File encrypted properly`
        })
    ])
);

export default encryptEpic;
