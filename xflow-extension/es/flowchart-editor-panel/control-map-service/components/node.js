import React, { useState, useEffect } from 'react';
import { DefaultNodeConfig } from '../../../flowchart-node-panel';
import { FlowchartFormWrapper } from '../../form-wrapper';
import { InputFiled, ColorPicker, Position, InputNumberFiled, Size } from './fields';
import { PREFIX } from './constants';
const NodeComponent = props => {
    const { config, plugin = {} } = props;
    const { updateNode } = plugin;
    const [nodeConfig, setNodeConfig] = useState(Object.assign(Object.assign({}, DefaultNodeConfig), config));
    const onNodeConfigChange = (key, value) => {
        setNodeConfig(Object.assign(Object.assign({}, nodeConfig), { [key]: value }));
        updateNode({
            [key]: value,
        });
    };
    useEffect(() => {
        setNodeConfig(Object.assign(Object.assign({}, DefaultNodeConfig), config));
    }, [config]);
    return (React.createElement("div", { className: `${PREFIX}-panel-body` },
        React.createElement("div", { className: `${PREFIX}-panel-group` },
            React.createElement("h5", null, "Node Content"),
            React.createElement(InputFiled, { label: "Label", value: nodeConfig.label, onChange: value => {
                    onNodeConfigChange('label', value);
                } })),
        React.createElement("div", { className: `${PREFIX}-panel-group` },
            React.createElement("h5", null, "Style"),
            React.createElement(Position, { x: nodeConfig.x, y: nodeConfig.y, onChange: (key, value) => {
                    onNodeConfigChange(key, value);
                } }),
            React.createElement(Size, { width: nodeConfig.width, height: nodeConfig.height, onChange: (key, value) => {
                    onNodeConfigChange(key, value);
                } }),
            React.createElement(ColorPicker, { label: "fill", value: nodeConfig.fill, onChange: (value) => {
                    onNodeConfigChange('fill', value);
                } }),
            React.createElement(ColorPicker, { label: "stroke", value: nodeConfig.stroke, onChange: (value) => {
                    onNodeConfigChange('stroke', value);
                } }),
            React.createElement("div", { className: `${PREFIX}-node-text-style` },
                React.createElement(InputNumberFiled, { label: "label", value: nodeConfig.fontSize, width: 68, onChange: value => {
                        onNodeConfigChange('fontSize', value);
                    } }),
                React.createElement(ColorPicker, { value: nodeConfig.fontFill, onChange: (value) => {
                        onNodeConfigChange('fontFill', value);
                    } })))));
};
export const NodeService = props => {
    return (React.createElement(FlowchartFormWrapper, Object.assign({}, props), (config, plugin) => React.createElement(NodeComponent, Object.assign({}, props, { plugin: plugin, config: config }))));
};
//# sourceMappingURL=node.js.map