"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardDiskNode = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var utils_1 = require("../../utils");
var constants_1 = require("../../constants");
var HardDiskNode = function (props) {
    var _a = props.size, size = _a === void 0 ? { width: constants_1.NODE_WIDTH, height: constants_1.NODE_HEIGHT } : _a, _b = props.data, data = _b === void 0 ? {} : _b;
    var _c = data.stroke, stroke = _c === void 0 ? constants_1.DefaultNodeConfig.stroke : _c, _d = data.label, label = _d === void 0 ? constants_1.DefaultNodeConfig.label : _d, _e = data.fill, fill = _e === void 0 ? constants_1.DefaultNodeConfig.fill : _e, _f = data.fontFill, fontFill = _f === void 0 ? constants_1.DefaultNodeConfig.fontFill : _f, _g = data.fontSize, fontSize = _g === void 0 ? constants_1.DefaultNodeConfig.fontSize : _g;
    var width = size.width, height = size.height;
    var bezierX = Math.min(width / 10, height / 4);
    var bezierY = Math.min(height / 4, width / 4);
    var path = [
        ['M', constants_1.NODE_PADDING + bezierX, constants_1.NODE_PADDING],
        ['L', width - 2 * constants_1.NODE_PADDING - bezierX, constants_1.NODE_PADDING],
        [
            'C',
            width - 2 * constants_1.NODE_PADDING,
            constants_1.NODE_PADDING + bezierY,
            width - 2 * constants_1.NODE_PADDING,
            height - 2 * constants_1.NODE_PADDING - bezierY,
        ],
        ['', width - 2 * constants_1.NODE_PADDING - bezierX, height - 2 * constants_1.NODE_PADDING],
        ['L', constants_1.NODE_PADDING + bezierX, height - 2 * constants_1.NODE_PADDING],
        ['C', constants_1.NODE_PADDING, height - 2 * constants_1.NODE_PADDING - bezierY, constants_1.NODE_PADDING, constants_1.NODE_PADDING + bezierY],
        ['', constants_1.NODE_PADDING + bezierX, constants_1.NODE_PADDING], // top-left
    ];
    // 遵循绘制顺序，多个 path 绘制弧
    var pathBezierRight = [
        ['M', width - 2 * constants_1.NODE_PADDING - bezierX, constants_1.NODE_PADDING],
        [
            'C',
            width - 2 * constants_1.NODE_PADDING - 2 * bezierX,
            constants_1.NODE_PADDING + bezierY,
            width - 2 * constants_1.NODE_PADDING - 2 * bezierX,
            height - 2 * constants_1.NODE_PADDING - bezierY,
        ],
        ['', width - 2 * constants_1.NODE_PADDING - bezierX, height - 2 * constants_1.NODE_PADDING], // bottom-right
    ];
    return (react_1.default.createElement("svg", { viewBox: "0 0 ".concat(width, " ").concat(height), xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%" },
        react_1.default.createElement("path", { d: (0, utils_1.createPath)(path), fill: fill, stroke: stroke }),
        react_1.default.createElement("path", { d: (0, utils_1.createPath)(pathBezierRight), fill: fill, stroke: stroke }),
        react_1.default.createElement("text", { x: width / 2, y: height / 2, fill: fontFill, textAnchor: "middle", alignmentBaseline: "middle", fontSize: fontSize }, label),
        "Sorry, your browser does not support inline SVG."));
};
exports.HardDiskNode = HardDiskNode;
//# sourceMappingURL=index.js.map