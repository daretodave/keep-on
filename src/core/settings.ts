import {homedir} from "os";
import {join} from "path";

import {ensureDirSync, pathExistsSync, readJSONSync, writeJSONSync} from "fs-extra";
import {info} from "./logger";
import {copyFileSync} from "fs";

export const SETTINGS_DIR = join(homedir(), ".keep-on");
export const SETTINGS_FILE = join(SETTINGS_DIR, "default.json");
export const SETTINGS_FILE_DEFAULT = join(__dirname, "..", "..", "default.json");
export const SETTINGS = readJSONSync(SETTINGS_FILE_DEFAULT);

process.env["NODE_CONFIG_DIR"] = SETTINGS_DIR;

const config = require('config');

ensureDirSync(SETTINGS_DIR);

if (!pathExistsSync(SETTINGS_FILE)) {
    info(`${SETTINGS_FILE} not found, creating`);

    copyFileSync(join(__dirname, "..", "default.json"), SETTINGS_FILE)
}

export function get<T>(key: string, fallback: T = SETTINGS[key]): T {
    if (config.has(key)) {
        return config.get(key);
    }

    return fallback;
}

export function configuration(keyFallbackMap) {
    return Object.keys(keyFallbackMap).reduce((config, key) => {
        const fallback = keyFallbackMap[key];
        if (typeof fallback === "function") {
            config[key] = fallback((key) => get(key, keyFallbackMap[key]));
        } else {
            config[key] = get(key, fallback);
        }

        return config;
    }, {});
}