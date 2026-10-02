class Point {
    x;
    y;
    timeStamp;
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.timeStamp = Date.now();
    }
}
export class VelocityTracker {
    pointsLen;
    points = [];
    constructor(len = 5) {
        this.pointsLen = len;
        this.clear();
    }
    clear() {
        this.points = new Array(this.pointsLen);
    }
    addMovement({ x, y }) {
        this.points.pop();
        this.points.unshift(new Point(x, y));
    }
    getYAcceleration(lastPointCount = 1) {
        const endPoint = this.points[0];
        const startPoint = this.points[lastPointCount];
        if (!endPoint || !startPoint) {
            return 0;
        }
        return (endPoint.y - startPoint.y) / Math.pow(endPoint.timeStamp - startPoint.timeStamp, 2);
    }
}
//# sourceMappingURL=utils.js.map
