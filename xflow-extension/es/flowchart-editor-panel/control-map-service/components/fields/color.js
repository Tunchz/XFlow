import React, { useState, useRef, memo } from 'react';
import { render, createPortal } from 'react-dom';
import { useXFlowApp } from '@antv/xflow-core';
import { Button } from 'antd';
import { SketchPicker } from 'react-color';
import { PREFIX } from '../constants';
const ColorPicker = props => {
    const { label, value = '', onChange } = props;
    const [show, setShow] = useState(false);
    // console.log("---- color props : ", value)
    const colorRef = useRef(value);
    const containerRef = useRef();
    const { graphProvider } = useXFlowApp();
    const graphConfig = useRef();
    graphProvider.getGraphOptions().then(x6GraphConfig => {
        graphConfig.current = x6GraphConfig;
    });
    const PickContainer = () => {
        return (React.createElement("div", { className: `${PREFIX}-pick-color-container` },
            React.createElement("div", { className: `${PREFIX}-popover` },
                React.createElement(SketchPicker, { onChange: color => {
                        // console.log("--- color from sketchpicker : ", color)
                        // colorRef.current = color.hex;
                        colorRef.current = `${color.hex||'FFFFFF'}${Math.floor((color.rgb?.a||0) * 255).toString(16).padStart(2, 0)}`
                    }, color: colorRef.current }),
                React.createElement("div", { className: "foolter" },
                    React.createElement(Button, { onClick: () => {
                            setShow(false);
                        } }, "Cancel"),
                    React.createElement(Button, { type: "primary", onClick: () => {
                            onChange === null || onChange === void 0 ? void 0 : onChange(colorRef.current);
                            setShow(false);
                        } }, "Ok")))));
    };
    const getParentContainerByClassName = (currentEle, className) => {
        const containers = document.getElementsByClassName(className);
        if (containers.length === 1) {
            return containers[0];
        }
        let containter = null;
        let currentNode = currentEle.parentElement;
        while (!containter) {
            const current = currentNode.getElementsByClassName(className);
            if ((current === null || current === void 0 ? void 0 : current.length) > 0) {
                containter = current[0];
            }
            currentNode = currentNode.parentElement;
        }
        return containter;
    };
    const createPickColorContainer = (visible) => {
        const existElements = document.getElementsByClassName(`${PREFIX}-pick-color-container`);
        if (existElements.length) {
            Array.from(existElements).forEach(ele => {
                var _a;
                (_a = ele.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(ele);
            });
        }
        if (!visible) {
            return;
        }
        const div = document.createElement('div');
        render(createPortal(React.createElement(PickContainer, null), getParentContainerByClassName(containerRef.current, 'flowchart-editor-panel-body')), div);
    };
    return (React.createElement("div", { className: "group", ref: containerRef },
        label && React.createElement("label", null, label),
        React.createElement("div", { className: `${PREFIX}-color-container`, onClick: () => {
                setShow(true);
            } },
            React.createElement("div", { className: `${PREFIX}-color`, style: {
                    backgroundColor: value,
                    height: '100%',
                } })),
        createPickColorContainer(show)));
};
export default memo(ColorPicker, (pre, next) => {
    return pre.label === next.label && pre.value === next.value;
});
//# sourceMappingURL=color.js.map