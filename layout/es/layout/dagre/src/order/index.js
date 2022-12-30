import initOrder from './init-order';
import crossCount from './cross-count';
import buildLayerGraph from './build-layer-graph';
import addSubgraphConstraints from './add-subgraph-constraints';
import sortSubgraph from './sort-subgraph';
import graphlib from '../graphlib';
import util from '../util';
import { clone } from '../../../../util';
const Graph = graphlib.Graph;
/*
 * Applies heuristics to minimize edge crossings in the graph and sets the best
 * order solution as an order attribute on each node.
 *
 * Pre-conditions:
 *
 *    1. Graph must be DAG
 *    2. Graph nodes must be objects with a "rank" attribute
 *    3. Graph edges must have the "weight" attribute
 *
 * Post-conditions:
 *
 *    1. Graph nodes will have an "order" attribute based on the results of the
 *       algorithm.
 */
const order = (g) => {
    const maxRank = util.maxRank(g);
    const range1 = [];
    const range2 = [];
    for (let i = 1; i < maxRank + 1; i++)
        range1.push(i);
    for (let i = maxRank - 1; i > -1; i--)
        range2.push(i);
    const downLayerGraphs = buildLayerGraphs(g, range1, "inEdges");
    const upLayerGraphs = buildLayerGraphs(g, range2, "outEdges");
    let layering = initOrder(g);
    assignOrder(g, layering);
    let bestCC = Number.POSITIVE_INFINITY;
    let best;
    for (let i = 0, lastBest = 0; lastBest < 4; ++i, ++lastBest) {
        sweepLayerGraphs(i % 2 ? downLayerGraphs : upLayerGraphs, i % 4 >= 2);
        layering = util.buildLayerMatrix(g);
        const cc = crossCount(g, layering);
        if (cc < bestCC) {
            lastBest = 0;
            best = clone(layering);
            bestCC = cc;
        }
    }
    // consider use previous result, maybe somewhat reduendant
    layering = initOrder(g);
    assignOrder(g, layering);
    for (let i = 0, lastBest = 0; lastBest < 4; ++i, ++lastBest) {
        sweepLayerGraphs(i % 2 ? downLayerGraphs : upLayerGraphs, i % 4 >= 2, true);
        layering = util.buildLayerMatrix(g);
        const cc = crossCount(g, layering);
        if (cc < bestCC) {
            lastBest = 0;
            best = clone(layering);
            bestCC = cc;
        }
    }
    assignOrder(g, best);
};
const buildLayerGraphs = (g, ranks, relationship) => {
    return ranks.map((rank) => {
        return buildLayerGraph(g, rank, relationship);
    });
};
const sweepLayerGraphs = (layerGraphs, biasRight, usePrev) => {
    const cg = new Graph();
    layerGraphs === null || layerGraphs === void 0 ? void 0 : layerGraphs.forEach((lg) => {
        var _a;
        const root = lg.graph().root;
        const sorted = sortSubgraph(lg, root, cg, biasRight, usePrev);
        for (let i = 0; i < ((_a = sorted.vs) === null || _a === void 0 ? void 0 : _a.length) || 0; i++) {
            lg.node(sorted.vs[i]).order = i;
        }
        addSubgraphConstraints(lg, cg, sorted.vs);
    });
};
const assignOrder = (g, layering) => {
    layering === null || layering === void 0 ? void 0 : layering.forEach((layer) => {
        layer === null || layer === void 0 ? void 0 : layer.forEach((v, i) => {
            g.node(v).order = i;
        });
    });
};
export default order;
//# sourceMappingURL=index.js.map