export type PointLike = ({x: number, y: number});
export class Point implements PointLike {

    constructor(public x: number, public y: number) {
    }

    static toPoint(pointLike: PointLike) {
        return new Point(pointLike.x, pointLike.y);
    }

    add(x: number, y: number, random: boolean = false) {
        if (random) {
            x = Math.round(Math.random() * x);
            y = Math.round(Math.random() * y);
        }

        return new Point(x + this.x, y + this.y);
    }


}