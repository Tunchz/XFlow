const parentDummyChains = (g) => {
    var _a;
    const postorderNums = postorder(g);
    (_a = g.graph().dummyChains) === null || _a === void 0 ? void 0 : _a.forEach((v) => {
        var _a, _b;
        let node = g.node(v);
        const edgeObj = node.edgeObj;
        if (!edgeObj)
            return;
        const pathData = findPath(g, postorderNums, edgeObj.v, edgeObj.w);
        const path = pathData.path;
        const lca = pathData.lca;
        let pathIdx = 0;
        let pathV = path[pathIdx];
        let ascending = true;
        while (v !== edgeObj.w) {
            node = g.node(v);
            if (ascending) {
                while ((pathV = path[pathIdx]) !== lca &&
                    g.node(pathV).maxRank < node.rank) {
                    pathIdx++;
                }
                if (pathV === lca) {
                    ascending = false;
                }
            }
            if (!ascending) {
                while (pathIdx < path.length - 1 &&
                    ((_a = g.node(pathV = path[pathIdx + 1])) === null || _a === void 0 ? void 0 : _a.minRank) <= node.rank) {
                    pathIdx++;
                }
                pathV = path[pathIdx];
            }
            g.setParent(v, pathV);
            // tslint:disable-next-line
            v = (_b = g.successors(v)) === null || _b === void 0 ? void 0 : _b[0];
        }
    });
};
// Find a path from v to w through the lowest common ancestor (LCA). Return the
// full path and the LCA.
const findPath = (g, postorderNums, v, w) => {
    const vPath = [];
    const wPath = [];
    const low = Math.min(postorderNums[v].low, postorderNums[w].low);
    const lim = Math.max(postorderNums[v].lim, postorderNums[w].lim);
    let parent;
    let lca;
    // Traverse up from v to find the LCA
    parent = v;
    do {
        parent = g.parent(parent);
        vPath.push(parent);
    } while (parent &&
        (postorderNums[parent].low > low || lim > postorderNums[parent].lim));
    lca = parent;
    // Traverse from w to LCA
    parent = w;
    while ((parent = g.parent(parent)) !== lca) {
        wPath.push(parent);
    }
    return { lca, path: vPath.concat(wPath.reverse()) };
};
const postorder = (g) => {
    var _a;
    const result = {};
    let lim = 0;
    const dfs = (v) => {
        var _a;
        const low = lim;
        (_a = g.children(v)) === null || _a === void 0 ? void 0 : _a.forEach(dfs);
        result[v] = { low, lim: lim++ };
    };
    (_a = g.children()) === null || _a === void 0 ? void 0 : _a.forEach(dfs);
    return result;
};
export default parentDummyChains;
//# sourceMappingURL=parent-dummy-chains.js.map