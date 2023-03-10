import util from './util';
/*
 * Breaks any long edges in the graph into short segments that span 1 layer
 * each. This operation is undoable with the denormalize function.
 *
 * Pre-conditions:
 *
 *    1. The input graph is a DAG.
 *    2. Each node in the graph has a "rank" property.
 *
 * Post-condition:
 *
 *    1. All edges in the graph have a length of 1.
 *    2. Dummy nodes are added where edges have been split into segments.
 *    3. The graph is augmented with a "dummyChains" attribute which contains
 *       the first dummy in each chain of dummy nodes produced.
 */
const run = (g) => {
    g.graph().dummyChains = [];
    g.edges().forEach((edge) => normalizeEdge(g, edge));
};
const normalizeEdge = (g, e) => {
    var _a, _b;
    let v = e.v;
    let vRank = g.node(v).rank;
    const w = e.w;
    const wRank = g.node(w).rank;
    const name = e.name;
    const edgeLabel = g.edge(e);
    const labelRank = edgeLabel.labelRank;
    if (wRank === vRank + 1)
        return;
    g.removeEdge(e);
    let dummy;
    let attrs;
    let i;
    for (i = 0, ++vRank; vRank < wRank; ++i, ++vRank) {
        edgeLabel.points = [];
        attrs = {
            edgeLabel,
            width: 0,
            height: 0,
            edgeObj: e,
            rank: vRank
        };
        dummy = util.addDummyNode(g, "edge", attrs, "_d");
        if (vRank === labelRank) {
            attrs.width = edgeLabel.width;
            attrs.height = edgeLabel.height;
            attrs.dummy = "edge-label";
            attrs.labelpos = edgeLabel.labelpos;
        }
        g.setEdge(v, dummy, { weight: edgeLabel.weight }, name);
        if (i === 0) {
            if (!g.graph().dummyChains)
                g.graph().dummyChains = [];
            (_b = (_a = g.graph()) === null || _a === void 0 ? void 0 : _a.dummyChains) === null || _b === void 0 ? void 0 : _b.push(dummy);
        }
        v = dummy;
    }
    g.setEdge(v, w, { weight: edgeLabel.weight }, name);
};
const undo = (g) => {
    var _a;
    (_a = g.graph().dummyChains) === null || _a === void 0 ? void 0 : _a.forEach((v) => {
        var _a;
        let node = g.node(v);
        const origLabel = node.edgeLabel;
        let w;
        node.edgeObj && g.setEdge(node.edgeObj, origLabel);
        let currentV = v;
        while (node.dummy) {
            w = (_a = g.successors(currentV)) === null || _a === void 0 ? void 0 : _a[0];
            g.removeNode(currentV);
            origLabel.points.push({ x: node.x, y: node.y });
            if (node.dummy === "edge-label") {
                origLabel.x = node.x;
                origLabel.y = node.y;
                origLabel.width = node.width;
                origLabel.height = node.height;
            }
            currentV = w;
            node = g.node(currentV);
        }
    });
};
export default { run, undo };
//# sourceMappingURL=normalize.js.map