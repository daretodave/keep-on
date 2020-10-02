import {Runtime, RuntimeConfiguration} from "../runtime";
import {BehaviorSubject, fromEvent, interval, merge, Subscription, timer} from "rxjs";
import {hostEvents} from "../../core/host";
import {filter, map, switchMap} from "rxjs/operators";
import {info} from "../../core/logger";

export class IdleIntervalRuntime extends Runtime<IntervalRuntimeConfiguration>{

    paused = new BehaviorSubject(false)

    runtimeSubscription: Subscription;
    idleSubscription: Subscription;

    async start() {
        const idle = new BehaviorSubject(false)

        hostEvents.start();

        this.idleSubscription = merge(fromEvent(hostEvents, '*'))
            .pipe(switchMap(() => timer(0, this.config.idleTimeout)))
            .pipe(map(idleTime => idleTime !== 0))
            .subscribe(state => idle.next(state))

        const total = this.config.idleEventInternal + this.config.idleEventIntervalRandomOffset;

        this.runtimeSubscription = interval(total)
            .pipe(filter(() => !this.paused.getValue() && idle.getValue()))
            .subscribe(() => {
                const eventTime = Math.round(
                    Math.max(0, Math.random() * this.config.idleEventIntervalRandomOffset)
                );

                setTimeout(() => {
                    const task = this.run().catch(error => error("error running interval-runtime", error));

                }, eventTime);
            })
    }

    async stop() {
        this.runtimeSubscription.unsubscribe();
        this.idleSubscription.unsubscribe();

        hostEvents.stop();
    }

    async shortcut(event: string) {
        switch(event) {
            case "stop":
                info(`# stopping...`);

                process.exit(0);
                break;
            case "pause":
                this.paused.next(!this.paused.getValue());

                info(`+ paused: ${this.paused.getValue()}`)
                break;
            default:
                throw new Error(`no shortcut handler for event: ${event}`);
        }
    }

}

export interface IntervalRuntimeConfiguration extends RuntimeConfiguration {
    idleTimeout: number;
    idleEventInternal: number;
    idleEventIntervalRandomOffset: number;
}