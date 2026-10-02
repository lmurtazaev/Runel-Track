declare class Point {
    x: number;
    y: number;
    timeStamp: number;
    constructor(x: number, y: number);
}
export declare class VelocityTracker {
    pointsLen: number;
    points: Point[];
    constructor(len?: number);
    clear(): void;
    addMovement({ x, y }: {
        x: number;
        y: number;
    }): void;
    getYAcceleration(lastPointCount?: number): number;
}
export {};
