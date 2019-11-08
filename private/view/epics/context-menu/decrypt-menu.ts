import * as path                    from "path";
import { Action }                   from "redux-actions";
import { remote }                   from "electron";
import { map, switchMap }            from "rxjs/operators";
import { ofType }                   from "redux-observable";

import { ActionEpic }               from "watson-core";
import { terminalActions }          from "watson-modules/terminal";

import { ClickEvent,
         contextMenuOperations,
         contextMenuTypes }         from "watson-plugin-explorer/public/modules/context-menu";
import { contextMenuTags }          from "@public/context-menu";
import State                        from "@public/state";
import { cryptographyActions }      from "@public/modules/cryptography";
import { Observable, Observer }     from "rxjs";

type ObservableCreator =  <T>(creator: (observer: Observer<T>) => void)
    => Observable<T>;
const createObservable: ObservableCreator =
    (creator) => Observable.create(creator);


type Input = ClickEvent;
const decryptEpic: ActionEpic<Input, State> = (
    action$, state$
) => action$.pipe(
    ofType(contextMenuTypes.CLICK),
    contextMenuOperations.withTag(contextMenuTags.DECRYPT),
    switchMap((action) => createObservable<Action<any>>((observer) => {
        const { folder, cryptography } = state$.value;
        const { item } = action.payload;

        if (!cryptography.selectedKey) {
            alert("No key selected!");
            return;
        }

        remote.dialog.showSaveDialog({
            title: "Decrypt file",
            defaultPath: `${folder}/${item.name}.dec`
        }, (toFile) => {
            if (!toFile) { return; }
            const fromFile = path.resolve(folder, item.path);

            observer.next(cryptographyActions.decrypt(
                fromFile,
                toFile,
                cryptography.selectedKey
            ));
            observer.next(terminalActions.pushLine({
                level: "notice",
                text: `Decrypt file "${item.name}" on path "${toFile}"`
            }));
            observer.complete();
        });
    }))
);

export default decryptEpic;
