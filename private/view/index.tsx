import * as React               from "react";
import { PluginViewBuilder }    from "watson-core";
import { contextMenuModule }    from "watson-plugin-explorer/public/modules";

import { cryptographyModule }   from "@public/modules";
import contextMenu              from "@public/context-menu";
import State                    from "@public/state";

import { Cryptography }         from "./apps";
import globalEpic               from "./epics";


export default (viewBuilder: PluginViewBuilder<State>) => {
    const { contextMenuActions } = contextMenuModule;

    viewBuilder
        .setGlobalEpic(globalEpic)
        .onStart((dispatch) => {
            contextMenu.forEach((menuItem) => {
                const action = contextMenuActions.add(menuItem);
                dispatch(action);
            });
        })
        .addReDuckModule(cryptographyModule)
        .addApp("Cryptography", <Cryptography/>, {
            icon: "user-secret"
        });
};
