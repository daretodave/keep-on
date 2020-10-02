import {System} from "../../model/system";

import {moveMouse, moveMouseSmooth, setMouseDelay} from "robotjs";
import {Strategy} from "../strategy";
import {print} from "../../core/logger";

export class MouseMouseSimple extends Strategy<mouseNudgeStrategyConfig> {

    async run(config: mouseNudgeStrategyConfig, host: System) {
        setMouseDelay(0);
        moveMouse(host.mouse.location.x, host.mouse.location.y);

        const target = host.mouse.location
            .add(config.mouseMoveX, config.mouseMoveY)
            .add(config.mouseMoveXRandomOffset, config.mouseMoveYRandomOffset, true);

        print('info-segment', `(x from: ${host.mouse.location.x} to: ${target.x}, y from: ${host.mouse.location.x} to: ${target.y}) `)

        moveMouseSmooth(target.x, target.y, config.mouseSpeed);
    }

}

export interface mouseNudgeStrategyConfig {
    mouseMoveX: number;
    mouseMoveY: number;
    mouseMoveXRandomOffset: number;
    mouseMoveYRandomOffset: number;
    mouseSpeed: number;
}