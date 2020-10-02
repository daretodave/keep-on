import {System} from "../model/system";

export abstract class Strategy<C> {

    public constructor(public name: string, public config: C) {
    }

    abstract async run(config: C, host: System): Promise<any>;

}