import React from 'react';
import { createPath } from '../../utils';
import { NODE_WIDTH, NODE_HEIGHT, NODE_PADDING, DefaultNodeConfig } from '../../constants';
export const DatabaseNode = props => {
    const { size = { width: NODE_WIDTH, height: NODE_HEIGHT }, data = {} } = props;
    const { stroke = DefaultNodeConfig.stroke, label = DefaultNodeConfig.label, fill = DefaultNodeConfig.fill, fontFill = DefaultNodeConfig.fontFill, fontSize = DefaultNodeConfig.fontSize, } = data;
    const { width, height } = size;
    const bezierX = width / 4;
    const bezierY = Math.min(height / 10, 12);
    const path = [
        ['M', NODE_PADDING, NODE_PADDING + bezierY],
        ['C', NODE_PADDING + bezierX, NODE_PADDING, NODE_PADDING + width - bezierX, NODE_PADDING],
        ['', width - 2 * NODE_PADDING, NODE_PADDING + bezierY],
        ['L', width - 2 * NODE_PADDING, height - 2 * NODE_PADDING - bezierY],
        [
            'C',
            width - 2 * NODE_PADDING - bezierX,
            height - 2 * NODE_PADDING,
            NODE_PADDING + bezierX,
            height - 2 * NODE_PADDING,
        ],
        ['', NODE_PADDING, height - 2 * NODE_PADDING - bezierY],
        ['Z'],
    ];
    // 多 path 解决填充问题
    const path1 = [
        ['M', NODE_PADDING, NODE_PADDING + bezierY],
        [
            'C',
            NODE_PADDING + bezierX,
            NODE_PADDING + 2 * bezierY,
            NODE_PADDING + width - bezierX,
            NODE_PADDING + 2 * bezierY,
        ],
        ['', width - 2 * NODE_PADDING, NODE_PADDING + bezierY], // top-right
    ];
    return (React.createElement("svg", { viewBox: `0 0 ${width} ${height}`, xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%" },
        React.createElement("path", { d: createPath(path), fill: fill, stroke: stroke }),
        React.createElement("path", { d: createPath(path1), fill: fill, stroke: stroke }),
        React.createElement("text", { x: width / 2, y: height / 2, fill: fontFill, textAnchor: "middle", alignmentBaseline: "middle", fontSize: fontSize }, label),
        "Sorry, your browser does not support inline SVG."));
};
//# sourceMappingURL=index.js.map