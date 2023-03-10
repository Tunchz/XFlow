"use strict";
// @ts-nocheck
/**
 * @fileOverview fruchterman layout
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GForceGPULayout = void 0;
var base_1 = require("../base");
var util_1 = require("../../util");
// @ts-ignore
var g_webgpu_1 = require("@tunchz/xflow/g-webgpu");
var gpu_1 = require("../../util/gpu");
var math_1 = require("../../util/math");
var gForceShader_1 = require("./gForceShader");
var constants_1 = require("../constants");
/**
 * graphin ?????? force ??????
 */
var GForceGPULayout = /** @class */ (function (_super) {
    __extends(GForceGPULayout, _super);
    function GForceGPULayout(options) {
        var _this = _super.call(this) || this;
        /** ?????????????????????????????? */
        _this.maxIteration = 1000;
        /** ?????????????????? */
        _this.edgeStrength = 200;
        /** ???????????? */
        _this.nodeStrength = 1000;
        /** ???????????? */
        _this.coulombDisScale = 0.005;
        /** ???????????? */
        _this.damping = 0.9;
        /** ???????????? */
        _this.maxSpeed = 1000;
        /** ???????????????????????????????????????????????????????????? */
        _this.minMovement = 0.5;
        /** ??????????????? */
        _this.interval = 0.02;
        /** ????????????????????? */
        _this.factor = 1;
        /** ???????????? */
        _this.linkDistance = 1;
        /** ???????????? */
        _this.gravity = 10;
        /** ????????????web worker???????????????web worker??????????????????????????????	*/
        _this.workerEnabled = false;
        _this.nodes = [];
        _this.edges = [];
        _this.width = 300;
        _this.height = 300;
        _this.nodeMap = {};
        _this.nodeIdxMap = {};
        _this.updateCfg(options);
        return _this;
    }
    GForceGPULayout.prototype.getDefaultCfg = function () {
        return {
            maxIteration: 2000,
            gravity: 10,
            clustering: false,
            clusterGravity: 10
        };
    };
    /**
     * ????????????
     */
    GForceGPULayout.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, nodes, center, nodeMap, nodeIdxMap;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        nodes = self.nodes;
                        if (!nodes || nodes.length === 0) {
                            if (self.onLayoutEnd)
                                self.onLayoutEnd();
                            return [2 /*return*/];
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
                        center = self.center;
                        if (nodes.length === 1) {
                            nodes[0].x = center[0];
                            nodes[0].y = center[1];
                            if (self.onLayoutEnd)
                                self.onLayoutEnd();
                            return [2 /*return*/];
                        }
                        nodeMap = {};
                        nodeIdxMap = {};
                        nodes.forEach(function (node, i) {
                            if (!(0, util_1.isNumber)(node.x))
                                node.x = Math.random() * self.width;
                            if (!(0, util_1.isNumber)(node.y))
                                node.y = Math.random() * self.height;
                            nodeMap[node.id] = node;
                            nodeIdxMap[node.id] = i;
                        });
                        self.nodeMap = nodeMap;
                        self.nodeIdxMap = nodeIdxMap;
                        self.nodeStrength = (0, gpu_1.proccessToFunc)(self.nodeStrength, 1);
                        self.edgeStrength = (0, gpu_1.proccessToFunc)(self.edgeStrength, 1);
                        // layout
                        return [4 /*yield*/, self.run()];
                    case 1:
                        // layout
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GForceGPULayout.prototype.executeWithWorker = function (canvas, ctx) {
        var self = this;
        var nodes = self.nodes;
        var center = self.center;
        if (!nodes || nodes.length === 0) {
            return;
        }
        if (nodes.length === 1) {
            nodes[0].x = center[0];
            nodes[0].y = center[1];
            return;
        }
        var nodeMap = {};
        var nodeIdxMap = {};
        nodes.forEach(function (node, i) {
            if (!(0, util_1.isNumber)(node.x))
                node.x = Math.random() * self.width;
            if (!(0, util_1.isNumber)(node.y))
                node.y = Math.random() * self.height;
            nodeMap[node.id] = node;
            nodeIdxMap[node.id] = i;
        });
        self.nodeMap = nodeMap;
        self.nodeIdxMap = nodeIdxMap;
        self.nodeStrength = (0, gpu_1.proccessToFunc)(self.nodeStrength, 1);
        self.edgeStrength = (0, gpu_1.proccessToFunc)(self.edgeStrength, 1);
        // layout
        self.run(canvas, ctx);
    };
    GForceGPULayout.prototype.run = function (canvas, ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var self, nodes, edges, maxIteration, numParticles, _a, maxEdgePerVetex, nodesEdgesArray, masses, nodeStrengths, centerXs, centerYs, centerGravities, fxs, fys, gravity, center, nodeAttributeArray1, nodeAttributeArray2, workerEnabled, world, onLayoutEnd, initPreviousData, i, kernelGForce, kernelAveMovement, execute;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        self = this;
                        nodes = self.nodes;
                        edges = self.edges;
                        maxIteration = self.maxIteration;
                        if (!self.width && typeof window !== "undefined") {
                            self.width = window.innerWidth;
                        }
                        if (!self.height && typeof window !== "undefined") {
                            self.height = window.innerHeight;
                        }
                        numParticles = nodes.length;
                        self.linkDistance = (0, gpu_1.proccessToFunc)(self.linkDistance);
                        self.edgeStrength = (0, gpu_1.proccessToFunc)(self.edgeStrength);
                        _a = (0, gpu_1.buildTextureDataWithTwoEdgeAttr)(nodes, edges, self.linkDistance, self.edgeStrength), maxEdgePerVetex = _a.maxEdgePerVetex, nodesEdgesArray = _a.array;
                        // init degree for mass
                        self.degrees = (0, math_1.getDegree)(nodes.length, self.nodeIdxMap, edges);
                        masses = [];
                        nodeStrengths = [];
                        centerXs = [];
                        centerYs = [];
                        centerGravities = [];
                        fxs = [];
                        fys = [];
                        if (!self.getMass) {
                            self.getMass = function (d) {
                                return self.degrees[self.nodeIdxMap[d.id]] || 1;
                            };
                        }
                        gravity = self.gravity;
                        center = self.center;
                        nodes.forEach(function (node, i) {
                            masses.push(self.getMass(node));
                            nodeStrengths.push(self.nodeStrength(node));
                            if (!self.degrees[i])
                                self.degrees[i] = 0;
                            var nodeGravity = [center[0], center[1], gravity];
                            if (self.getCenter) {
                                var customCenter = self.getCenter(node, self.degrees[i]);
                                if (customCenter &&
                                    (0, util_1.isNumber)(customCenter[0]) &&
                                    (0, util_1.isNumber)(customCenter[1]) &&
                                    (0, util_1.isNumber)(customCenter[2])) {
                                    nodeGravity = customCenter;
                                }
                            }
                            centerXs.push(nodeGravity[0]);
                            centerYs.push(nodeGravity[1]);
                            centerGravities.push(nodeGravity[2]);
                            if ((0, util_1.isNumber)(node.fx) && (0, util_1.isNumber)(node.fy)) {
                                fxs.push(node.fx || 0.001);
                                fys.push(node.fy || 0.001);
                            }
                            else {
                                fxs.push(0);
                                fys.push(0);
                            }
                        });
                        nodeAttributeArray1 = (0, gpu_1.arrayToTextureData)([
                            masses,
                            self.degrees,
                            nodeStrengths,
                            fxs
                        ]);
                        nodeAttributeArray2 = (0, gpu_1.arrayToTextureData)([
                            centerXs,
                            centerYs,
                            centerGravities,
                            fys
                        ]);
                        workerEnabled = self.workerEnabled;
                        if (workerEnabled) {
                            world = g_webgpu_1.World.create({
                                canvas: canvas,
                                engineOptions: {
                                    supportCompute: true
                                }
                            });
                        }
                        else {
                            world = g_webgpu_1.World.create({
                                engineOptions: {
                                    supportCompute: true
                                }
                            });
                        }
                        onLayoutEnd = self.onLayoutEnd;
                        initPreviousData = [];
                        nodesEdgesArray.forEach(function (value) {
                            initPreviousData.push(value);
                        });
                        for (i = 0; i < 4; i++) {
                            initPreviousData.push(0);
                        }
                        kernelGForce = world
                            .createKernel(gForceShader_1.gForceBundle)
                            .setDispatch([numParticles, 1, 1])
                            .setBinding({
                            u_Data: nodesEdgesArray,
                            u_damping: self.damping,
                            u_maxSpeed: self.maxSpeed,
                            u_minMovement: self.minMovement,
                            u_coulombDisScale: self.coulombDisScale,
                            u_factor: self.factor,
                            u_NodeAttributeArray1: nodeAttributeArray1,
                            u_NodeAttributeArray2: nodeAttributeArray2,
                            MAX_EDGE_PER_VERTEX: maxEdgePerVetex,
                            VERTEX_COUNT: numParticles,
                            u_AveMovement: initPreviousData,
                            u_interval: self.interval // ???????????????????????????????????? interval?????? onIterationCompleted ?????????
                        });
                        kernelAveMovement = world
                            .createKernel(gForceShader_1.aveMovementBundle)
                            .setDispatch([1, 1, 1])
                            .setBinding({
                            u_Data: nodesEdgesArray,
                            VERTEX_COUNT: numParticles,
                            u_AveMovement: [0, 0, 0, 0]
                        });
                        execute = function () { return __awaiter(_this, void 0, void 0, function () {
                            var i, stepInterval, finalParticleData;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        i = 0;
                                        _a.label = 1;
                                    case 1:
                                        if (!(i < maxIteration)) return [3 /*break*/, 5];
                                        // TODO: ??????????????? kernelGForce ???????????????
                                        // ???????????????????????????????????? PreviousData
                                        // if (i > 0) {
                                        //   kernelAveMovement.setBinding({
                                        //     u_PreviousData: kernelGForce
                                        //   });
                                        // }
                                        // eslint-disable-next-line no-await-in-loop
                                        return [4 /*yield*/, kernelGForce.execute()];
                                    case 2:
                                        // TODO: ??????????????? kernelGForce ???????????????
                                        // ???????????????????????????????????? PreviousData
                                        // if (i > 0) {
                                        //   kernelAveMovement.setBinding({
                                        //     u_PreviousData: kernelGForce
                                        //   });
                                        // }
                                        // eslint-disable-next-line no-await-in-loop
                                        _a.sent();
                                        // midRes = await kernelGForce.getOutput();
                                        // ?????????????????????
                                        // ?????????????????????????????????????????????
                                        kernelAveMovement.setBinding({
                                            u_Data: kernelGForce
                                        });
                                        // eslint-disable-next-line no-await-in-loop
                                        return [4 /*yield*/, kernelAveMovement.execute()];
                                    case 3:
                                        // eslint-disable-next-line no-await-in-loop
                                        _a.sent();
                                        stepInterval = Math.max(0.02, self.interval - i * 0.002);
                                        kernelGForce.setBinding({
                                            u_interval: stepInterval,
                                            u_AveMovement: kernelAveMovement
                                        });
                                        _a.label = 4;
                                    case 4:
                                        i++;
                                        return [3 /*break*/, 1];
                                    case 5: return [4 /*yield*/, kernelGForce.getOutput()];
                                    case 6:
                                        finalParticleData = _a.sent();
                                        // ?????????????????????
                                        if (canvas) {
                                            // ????????????????????????
                                            ctx.postMessage({
                                                type: constants_1.LAYOUT_MESSAGE.GPUEND,
                                                vertexEdgeData: finalParticleData
                                                // edgeIndexBufferData,
                                            });
                                        }
                                        else {
                                            nodes.forEach(function (node, i) {
                                                var x = finalParticleData[4 * i];
                                                var y = finalParticleData[4 * i + 1];
                                                node.x = x;
                                                node.y = y;
                                            });
                                        }
                                        if (onLayoutEnd)
                                            onLayoutEnd();
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        return [4 /*yield*/, execute()];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GForceGPULayout.prototype.getType = function () {
        return "gForce-gpu";
    };
    return GForceGPULayout;
}(base_1.Base));
exports.GForceGPULayout = GForceGPULayout;
//# sourceMappingURL=gForce.js.map