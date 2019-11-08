import { ContextMenuItem }  from "watson-plugin-explorer/public/modules/context-menu";
import tags                 from "./tags";


const menu: ContextMenuItem[] = [
    // Directory
    { text: "Generate key", tag: tags.GENERATE, group: "cryptography",
      type: "directory", address: "physical" },

    { text: "Encrypt", tag: tags.ENCRYPT, group: "cryptography",
      type: "file", address: "physical" },
    { text: "Decrypt", tag: tags.DECRYPT, group: "cryptography",
      type: "file", address: "physical" },
    { text: "Use key", tag: tags.USE, group: "cryptography",
      type: "file" },
];

export default menu;
