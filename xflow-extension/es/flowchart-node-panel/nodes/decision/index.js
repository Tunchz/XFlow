import React from 'react';
import { createPath } from '../../utils';
import { NODE_HEIGHT, NODE_PADDING, NODE_WIDTH, DefaultNodeConfig } from '../../constants';
export const DecisionNode = props => {
    const { size = { width: NODE_WIDTH, height: NODE_HEIGHT }, data = {} } = props;
    const { stroke = DefaultNodeConfig.stroke, label = DefaultNodeConfig.label, fill = DefaultNodeConfig.fill, fontFill = DefaultNodeConfig.fontFill, fontSize = DefaultNodeConfig.fontSize, } = data;
    const { width, height } = size;
    const path = [
        ['M', width / 2, NODE_PADDING],
        ['L', width - 2 * NODE_PADDING, height / 2],
        ['L', width / 2, height - 2 * NODE_PADDING],
        ['L', NODE_PADDING, height / 2],
        ['Z'],
    ];
    return (React.createElement("svg", { viewBox: `0 0 ${width} ${height}`, xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%" },
        React.createElement("path", { d: createPath(path), fill: fill, stroke: stroke }),
        React.createElement("text", { x: width / 2, y: height / 2, fill: fontFill, textAnchor: "middle", alignmentBaseline: "middle", fontSize: fontSize }, label),
        "Sorry, your browser does not support inline SVG."));
};
//# sourceMappingURL=index.js.map