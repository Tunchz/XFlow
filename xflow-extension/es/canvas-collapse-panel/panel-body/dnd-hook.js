import { __awaiter } from "tslib";
import React from 'react';
import { useXFlowApp, getNodeReactComponent } from '@tunchz/xflow/xflow-core';
import { Addon } from '@tunchz/xflow/x6';
import { XFlowNode } from '../../canvas-dag-extension/x6-extension/node';
export const defaultNodeFactory = (args) => {
    return new XFlowNode(args);
};
export const useGraphDnd = (props) => {
    const { x6NodeFactory, dndOptions, onNodeDrop } = props;
    const { graphProvider, modelService, commandService } = useXFlowApp();
    const [graphConfig, setConfig] = React.useState();
    const [dnd, setDnd] = React.useState();
    const [graph, setGraph] = React.useState();
    /** 引用 graph 配置 */
    React.useEffect(() => {
        graphProvider.getGraphInstance().then(x6Graph => {
            setGraph(x6Graph);
        });
        graphProvider.getGraphOptions().then(x6GraphConfig => {
            setConfig(x6GraphConfig);
        });
    }, [graphProvider, setGraph, setConfig]);
    /** 初始化 Dnd 实例 */
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
                if (onNodeDrop) {
                    yield onNodeDrop(nodeConfig, commandService, modelService);
                }
                else {
                    console.error('onNodeDrop method is required in NodeTree Panel');
                }
                return false;
            }) }));
        setDnd(dndInstance);
        return () => {
            dndInstance.dispose();
        };
    }, [commandService, modelService, dndOptions, graph, onNodeDrop]);
    /** 开始拖拽 */
    const onMouseDown = React.useCallback((nodeConfig) => (e) => {
        if (!graph || !dnd || !graphConfig) {
            return;
        }
        if (nodeConfig.isDisabled) {
            return;
        }
        // 获取节点组件
        const renderKey = graphConfig.nodeTypeParser(nodeConfig);
        const reactComponent = nodeConfig.renderComponent
            ? nodeConfig.renderComponent
            : graphConfig.nodeRender.get(renderKey);
        // 包裹节点组件
        const wrappedComponent = getNodeReactComponent(reactComponent, commandService, modelService);
        const nodeData = {
            data: nodeConfig,
            width: nodeConfig.width || 180,
            height: nodeConfig.height || 40,
            view: graphConfig.graphId,
            component: wrappedComponent,
        };
        const x6Node = x6NodeFactory ? x6NodeFactory(nodeData) : defaultNodeFactory(nodeData);
        dnd.start(x6Node, e.nativeEvent);
    }, [commandService, dnd, graph, graphConfig, modelService, x6NodeFactory]);
    return { graphConfig, onMouseDown, modelService, commandService };
};
//# sourceMappingURL=dnd-hook.js.map