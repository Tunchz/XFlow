"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
var Base = /** @class */ (function () {
    function Base() {
        this.nodes = [];
        this.edges = [];
        this.combos = [];
        this.positions = [];
        this.destroyed = false;
        this.onLayoutEnd = function () { };
    }
    Base.prototype.layout = function (data) {
        this.init(data);
        return this.execute(true);
    };
    Base.prototype.init = function (data) {
        this.nodes = data.nodes || [];
        this.edges = data.edges || [];
        this.combos = data.combos || [];
    };
    Base.prototype.execute = function (reloadData) { };
    Base.prototype.executeWithWorker = function () { };
    Base.prototype.getDefaultCfg = function () {
        return {};
    };
    Base.prototype.updateCfg = function (cfg) {
        if (cfg) {
            Object.assign(this, cfg);
        }
    };
    Base.prototype.getType = function () {
        return 'base';
    };
    Base.prototype.destroy = function () {
        this.nodes = null;
        this.edges = null;
        this.combos = null;
        this.positions = null;
        this.destroyed = true;
    };
    return Base;
}());
exports.Base = Base;
//# sourceMappingURL=base.js.map