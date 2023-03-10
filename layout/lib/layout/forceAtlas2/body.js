"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// represents a body(a point mass) and its position
var Body = /** @class */ (function () {
    function Body(params) {
        /**
         * the id of this body, the same with the node id
         * @type  {number}
         */
        this.id = params.id || 0;
        /**
         * the position of this body
         * @type  {number}
         */
        this.rx = params.rx;
        /**
         * the position of this body
         * @type  {number}
         */
        this.ry = params.ry;
        /**
         * the force acting on this body
         * @type  {number}
         */
        this.fx = 0;
        /**
         * the force acting on this body
         * @type  {number}
         */
        this.fy = 0;
        /**
         * the mass of this body, =1 for a node
         * @type  {number}
         */
        this.mass = params.mass;
        /**
         * the degree of the node represented by this body
         * @type  {number}
         */
        this.degree = params.degree;
        /**
         * the parameter for repulsive force, = kr
         * @type  {number}
         */
        this.g = params.g || 0;
    }
    // returns the euclidean distance
    Body.prototype.distanceTo = function (bo) {
        var dx = this.rx - bo.rx;
        var dy = this.ry - bo.ry;
        return Math.hypot(dx, dy);
    };
    Body.prototype.setPos = function (x, y) {
        this.rx = x;
        this.ry = y;
    };
    // resets the forces
    Body.prototype.resetForce = function () {
        this.fx = 0;
        this.fy = 0;
    };
    Body.prototype.addForce = function (b) {
        var dx = b.rx - this.rx;
        var dy = b.ry - this.ry;
        var dist = Math.hypot(dx, dy);
        dist = dist < 0.0001 ? 0.0001 : dist;
        // the repulsive defined by force atlas 2
        var F = (this.g * (this.degree + 1) * (b.degree + 1)) / dist;
        this.fx += F * dx / dist;
        this.fy += F * dy / dist;
    };
    // if quad contains this body
    Body.prototype.in = function (quad) {
        return quad.contains(this.rx, this.ry);
    };
    // returns a new body
    Body.prototype.add = function (bo) {
        var nenwMass = this.mass + bo.mass;
        var x = (this.rx * this.mass + bo.rx * bo.mass) / nenwMass;
        var y = (this.ry * this.mass + bo.ry * bo.mass) / nenwMass;
        var dg = this.degree + bo.degree;
        var params = {
            rx: x,
            ry: y,
            mass: nenwMass,
            degree: dg
        };
        return new Body(params);
    };
    return Body;
}());
exports.default = Body;
//# sourceMappingURL=body.js.map