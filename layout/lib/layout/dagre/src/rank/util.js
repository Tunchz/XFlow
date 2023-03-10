"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slack = exports.longestPathWithLayer = exports.longestPath = void 0;
/*
 * Initializes ranks for the input graph using the longest path algorithm. This
 * algorithm scales well and is fast in practice, it yields rather poor
 * solutions. Nodes are pushed to the lowest layer possible, leaving the bottom
 * ranks wide and leaving edges longer than necessary. However, due to its
 * speed, this algorithm is good for getting an initial ranking that can be fed
 * into other algorithms.
 *
 * This algorithm does not normalize layers because it will be used by other
 * algorithms in most cases. If using this algorithm directly, be sure to
 * run normalize at the end.
 *
 * Pre-conditions:
 *
 *    1. Input graph is a DAG.
 *    2. Input graph node labels can be assigned properties.
 *
 * Post-conditions:
 *
 *    1. Each node will be assign an (unnormalized) "rank" property.
 */
var longestPath = function (g) {
    var _a;
    var visited = {};
    var dfs = function (v) {
        var _a;
        var label = g.node(v);
        if (visited.hasOwnProperty(v)) {
            return label.rank;
        }
        visited[v] = true;
        var lengths = (_a = g.outEdges(v)) === null || _a === void 0 ? void 0 : _a.map(function (e) {
            return (dfs(e.w) - g.edge(e).minlen) || Infinity;
        });
        var rank = Math.min.apply(Math, lengths);
        if (rank === Number.POSITIVE_INFINITY || // return value of _.map([]) for Lodash 3
            rank === undefined || // return value of _.map([]) for Lodash 4
            rank === null) { // return value of _.map([null])
            rank = 0;
        }
        label.rank = rank;
        return rank;
    };
    (_a = g.sources()) === null || _a === void 0 ? void 0 : _a.forEach(function (source) { return dfs(source); });
};
exports.longestPath = longestPath;
var longestPathWithLayer = function (g) {
    var _a;
    // 用longest path，找出最深的点
    var visited = {};
    var minRank = 0;
    var dfs = function (v) {
        var _a;
        var label = g.node(v);
        if (visited.hasOwnProperty(v)) {
            return label.rank;
        }
        visited[v] = true;
        var lengths = (_a = g.outEdges(v)) === null || _a === void 0 ? void 0 : _a.map(function (e) {
            return (dfs(e.w) - g.edge(e).minlen) || Infinity;
        });
        var rank = Math.min.apply(Math, lengths);
        if (rank === Number.POSITIVE_INFINITY || // return value of _.map([]) for Lodash 3
            rank === undefined || // return value of _.map([]) for Lodash 4
            rank === null) { // return value of _.map([null])
            rank = 0;
        }
        label.rank = rank;
        minRank = Math.min(label.rank, minRank);
        return label.rank;
    };
    (_a = g.sources()) === null || _a === void 0 ? void 0 : _a.forEach(function (source) { return dfs(source); });
    minRank += 1; // NOTE: 最小的层级是dummy root，+1
    // forward一遍，赋值层级
    var dfsForward = function (v, nextRank) {
        var _a;
        var label = g.node(v);
        var currRank = (!isNaN(label.layer) ? label.layer : nextRank);
        // 没有指定，取最大值
        if (label.rank === undefined || label.rank < currRank) {
            label.rank = currRank;
        }
        // DFS遍历子节点
        (_a = g.outEdges(v)) === null || _a === void 0 ? void 0 : _a.map(function (e) {
            dfsForward(e.w, currRank + g.edge(e).minlen);
        });
    };
    // 指定层级的，更新下游
    g.nodes().forEach(function (n) {
        var label = g.node(n);
        if (!isNaN(label.layer)) {
            dfsForward(n, label.layer); // 默认的dummy root所在层的rank是-1
        }
        else {
            label.rank -= minRank;
        }
    });
};
exports.longestPathWithLayer = longestPathWithLayer;
/*
 * Returns the amount of slack for the given edge. The slack is defined as the
 * difference between the length of the edge and its minimum length.
 */
var slack = function (g, e) {
    return g.node(e.w).rank - g.node(e.v).rank - g.edge(e).minlen;
};
exports.slack = slack;
exports.default = {
    longestPath: longestPath,
    longestPathWithLayer: longestPathWithLayer,
    slack: slack,
};
//# sourceMappingURL=util.js.map