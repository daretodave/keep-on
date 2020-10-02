import {error, info} from "./core/logger";
import {runtime} from "./runtime";

export async function start() {
    info(`running runtime:${runtime.name} | config: `, runtime.config);

    runtime.start().catch(error)
}

start().catch(error);