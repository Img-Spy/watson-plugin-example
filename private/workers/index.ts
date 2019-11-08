import * as fs                      from "fs";
import * as path                    from "path";
import * as crypto                  from "crypto";
import { PluginWorkersBuilder }     from "watson-core";

import workerInfo                   from "@public/worker-info";


export default (workerBuilder: PluginWorkersBuilder) => {
    const handler = workerBuilder.createHandler(workerInfo);

    handler.generateKey((helper, keyPath, keyLength) => {
        // console.log();
        const key = crypto.randomBytes(keyLength / 8);
        fs.writeFileSync(keyPath, key);

        helper.send({
            path: keyPath,
            length: keyLength
        });
        helper.finish();
    });

    handler.encrypt((helper, fromFile, toFile, key) => {
        const keyBuffer = fs.readFileSync(key.path);
        const fromBuffer = fs.readFileSync(fromFile);

        const iv = crypto.randomBytes(16);

        const cipher = crypto.createCipheriv("aes-192-gcm", keyBuffer, iv);
        const encrypted = cipher.update(fromBuffer);
        const finalEncrypted = cipher.final();

        const toBuffer = Buffer.concat([
            iv,
            encrypted,
            finalEncrypted
        ]);

        fs.writeFileSync(toFile, toBuffer);

        helper.send();
        helper.finish();
    });

    handler.decrypt((helper, fromFile, toFile, key) => {
        const keyBuffer = fs.readFileSync(key.path);
        const fromBuffer = fs.readFileSync(fromFile);

        const iv = fromBuffer.slice(0, 16);
        const encrypted = fromBuffer.slice(16);

        const decipher = crypto.createDecipheriv("aes-192-gcm", keyBuffer, iv);

        const decrypted = decipher.update(encrypted);
        // FIXME: Error --> Unsupported state or unable to authenticate data
        // const finalDecrypted = decipher.final();

        const toBuffer = Buffer.concat([
            decrypted,
            // finalDecrypted
        ]);

        fs.writeFileSync(toFile, toBuffer);

        helper.send();
        helper.finish();
    });
};
