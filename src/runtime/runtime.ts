import {strategies} from "../strategy";
import {print} from "../core/logger";
import {System} from "../model/system";

export abstract class Runtime<C extends RuntimeConfiguration> {

    constructor(public name: string, public config: C) {
    }

    abstract async start();

    abstract async stop();

    abstract async shortcut(event: string);

    run() {
        const work = [];

        print("info-segment", ` > idle, running ${this.name}`);

        for (let strategy of strategies) {
            print("info-segment", ` | running ${strategy.name}`);

            work.push(strategy.run(strategy.config, new System()));
        }

        return Promise.all(work).then(() => {
            print("info-segment", ` | done \n`);
        })
    }

}

export interface RuntimeConfiguration {
    type: string;
}