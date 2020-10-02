import {get, SETTINGS} from "../core/settings";
import {IdleIntervalRuntime} from "./impl/idle-interval-runtime";

export const runtimeConfiguration = get("runtime", SETTINGS["runtime"]);

function getRuntime(key: string, config: any) {
    switch (key) {
        case "idleInterval":
            return new IdleIntervalRuntime(key, config);
        default:
            throw new Error(`${key} is not a runtime`);
    }
}



export const runtime = getRuntime(runtimeConfiguration.type, runtimeConfiguration);