"use strict";
/**
 * @fileOverview random layout
 * @author shiwu.wyy@antfin.com
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircularLayout = void 0;
var base_1 = require("./base");
var util_1 = require("../util");
function initHierarchy(nodes, edges, nodeMap, directed) {
    nodes.forEach(function (_, i) {
        nodes[i].children = [];
        nodes[i].parent = [];
    });
    if (directed) {
        edges.forEach(function (e) {
            var source = (0, util_1.getEdgeTerminal)(e, 'source');
            var target = (0, util_1.getEdgeTerminal)(e, 'target');
            var sourceIdx = 0;
            if (source) {
                sourceIdx = nodeMap[source];
            }
            var targetIdx = 0;
            if (target) {
                targetIdx = nodeMap[target];
            }
            var child = nodes[sourceIdx].children;
            var parent = nodes[targetIdx].parent;
            child.push(nodes[targetIdx].id);
            parent.push(nodes[sourceIdx].id);
        });
    }
    else {
        edges.forEach(function (e) {
            var source = (0, util_1.getEdgeTerminal)(e, 'source');
            var target = (0, util_1.getEdgeTerminal)(e, 'target');
            var sourceIdx = 0;
            if (source) {
                sourceIdx = nodeMap[source];
            }
            var targetIdx = 0;
            if (target) {
                targetIdx = nodeMap[target];
            }
            var sourceChildren = nodes[sourceIdx].children;
            var targetChildren = nodes[targetIdx].children;
            sourceChildren.push(nodes[targetIdx].id);
            targetChildren.push(nodes[sourceIdx].id);
        });
    }
}
function connect(a, b, edges) {
    var m = edges.length;
    for (var i = 0; i < m; i++) {
        var source = (0, util_1.getEdgeTerminal)(edges[i], 'source');
        var target = (0, util_1.getEdgeTerminal)(edges[i], 'target');
        if ((a.id === source && b.id === target) ||
            (b.id === source && a.id === target)) {
            return true;
        }
    }
    return false;
}
function compareDegree(a, b) {
    var aDegree = a.degree;
    var bDegree = b.degree;
    if (aDegree < bDegree) {
        return -1;
    }
    if (aDegree > bDegree) {
        return 1;
    }
    return 0;
}
/**
 * ????????????
 */
var CircularLayout = /** @class */ (function (_super) {
    __extends(CircularLayout, _super);
    function CircularLayout(options) {
        var _this = _super.call(this) || this;
        /** ??????????????????????????? radius?????? startRadius ??? endRadius ????????? */
        _this.radius = null;
        /** ???????????? */
        _this.startRadius = null;
        /** ???????????? */
        _this.endRadius = null;
        /** ???????????? */
        _this.startAngle = 0;
        /** ???????????? */
        _this.endAngle = 2 * Math.PI;
        /** ??????????????? */
        _this.clockwise = true;
        /** ??????????????????????????????????????????????????????????????? endRadius - startRadius != 0 ????????? */
        _this.divisions = 1;
        /** ???????????????????????????????????????: 'topology', 'degree', 'null' */
        _this.ordering = null;
        /** how many 2*pi from first to last nodes */
        _this.angleRatio = 1;
        _this.nodes = [];
        _this.edges = [];
        _this.nodeMap = {};
        _this.degrees = [];
        _this.width = 300;
        _this.height = 300;
        _this.updateCfg(options);
        return _this;
    }
    CircularLayout.prototype.getDefaultCfg = function () {
        return {
            radius: null,
            startRadius: null,
            endRadius: null,
            startAngle: 0,
            endAngle: 2 * Math.PI,
            clockwise: true,
            divisions: 1,
            ordering: null,
            angleRatio: 1
        };
    };
    /**
     * ????????????
     */
    CircularLayout.prototype.execute = function () {
        var self = this;
        var nodes = self.nodes;
        var edges = self.edges;
        var n = nodes.length;
        if (n === 0) {
            if (self.onLayoutEnd)
                self.onLayoutEnd();
            return;
        }
        if (!self.width && typeof window !== "undefined") {
            self.width = window.innerWidth;
        }
        if (!self.height && typeof window !== "undefined") {
            self.height = window.innerHeight;
        }
        if (!self.center) {
            self.center = [self.width / 2, self.height / 2];
        }
        var center = self.center;
        if (n === 1) {
            nodes[0].x = center[0];
            nodes[0].y = center[1];
            if (self.onLayoutEnd)
                self.onLayoutEnd();
            return;
        }
        var radius = self.radius;
        var startRadius = self.startRadius;
        var endRadius = self.endRadius;
        var divisions = self.divisions;
        var startAngle = self.startAngle;
        var endAngle = self.endAngle;
        var angleStep = (endAngle - startAngle) / n;
        // layout
        var nodeMap = {};
        nodes.forEach(function (node, i) {
            nodeMap[node.id] = i;
        });
        self.nodeMap = nodeMap;
        var degrees = (0, util_1.getDegree)(nodes.length, nodeMap, edges);
        self.degrees = degrees;
        if (!radius && !startRadius && !endRadius) {
            radius = self.height > self.width ? self.width / 2 : self.height / 2;
        }
        else if (!startRadius && endRadius) {
            startRadius = endRadius;
        }
        else if (startRadius && !endRadius) {
            endRadius = startRadius;
        }
        var angleRatio = self.angleRatio;
        var astep = angleStep * angleRatio;
        var ordering = self.ordering;
        var layoutNodes = [];
        if (ordering === "topology") {
            // layout according to the topology
            layoutNodes = self.topologyOrdering();
        }
        else if (ordering === "topology-directed") {
            // layout according to the topology
            layoutNodes = self.topologyOrdering(true);
        }
        else if (ordering === "degree") {
            // layout according to the descent order of degrees
            layoutNodes = self.degreeOrdering();
        }
        else {
            // layout according to the original order in the data.nodes
            layoutNodes = nodes;
        }
        var clockwise = self.clockwise;
        var divN = Math.ceil(n / divisions); // node number in each division
        for (var i = 0; i < n; ++i) {
            var r = radius;
            if (!r && startRadius !== null && endRadius !== null) {
                r = startRadius + (i * (endRadius - startRadius)) / (n - 1);
            }
            if (!r) {
                r = 10 + (i * 100) / (n - 1);
            }
            var angle = startAngle +
                (i % divN) * astep +
                ((2 * Math.PI) / divisions) * Math.floor(i / divN);
            if (!clockwise) {
                angle =
                    endAngle -
                        (i % divN) * astep -
                        ((2 * Math.PI) / divisions) * Math.floor(i / divN);
            }
            layoutNodes[i].x = center[0] + Math.cos(angle) * r;
            layoutNodes[i].y = center[1] + Math.sin(angle) * r;
            layoutNodes[i].weight = degrees[i];
        }
        if (self.onLayoutEnd)
            self.onLayoutEnd();
        return {
            nodes: layoutNodes,
            edges: this.edges
        };
    };
    /**
     * ?????????????????????????????????
     * @return {array} orderedNodes ??????????????????
     */
    CircularLayout.prototype.topologyOrdering = function (directed) {
        if (directed === void 0) { directed = false; }
        var self = this;
        var degrees = self.degrees;
        var edges = self.edges;
        var nodes = self.nodes;
        var cnodes = (0, util_1.clone)(nodes);
        var nodeMap = self.nodeMap;
        var orderedCNodes = [cnodes[0]];
        var resNodes = [nodes[0]];
        var pickFlags = [];
        var n = nodes.length;
        pickFlags[0] = true;
        initHierarchy(cnodes, edges, nodeMap, directed);
        var k = 0;
        cnodes.forEach(function (cnode, i) {
            if (i !== 0) {
                if ((i === n - 1 ||
                    degrees[i] !== degrees[i + 1] ||
                    connect(orderedCNodes[k], cnode, edges)) &&
                    !pickFlags[i]) {
                    orderedCNodes.push(cnode);
                    resNodes.push(nodes[nodeMap[cnode.id]]);
                    pickFlags[i] = true;
                    k++;
                }
                else {
                    var children = orderedCNodes[k].children;
                    var foundChild = false;
                    for (var j = 0; j < children.length; j++) {
                        var childIdx = nodeMap[children[j]];
                        if (degrees[childIdx] === degrees[i] && !pickFlags[childIdx]) {
                            orderedCNodes.push(cnodes[childIdx]);
                            resNodes.push(nodes[nodeMap[cnodes[childIdx].id]]);
                            pickFlags[childIdx] = true;
                            foundChild = true;
                            break;
                        }
                    }
                    var ii = 0;
                    while (!foundChild) {
                        if (!pickFlags[ii]) {
                            orderedCNodes.push(cnodes[ii]);
                            resNodes.push(nodes[nodeMap[cnodes[ii].id]]);
                            pickFlags[ii] = true;
                            foundChild = true;
                        }
                        ii++;
                        if (ii === n) {
                            break;
                        }
                    }
                }
            }
        });
        return resNodes;
    };
    /**
     * ??????????????????????????????
     * @return {array} orderedNodes ??????????????????
     */
    CircularLayout.prototype.degreeOrdering = function () {
        var self = this;
        var nodes = self.nodes;
        var orderedNodes = [];
        var degrees = self.degrees;
        nodes.forEach(function (node, i) {
            node.degree = degrees[i];
            orderedNodes.push(node);
        });
        orderedNodes.sort(compareDegree);
        return orderedNodes;
    };
    CircularLayout.prototype.getType = function () {
        return "circular";
    };
    return CircularLayout;
}(base_1.Base));
exports.CircularLayout = CircularLayout;
//# sourceMappingURL=circular.js.map