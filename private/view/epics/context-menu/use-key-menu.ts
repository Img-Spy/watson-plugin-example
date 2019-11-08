import * as path                    from "path";
import { map }                      from "rxjs/operators";
import { ofType }                   from "redux-observable";

import { ActionEpic }               from "watson-core";

import { ClickEvent,
         contextMenuOperations,
         contextMenuTypes }         from "watson-plugin-explorer/public/modules/context-menu";
import { contextMenuTags }          from "@public/context-menu";
import State                        from "@public/state";
import { cryptographyActions }      from "@public/modules/cryptography";


type Input = ClickEvent;
const useKeyMenuEpic: ActionEpic<Input, State> = (
    action$, state$
) => action$.pipe(
    ofType(contextMenuTypes.CLICK),
    contextMenuOperations.withTag(contextMenuTags.USE),
    map((action) => path.resolve(
        state$.value.folder,
        action.payload.item.path)
    ),
    map((keyPath) => cryptographyActions.select(keyPath))
);

export default useKeyMenuEpic;
