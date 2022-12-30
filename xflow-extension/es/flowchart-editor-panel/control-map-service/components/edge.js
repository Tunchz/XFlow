import React, { useState, useEffect } from 'react';
import { FlowchartFormWrapper } from '../../form-wrapper';
import { ColorPicker, InputNumberFiled, InputFiled, SelectField } from './fields';
import { PREFIX, DefaultEdgeConfig, ArrowStrokeMaps, ArrowMaps } from './constants';
const EdgeComponent = props => {
    const { config, plugin = {} } = props;
    const { updateEdge } = plugin;
    const [edgeConfig, setEdgeConfig] = useState(Object.assign(Object.assign({}, DefaultEdgeConfig), config));
    useEffect(() => {
        setEdgeConfig(Object.assign(Object.assign({}, DefaultEdgeConfig), config));
    }, [config]);
    const getAttrs = (key, type = 'line') => {
        var _a;
        const { attrs = {} } = edgeConfig;
        return (_a = attrs[type]) === null || _a === void 0 ? void 0 : _a[key];
    };
    const getArrowValue = () => {
        var _a, _b, _c, _d, _e;
        const { attrs = {} } = edgeConfig;
        const { line = {} } = attrs;
        if (((_a = line.sourceMarker) === null || _a === void 0 ? void 0 : _a.name) && ((_b = line.targetMarker) === null || _b === void 0 ? void 0 : _b.name)) {
            return 'all';
        }
        if (!((_c = line.sourceMarker) === null || _c === void 0 ? void 0 : _c.name) && !((_d = line.targetMarker) === null || _d === void 0 ? void 0 : _d.name)) {
            return 'none';
        }
        if ((_e = line.sourceMarker) === null || _e === void 0 ? void 0 : _e.name) {
            return 'source';
        }
        return 'target';
    };
    const getSrokeDashValue = () => {
        const { attrs = {} } = edgeConfig;
        const { line = {} } = attrs;
        return line.strokeDasharray ? 'dash' : 'solid';
    };
    const onEdgeConfigChange = (key, value, type = 'line') => {
        var _a, _b;
        /** 全量更新，简化逻辑 */
        if (key === 'arrow') {
            setEdgeConfig(Object.assign(Object.assign({}, edgeConfig), { attrs: Object.assign(Object.assign({}, edgeConfig.attrs), { [type]: Object.assign(Object.assign({}, (_a = edgeConfig.attrs) === null || _a === void 0 ? void 0 : _a[type]), value) }) }));
        }
        else {
            setEdgeConfig(Object.assign(Object.assign({}, edgeConfig), { [key]: value, attrs: Object.assign(Object.assign({}, edgeConfig.attrs), { [type]: Object.assign(Object.assign({}, (_b = edgeConfig.attrs) === null || _b === void 0 ? void 0 : _b[type]), { [key]: value }) }) }));
        }
        updateEdge({
            [key]: value,
        }, type, key === 'arrow' ? 'arrow' : '');
    };
    return (React.createElement("div", { className: `${PREFIX}-panel-body` },
        React.createElement("div", { className: `${PREFIX}-panel-group` },
            React.createElement("h5", null, "Edge Content"),
            React.createElement(InputFiled, { label: "Label", value: edgeConfig.label, onChange: value => {
                    onEdgeConfigChange('label', value);
                } })),
        React.createElement("h5", { style: { marginBottom: 12 } }, "Style"),
        React.createElement("div", { className: `${PREFIX}-panel-group`, style: { marginBottom: 0 } },
            React.createElement("h5", null, "Line"),
            React.createElement(SelectField, { label: "arrow", value: getArrowValue(), width: "100%", options: [
                    {
                        label: 'end',
                        value: 'target',
                    },
                    {
                        label: 'start',
                        value: 'source',
                    },
                    {
                        label: 'both',
                        value: 'all',
                    },
                    {
                        label: 'none',
                        value: 'none',
                    },
                ], onChange: value => {
                    onEdgeConfigChange('arrow', ArrowMaps[value], 'line');
                } }),
            React.createElement("div", { className: `${PREFIX}-edge-stroke-style` },
                React.createElement(SelectField, { label: "stroke", width: 68, value: getSrokeDashValue(), options: [
                        {
                            label: 'solid',
                            value: 'solid',
                        },
                        {
                            label: 'dash',
                            value: 'dash',
                        },
                    ], onChange: value => {
                        onEdgeConfigChange('strokeDasharray', ArrowStrokeMaps[value], 'line');
                    } }),
                React.createElement(InputNumberFiled, { value: getAttrs('strokeWidth'), min: 1, onChange: value => {
                        onEdgeConfigChange('strokeWidth', value, 'line');
                    } })),
            React.createElement(ColorPicker, { label: "color", value: getAttrs('stroke'), onChange: (value) => {
                    onEdgeConfigChange('stroke', value, 'line');
                } })),
        React.createElement("div", { className: `${PREFIX}-panel-group` },
            React.createElement("h5", null, "Label"),
            React.createElement("div", { className: `${PREFIX}-edge-text-style` },
                React.createElement(InputNumberFiled, { label: "text", min: 10, width: 68, value: getAttrs('fontSize', 'text') || 12, onChange: value => {
                        onEdgeConfigChange('fontSize', value, 'text');
                    } }),
                React.createElement(ColorPicker, { value: getAttrs('fill', 'text') || '#000', onChange: (value) => {
                        onEdgeConfigChange('fill', value, 'text');
                    } })))));
};
export const EdgeService = props => {
    return (React.createElement(FlowchartFormWrapper, Object.assign({}, props, { type: "edge" }), (config, plugin) => React.createElement(EdgeComponent, Object.assign({}, props, { plugin: plugin, config: config }))));
};
//# sourceMappingURL=edge.js.map