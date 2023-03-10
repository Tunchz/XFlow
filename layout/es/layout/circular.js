/**
 * @fileOverview random layout
 * @author shiwu.wyy@antfin.com
 */
import { Base } from "./base";
import { getDegree, clone, getEdgeTerminal } from "../util";
function initHierarchy(nodes, edges, nodeMap, directed) {
    nodes.forEach((_, i) => {
        nodes[i].children = [];
        nodes[i].parent = [];
    });
    if (directed) {
        edges.forEach((e) => {
            const source = getEdgeTerminal(e, 'source');
            const target = getEdgeTerminal(e, 'target');
            let sourceIdx = 0;
            if (source) {
                sourceIdx = nodeMap[source];
            }
            let targetIdx = 0;
            if (target) {
                targetIdx = nodeMap[target];
            }
            const child = nodes[sourceIdx].children;
            const parent = nodes[targetIdx].parent;
            child.push(nodes[targetIdx].id);
            parent.push(nodes[sourceIdx].id);
        });
    }
    else {
        edges.forEach((e) => {
            const source = getEdgeTerminal(e, 'source');
            const target = getEdgeTerminal(e, 'target');
            let sourceIdx = 0;
            if (source) {
                sourceIdx = nodeMap[source];
            }
            let targetIdx = 0;
            if (target) {
                targetIdx = nodeMap[target];
            }
            const sourceChildren = nodes[sourceIdx].children;
            const targetChildren = nodes[targetIdx].children;
            sourceChildren.push(nodes[targetIdx].id);
            targetChildren.push(nodes[sourceIdx].id);
        });
    }
}
function connect(a, b, edges) {
    const m = edges.length;
    for (let i = 0; i < m; i++) {
        const source = getEdgeTerminal(edges[i], 'source');
        const target = getEdgeTerminal(edges[i], 'target');
        if ((a.id === source && b.id === target) ||
            (b.id === source && a.id === target)) {
            return true;
        }
    }
    return false;
}
function compareDegree(a, b) {
    const aDegree = a.degree;
    const bDegree = b.degree;
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
export class CircularLayout extends Base {
    constructor(options) {
        super();
        /** ??????????????????????????? radius?????? startRadius ??? endRadius ????????? */
        this.radius = null;
        /** ???????????? */
        this.startRadius = null;
        /** ???????????? */
        this.endRadius = null;
        /** ???????????? */
        this.startAngle = 0;
        /** ???????????? */
        this.endAngle = 2 * Math.PI;
        /** ??????????????? */
        this.clockwise = true;
        /** ??????????????????????????????????????????????????????????????? endRadius - startRadius != 0 ????????? */
        this.divisions = 1;
        /** ???????????????????????????????????????: 'topology', 'degree', 'null' */
        this.ordering = null;
        /** how many 2*pi from first to last nodes */
        this.angleRatio = 1;
        this.nodes = [];
        this.edges = [];
        this.nodeMap = {};
        this.degrees = [];
        this.width = 300;
        this.height = 300;
        this.updateCfg(options);
    }
    getDefaultCfg() {
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
    }
    /**
     * ????????????
     */
    execute() {
        const self = this;
        const nodes = self.nodes;
        const edges = self.edges;
        const n = nodes.length;
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
        const center = self.center;
        if (n === 1) {
            nodes[0].x = center[0];
            nodes[0].y = center[1];
            if (self.onLayoutEnd)
                self.onLayoutEnd();
            return;
        }
        let radius = self.radius;
        let startRadius = self.startRadius;
        let endRadius = self.endRadius;
        const divisions = self.divisions;
        const startAngle = self.startAngle;
        const endAngle = self.endAngle;
        const angleStep = (endAngle - startAngle) / n;
        // layout
        const nodeMap = {};
        nodes.forEach((node, i) => {
            nodeMap[node.id] = i;
        });
        self.nodeMap = nodeMap;
        const degrees = getDegree(nodes.length, nodeMap, edges);
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
        const angleRatio = self.angleRatio;
        const astep = angleStep * angleRatio;
        const ordering = self.ordering;
        let layoutNodes = [];
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
        const clockwise = self.clockwise;
        const divN = Math.ceil(n / divisions); // node number in each division
        for (let i = 0; i < n; ++i) {
            let r = radius;
            if (!r && startRadius !== null && endRadius !== null) {
                r = startRadius + (i * (endRadius - startRadius)) / (n - 1);
            }
            if (!r) {
                r = 10 + (i * 100) / (n - 1);
            }
            let angle = startAngle +
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
    }
    /**
     * ?????????????????????????????????
     * @return {array} orderedNodes ??????????????????
     */
    topologyOrdering(directed = false) {
        const self = this;
        const degrees = self.degrees;
        const edges = self.edges;
        const nodes = self.nodes;
        const cnodes = clone(nodes);
        const nodeMap = self.nodeMap;
        const orderedCNodes = [cnodes[0]];
        const resNodes = [nodes[0]];
        const pickFlags = [];
        const n = nodes.length;
        pickFlags[0] = true;
        initHierarchy(cnodes, edges, nodeMap, directed);
        let k = 0;
        cnodes.forEach((cnode, i) => {
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
                    const children = orderedCNodes[k].children;
                    let foundChild = false;
                    for (let j = 0; j < children.length; j++) {
                        const childIdx = nodeMap[children[j]];
                        if (degrees[childIdx] === degrees[i] && !pickFlags[childIdx]) {
                            orderedCNodes.push(cnodes[childIdx]);
                            resNodes.push(nodes[nodeMap[cnodes[childIdx].id]]);
                            pickFlags[childIdx] = true;
                            foundChild = true;
                            break;
                        }
                    }
                    let ii = 0;
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
    }
    /**
     * ??????????????????????????????
     * @return {array} orderedNodes ??????????????????
     */
    degreeOrdering() {
        const self = this;
        const nodes = self.nodes;
        const orderedNodes = [];
        const degrees = self.degrees;
        nodes.forEach((node, i) => {
            node.degree = degrees[i];
            orderedNodes.push(node);
        });
        orderedNodes.sort(compareDegree);
        return orderedNodes;
    }
    getType() {
        return "circular";
    }
}
//# sourceMappingURL=circular.js.map