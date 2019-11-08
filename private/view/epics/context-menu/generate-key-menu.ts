import * as path                    from "path";
import { map,
         flatMap}                    from "rxjs/operators";
import { ofType }                   from "redux-observable";

import { ActionEpic }               from "watson-core";
import { terminalActions }          from "watson-modules/terminal";

import { ClickEvent,
         contextMenuOperations,
         contextMenuTypes }         from "watson-plugin-explorer/public/modules/context-menu";
import { contextMenuTags }          from "@public/context-menu";
import State                        from "@public/state";
import { cryptographyActions }      from "@public/modules/cryptography";


type Input = ClickEvent;
const generateKeyMenuEpic: ActionEpic<Input, State> = (
    action$, state$
) => action$.pipe(
    ofType(contextMenuTypes.CLICK),
    contextMenuOperations.withTag(contextMenuTags.GENERATE),
    map((action) => path.resolve(
        state$.value.folder,
        action.payload.item.path,
        "key.bin")
    ),
    flatMap((keyPath) => [
        terminalActions.pushLine({
            level: "notice",
            text: `Generating random key on folder ${keyPath}`
        }),
        cryptographyActions.generate(keyPath, 192)
    ])
);

export default generateKeyMenuEpic;
