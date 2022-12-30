import React, { useState, useEffect } from 'react';
import { DefaultNodeConfig } from '../../../flowchart-node-panel';
import { FlowchartFormWrapper } from '../../form-wrapper';
import { InputFiled, ColorPicker, Position, InputNumberFiled, Size } from './fields';
import { PREFIX } from './constants';
const GroupComponent = props => {
    const { config, plugin = {} } = props;
    const { updateGroup } = plugin;
    const [groupConfig, setGroupConfig] = useState(Object.assign(Object.assign({}, DefaultNodeConfig), config));
    const onGroupConfigChange = (key, value) => {
        setGroupConfig(Object.assign(Object.assign({}, groupConfig), { [key]: value }));
        updateGroup({
            [key]: value,
        });
    };
    useEffect(() => {
        setGroupConfig(Object.assign(Object.assign({}, DefaultNodeConfig), config));
    }, [config]);
    return (React.createElement("div", { className: `${PREFIX}-panel-body` },
        React.createElement("div", { className: `${PREFIX}-panel-group` },
            React.createElement("h5", null, "Group Content"),
            React.createElement(InputFiled, { label: "Label", value: groupConfig.label, onChange: value => {
                    onGroupConfigChange('label', value);
                } })),
        React.createElement("div", { className: `${PREFIX}-panel-group` },
            React.createElement("h5", null, "Style"),
            React.createElement(Position, { x: groupConfig.x, y: groupConfig.y, onChange: (key, value) => {
                    onGroupConfigChange(key, value);
                } }),
            React.createElement(Size, { width: groupConfig.width, height: groupConfig.height, onChange: (key, value) => {
                    onGroupConfigChange(key, value);
                } }),
            React.createElement(ColorPicker, { label: "fill", value: groupConfig.fill, onChange: (value) => {
                    onGroupConfigChange('fill', value);
                } }),
            React.createElement(ColorPicker, { label: "stroke", value: groupConfig.stroke, onChange: (value) => {
                    onGroupConfigChange('stroke', value);
                } }),
            React.createElement("div", { className: `${PREFIX}-node-text-style` },
                React.createElement(InputNumberFiled, { label: "text", value: groupConfig.fontSize, width: 68, onChange: value => {
                        onGroupConfigChange('fontSize', value);
                    } }),
                React.createElement(ColorPicker, { value: groupConfig.fontFill, onChange: (value) => {
                        onGroupConfigChange('fontFill', value);
                    } })))));
};
export const GroupService = props => {
    return (React.createElement(FlowchartFormWrapper, Object.assign({}, props), (config, plugin) => React.createElement(GroupComponent, Object.assign({}, props, { plugin: plugin, config: config }))));
};
//# sourceMappingURL=group.js.map