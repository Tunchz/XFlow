import { __awaiter } from "tslib";
import React, { useCallback } from 'react';
import { Empty, Collapse } from 'antd';
import { Addon } from '@tunchz/xflow/x6';
import { getNodeReactComponent, useXFlowApp, uuidv4, XFlowNodeCommands } from '@tunchz/xflow/xflow-core';
import { getProps } from '../flowchart-canvas/utils';
import { NodeTitle, defaultNodeFactory } from '../canvas-node-tree-panel/panel-body';
import { isArray } from 'lodash';
const { Panel } = Collapse;
export const NodePanelBody = props => {
    const { x6NodeFactory, dndOptions, state, prefixClz, defaultActiveKey = ['official'], showOfficial = true, } = props;
    const registerNode = props.registerNode
        ? isArray(props.registerNode)
            ? props.registerNode
            : [props.registerNode]
        : [];
    const { graphProvider, modelService, commandService } = useXFlowApp();
    const [dnd, setDnd] = React.useState();
    /** 获取graph实例 */
    const [graph, setGraph] = React.useState();
    graphProvider.getGraphInstance().then(x6Graph => {
        setGraph(x6Graph);
    });
    let graphConfig = undefined;
    graphProvider.getGraphOptions().then(x6GraphConfig => {
        graphConfig = x6GraphConfig;
    });
    const onNodeDrop = useCallback((node) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { ports } = node;
        const nodeConfig = Object.assign(Object.assign({}, node), { id: `node-${uuidv4()}`, zIndex: 10, ports: Object.assign(Object.assign({}, ports), { items: (_a = ports.items) === null || _a === void 0 ? void 0 : _a.map(item => (Object.assign(Object.assign({}, item), { id: uuidv4() }))) }) });
        const args = {
            nodeConfig,
        };
        yield commandService.executeCommand(XFlowNodeCommands.ADD_NODE.id, args);
        const onAddNode = getProps('onAddNode');
        if (typeof onAddNode === 'function') {
            onAddNode(nodeConfig);
        }
    }), [commandService]);
    React.useEffect(() => {
        if (!graph) {
            return;
        }
        const dndInstance = new Addon.Dnd(Object.assign(Object.assign({ scaled: false, animation: false }, dndOptions), { target: graph, 
            /** 这里考虑到需要新增群组的需求，不使用x6的getDropNod方法
             * 在validateNode时调用command添加
             */
            validateNode: (droppingNode) => __awaiter(void 0, void 0, void 0, function* () {
                const nodeConfig = Object.assign(Object.assign({}, droppingNode.getData()), droppingNode.getPosition());
                yield onNodeDrop(nodeConfig);
                return false;
            }) }));
        setDnd(dndInstance);
    }, [commandService, dndOptions, graph, modelService, onNodeDrop]);
    const onMouseDown = React.useCallback((nodeConfig) => (e) => {
        if (!graph || !dnd || !graphConfig) {
            return;
        }
        const renderKey = graphConfig.nodeTypeParser(nodeConfig);
        const { width = 180, height = 40 } = nodeConfig;
        const reactComponent = graphConfig.nodeRender.get(renderKey);
        const wrappedComponent = getNodeReactComponent(reactComponent, commandService, modelService);
        const nodeData = {
            data: nodeConfig,
            width,
            height,
            view: graphConfig.graphId,
            component: wrappedComponent,
        };
        const x6Node = x6NodeFactory ? x6NodeFactory(nodeData) : defaultNodeFactory(nodeData);
        dnd.start(x6Node, e.nativeEvent);
    }, [commandService, dnd, graph, graphConfig, modelService, x6NodeFactory]);
    const renderTree = React.useCallback((list = []) => {
        return list.map(item => {
            const { popoverContent } = item;
            return (React.createElement(NodeTitle, { item: item, key: item.id, onMouseDown: onMouseDown(item), popoverContent: popoverContent, prefixClz: prefixClz, modelService: modelService, commandService: commandService, graphConfig: graphConfig }));
        });
    }, [commandService, graphConfig, modelService, onMouseDown, prefixClz]);
    const officialNode = state.nodeList.filter(item => !item.isCustom);
    const searchOfficialNode = state.searchList.filter(item => !item.isCustom);
    const customNode = (key) => {
        return state.nodeList.filter(item => item.isCustom && item.parentKey === key);
    };
    const searchCustomNode = (key) => {
        return state.searchList.filter(item => item.isCustom && item.parentKey === key);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: `${prefixClz}-body` },
            React.createElement(Collapse, { defaultActiveKey: defaultActiveKey, style: { border: 'none' } },
                showOfficial && (React.createElement(Panel, { header: "General Node", key: "official", style: { border: 'none' } },
                    !state.keyword && (React.createElement("div", { className: `${prefixClz}-official` }, renderTree(officialNode))),
                    state.searchList.length > 0 && (React.createElement("div", { className: `${prefixClz}-official` }, renderTree(searchOfficialNode))))),
                (registerNode === null || registerNode === void 0 ? void 0 : registerNode.length) > 0 &&
                    registerNode.map(item => !item.hidden &&
                        item.nodes.length > 0 && (React.createElement(Panel, { header: item.title, key: item.key, style: { border: 'none' } },
                        !state.keyword && (React.createElement("div", { className: `${prefixClz}-custom` }, renderTree(customNode(item.key)))),
                        state.searchList.length > 0 && (React.createElement("div", { className: `${prefixClz}-custom` }, renderTree(searchCustomNode(item.key)))))))),
            state.keyword && state.searchList.length === 0 && React.createElement(Empty, { style: { marginTop: '48px' } }))));
};
//# sourceMappingURL=panel-body.js.map