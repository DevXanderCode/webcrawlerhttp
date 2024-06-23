import { register } from "module";
import { pathToFileURL } from "url";

register(
  "ts-node/esm",
  pathToFileURL(new URL("./tsconfig.json", import.meta.url))
);

//     "start": "node --experimental-specifier-resolution=node --loader ts-node/esm ./src/main.ts",
//     "start": "node --loader ./loader.js src/main.ts",
