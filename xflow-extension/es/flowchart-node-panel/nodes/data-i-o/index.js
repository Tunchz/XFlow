import React from 'react';
import { createPath } from '../../utils';
import { NODE_WIDTH, NODE_HEIGHT, NODE_PADDING, DefaultNodeConfig } from '../../constants';
export const DataIONode = props => {
    const { size = { width: NODE_WIDTH, height: NODE_HEIGHT }, data = {} } = props;
    const { stroke = DefaultNodeConfig.stroke, label = DefaultNodeConfig.label, fill = DefaultNodeConfig.fill, fontFill = DefaultNodeConfig.fontFill, fontSize = DefaultNodeConfig.fontSize, } = data;
    const { width, height } = size;
    const slope = height / 2; // 用于计算斜率 tan(&) =  slope / height
    const path = [
        ['M', slope - NODE_PADDING, NODE_PADDING],
        ['L', width - 2 * NODE_PADDING, NODE_PADDING],
        ['L', width - slope, height - 2 * NODE_PADDING],
        ['L', NODE_PADDING, height - 2 * NODE_PADDING],
        ['Z'],
    ];
    return (React.createElement("svg", { viewBox: `0 0 ${width} ${height}`, xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%" },
        React.createElement("path", { d: createPath(path), fill: fill, stroke: stroke }),
        React.createElement("text", { x: width / 2, y: height / 2, fill: fontFill, textAnchor: "middle", alignmentBaseline: "middle", fontSize: fontSize }, label),
        "Sorry, your browser does not support inline SVG."));
};
//# sourceMappingURL=index.js.map