import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import { vec3 } from 'gl-matrix';
var tmpVecA = vec3.create();
var tmpVecB = vec3.create();
var tmpVecC = vec3.create();
var tmpVecD = vec3.create();
var tmpVecE = vec3.create();
/**
 * 包含求交方法：
 * * intersectsShape(Shape, intersection) 返回交点和求交结果
 * @see https://github.com/playcanvas/engine/blob/master/src/shape/bounding-box.js#L161
 * @see https://github.com/mrdoob/three.js/blob/dev/src/math/Ray.js
 */

export var Ray = /*#__PURE__*/function () {
  function Ray(origin, direction) {
    _classCallCheck(this, Ray);

    this.origin = void 0;
    this.direction = void 0;
    this.origin = origin || vec3.create();
    this.direction = direction || vec3.fromValues(0, 0, -1);
  }

  _createClass(Ray, [{
    key: "intersectsAABB",
    value: function intersectsAABB(aabb, intersection) {
      return intersection ? this.intersectAABBWithIntersection(aabb, intersection) : this.intersectsAABBWithoutIntersection(aabb);
    }
  }, {
    key: "intersectsSphere",
    value: function intersectsSphere(sphere, intersection) {
      var m = vec3.sub(tmpVecA, this.origin, sphere.center);
      vec3.normalize(tmpVecB, vec3.copy(tmpVecB, this.direction));
      var b = vec3.dot(m, tmpVecB);
      var c = vec3.dot(m, m) - sphere.radius * sphere.radius; // exit if ray's origin outside of sphere (c > 0) and ray pointing away from s (b > 0)

      if (c > 0 && b > 0) {
        return null;
      }

      var discr = b * b - c; // a negative discriminant corresponds to ray missing sphere

      if (discr < 0) {
        return false;
      } // ray intersects sphere, compute smallest t value of intersection


      var t = Math.abs(-b - Math.sqrt(discr)); // if t is negative, ray started inside sphere so clamp t to zero

      if (intersection) {
        vec3.copy(intersection, this.direction);
        vec3.scaleAndAdd(intersection, this.origin, intersection, t);
      }

      return true;
    }
  }, {
    key: "intersectsPlane",
    value: function intersectsPlane(plane, intersection) {
      var t = (plane.distance - vec3.dot(plane.normal, this.origin)) / vec3.dot(plane.normal, this.direction);
      var intersects = t >= 0;

      if (intersects && intersection) {
        vec3.scaleAndAdd(intersection, this.origin, this.direction, t);
      }

      return intersects;
    }
    /**
     * faster than implements like Three.js
     * @see https://github.com/playcanvas/engine/blob/master/src/shape/bounding-box.js#L161
     */

  }, {
    key: "intersectsAABBWithoutIntersection",
    value: function intersectsAABBWithoutIntersection(aabb) {
      var diff = tmpVecA;
      var cross = tmpVecB;
      var prod = tmpVecC;
      var absDiff = tmpVecD;
      var absDir = tmpVecE;
      var rayDir = this.direction;
      vec3.sub(diff, this.origin, aabb.center);
      vec3.set(absDiff, Math.abs(diff[0]), Math.abs(diff[1]), Math.abs(diff[2]));
      vec3.mul(prod, diff, rayDir);

      if (absDiff[0] > aabb.halfExtents[0] && prod[0] >= 0 || absDiff[1] > aabb.halfExtents[1] && prod[1] >= 0 || absDiff[2] > aabb.halfExtents[2] && prod[2] >= 0) {
        return false;
      }

      vec3.set(absDir, Math.abs(rayDir[0]), Math.abs(rayDir[1]), Math.abs(rayDir[2]));
      vec3.cross(cross, rayDir, diff);
      vec3.set(cross, Math.abs(cross[0]), Math.abs(cross[1]), Math.abs(cross[2]));
      return !(cross[0] > aabb.halfExtents[1] * absDir[2] + aabb.halfExtents[2] * absDir[1] || cross[1] > aabb.halfExtents[0] * absDir[2] + aabb.halfExtents[2] * absDir[0] || cross[2] > aabb.halfExtents[0] * absDir[1] + aabb.halfExtents[1] * absDir[0]);
    }
  }, {
    key: "intersectAABBWithIntersection",
    value: function intersectAABBWithIntersection(aabb, intersection) {
      var tMin = vec3.copy(vec3.create(), aabb.getMin());
      vec3.sub(tMin, tMin, this.origin);
      var tMax = vec3.copy(vec3.create(), aabb.getMax());
      vec3.sub(tMax, tMax, this.origin);
      var dir = this.direction; // Ensure that we are not dividing it by zero

      if (dir[0] === 0) {
        tMin[0] = tMin[0] < 0 ? -Number.MAX_VALUE : Number.MAX_VALUE;
        tMax[0] = tMax[0] < 0 ? -Number.MAX_VALUE : Number.MAX_VALUE;
      } else {
        tMin[0] /= dir[0];
        tMax[0] /= dir[0];
      }

      if (dir[1] === 0) {
        tMin[1] = tMin[1] < 0 ? -Number.MAX_VALUE : Number.MAX_VALUE;
        tMax[1] = tMax[1] < 0 ? -Number.MAX_VALUE : Number.MAX_VALUE;
      } else {
        tMin[1] /= dir[1];
        tMax[1] /= dir[1];
      }

      if (dir[2] === 0) {
        tMin[2] = tMin[2] < 0 ? -Number.MAX_VALUE : Number.MAX_VALUE;
        tMax[2] = tMax[2] < 0 ? -Number.MAX_VALUE : Number.MAX_VALUE;
      } else {
        tMin[2] /= dir[2];
        tMax[2] /= dir[2];
      }

      var realMin = vec3.set(tmpVecC, Math.min(tMin[0], tMax[0]), Math.min(tMin[1], tMax[1]), Math.min(tMin[2], tMax[2]));
      var realMax = vec3.set(tmpVecD, Math.max(tMin[0], tMax[0]), Math.max(tMin[1], tMax[1]), Math.max(tMin[2], tMax[2]));
      var minMax = Math.min(Math.min(realMax[0], realMax[1]), realMax[2]);
      var maxMin = Math.max(Math.max(realMin[0], realMin[1]), realMin[2]);
      var intersects = minMax >= maxMin && maxMin >= 0;

      if (intersects) {
        vec3.copy(intersection, this.direction);
        vec3.scaleAndAdd(intersection, this.origin, intersection, maxMin);
      }

      return intersects;
    }
  }]);

  return Ray;
}();
//# sourceMappingURL=Ray.js.map