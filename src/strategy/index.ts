import {MouseMouseSimple} from "./impl/mouse-nudge-strategy";
import {Strategy} from "./strategy";
import {get, SETTINGS} from "../core/settings";

export function getStrategy(key: string, config: any): Strategy<any> {
    switch (key) {
        case "mouseNudgeStrategy":
            return new MouseMouseSimple(key, config);
        default:
            throw new Error(`${key} is not a strategy`);
    }
}

export const strategies = Object.entries(get("strategies", SETTINGS["strategies"])).map((entry) => {
    const type: string = entry[0];
    const options: any  = entry[1];

    return getStrategy(type, options);
});