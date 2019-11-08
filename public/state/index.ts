import { FstState }                 from "watson-modules/fst-watcher";
import { TerminalModuleState }      from "watson-modules/terminal";

import { CryptographyModuleState }       from "../modules/cryptography";


interface WindowState {
    folder: string;
    uuid: string;
}

type ExplorerState =
     CryptographyModuleState &
     FstState &
     TerminalModuleState &
     WindowState;

export default ExplorerState;
