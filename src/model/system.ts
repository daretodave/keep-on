import {Point} from "./point";
import {getMousePos} from "robotjs";

export class System {

    mouse: Mouse;

    constructor() {
        this.mouse = {
            location: Point.toPoint(getMousePos())
        }
    }
}

export interface Mouse {

    location: Point;

}