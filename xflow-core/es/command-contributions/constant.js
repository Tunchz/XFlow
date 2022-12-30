/** 节点命令 */
export var XFlowNodeCommands;
(function (XFlowNodeCommands) {
    const category = 'Node Operations';
    /** 新增节点 */
    XFlowNodeCommands.ADD_NODE = {
        id: 'xflow:add-node',
        label: 'add node',
        category,
    };
    /** 删除节点 */
    XFlowNodeCommands.DEL_NODE = {
        id: 'xflow:del-node',
        label: 'delete node',
        category,
    };
    /** 更新链接桩 */
    XFlowNodeCommands.UPDATE_NODE_PORT = {
        id: 'xflow:update-node-port',
        label: 'update node port',
        category,
    };
    /** 更新节点 */
    XFlowNodeCommands.UPDATE_NODE = {
        id: 'xflow:update-node',
        label: 'update node',
        category,
    };
    /** 节点交互：高亮节点 */
    XFlowNodeCommands.HIGHLIGHT_NODE = {
        id: 'xflow:highlight-node',
        label: 'highlight node',
        category,
    };
    /** 节点交互：选中节点 */
    XFlowNodeCommands.SELECT_NODE = {
        id: 'xflow:select-node',
        label: 'select node',
        category,
    };
    /** 移动节点 */
    XFlowNodeCommands.MOVE_NODE = {
        id: 'xflow:move-node',
        label: 'move node',
        category,
    };
    /** 节点居中 */
    XFlowNodeCommands.CENTER_NODE = {
        id: 'xflow:center-node',
        label: 'center node',
        category,
    };
    /** 节点前置：调整zindex */
    XFlowNodeCommands.FRONT_NODE = {
        id: 'xflow:front-node',
        label: 'front node',
        category,
    };
    /** 节点后置：调整zindex */
    XFlowNodeCommands.BACK_NODE = {
        id: 'xflow:back-node',
        label: 'back node',
        category,
    };
})(XFlowNodeCommands || (XFlowNodeCommands = {}));
/** 边命令 */
export var XFlowEdgeCommands;
(function (XFlowEdgeCommands) {
    const category = 'Edge Operation';
    /** 新增边 */
    XFlowEdgeCommands.ADD_EDGE = {
        id: 'xflow:add-edge',
        label: 'add edge',
        category,
    };
    /** 删除边 */
    XFlowEdgeCommands.DEL_EDGE = {
        id: 'xflow:del-edge',
        label: 'delete edge',
        category,
    };
    /** 更新边 */
    XFlowEdgeCommands.UPDATE_EDGE = {
        id: 'xflow:update-edge',
        label: 'update edge',
        category,
    };
    /** 高亮边 */
    XFlowEdgeCommands.HIGHLIGHT_EDGE = {
        id: 'xflow:highlight-edge',
        label: 'hightlight edge',
        category,
    };
    /** 边前置：调整zindex */
    XFlowEdgeCommands.FRONT_EDGE = {
        id: 'xflow:front-edge',
        label: 'front edge',
        category,
    };
    /** 边后置：调整zindex */
    XFlowEdgeCommands.BACK_EDGE = {
        id: 'xflow:back-edge',
        label: 'back edge',
        category,
    };
})(XFlowEdgeCommands || (XFlowEdgeCommands = {}));
/** 画布命令 */
export var XFlowGraphCommands;
(function (XFlowGraphCommands) {
    const category = 'Canvas Operation';
    /** LOAD 元数据操作 */
    XFlowGraphCommands.LOAD_META = {
        id: 'xflow:load-meta',
        label: 'load meta',
        category,
    };
    /** LOAD DATA操作 */
    XFlowGraphCommands.LOAD_DATA = {
        id: 'xflow:load-data',
        label: 'load data',
        category,
    };
    /** SAVE GRAPH DATA操作 */
    XFlowGraphCommands.SAVE_GRAPH_DATA = {
        id: 'xflow:save-graph-data',
        label: 'save graph',
        category,
    };
    /** LAYOUT */
    XFlowGraphCommands.GRAPH_LAYOUT = {
        id: 'xflow:layout',
        label: 'layout',
        category,
    };
    /** Graph Render */
    XFlowGraphCommands.GRAPH_RENDER = {
        id: 'xflow:graph-render',
        label: 'render graph',
        category,
    };
    /** UNDO 操作 */
    XFlowGraphCommands.UNDO_CMD = {
        id: 'xflow:undo-cmd',
        label: 'undo',
        category,
    };
    /** REDO 操作 */
    XFlowGraphCommands.REDO_CMD = {
        id: 'xflow:redo-cmd',
        label: 'redo',
        category,
    };
    /** Graph General Operations: XFlow命令不满足的可以用这个命令，直接使用Graph的api */
    XFlowGraphCommands.GRAPH_INSTANCE_COMMAND = {
        id: 'xflow:graph-instacne-cmd',
        label: 'command',
        category,
    };
    /** Graph Zoom */
    XFlowGraphCommands.GRAPH_ZOOM = {
        id: 'xflow:graph-zoom',
        label: 'zoom',
        category,
    };
    /** Graph Fullscreen */
    XFlowGraphCommands.GRAPH_FULLSCREEN = {
        id: 'xflow:graph-fullscreen',
        label: 'fullscreen',
        category,
    };
    /** Graph Resize */
    XFlowGraphCommands.GRAPH_RESIZE = {
        id: 'xflow:graph-resize',
        label: 'resize',
        category,
    };
    /** Graph Copy */
    XFlowGraphCommands.GRAPH_COPY = {
        id: 'xflow:graph-copy-selection',
        label: 'copy',
        category,
    };
    /** Graph Paste */
    XFlowGraphCommands.GRAPH_PASTE = {
        id: 'xflow:graph-paste-selection',
        label: 'paste',
        category,
    };
    /** Graph 开启框选 */
    XFlowGraphCommands.GRAPH_TOGGLE_MULTI_SELECT = {
        id: 'xflow:graph-toggle-multi-select',
        label: 'multi-select',
        category,
    };
    /** 新增 Tool: https://x6.antv.vision/zh/docs/api/registry/edge-tool */
    XFlowGraphCommands.GRAPH_ADD_TOOL = {
        id: 'xflow:add-tool',
        label: 'add tool',
        category,
    };
    /** 删除 Tool: https://x6.antv.vision/zh/docs/api/registry/edge-tool */
    XFlowGraphCommands.GRAPH_DEL_TOOL = {
        id: 'xflow:del-tool',
        label: 'delete tool',
        category,
    };
    /** history: https://x6.antv.vision/zh/docs/api/graph/history#%E6%96%B9%E6%B3%95 */
    XFlowGraphCommands.GRAPH_HISTORY_UNDO = {
        id: 'xflow:history-undo',
        label: 'history undo',
        category,
    };
    /** history: https://x6.antv.vision/zh/docs/api/graph/history#%E6%96%B9%E6%B3%95  */
    XFlowGraphCommands.GRAPH_HISTORY_REDO = {
        id: 'xflow:history-redo',
        label: 'history redo',
        category,
    };
    /** history: https://x6.antv.vision/zh/docs/api/graph/history#%E6%96%B9%E6%B3%95  */
    XFlowGraphCommands.GRAPH_HISTORY_RESET = {
        id: 'xflow:history-reset',
        label: 'history reset',
        category,
    };
    /** history: https://x6.antv.vision/zh/docs/api/graph/history#%E6%96%B9%E6%B3%95  */
    XFlowGraphCommands.GRAPH_HISTORY_TOGGLE = {
        id: 'xflow:history-toggle',
        label: 'history toggle',
        category,
    };
})(XFlowGraphCommands || (XFlowGraphCommands = {}));
/** 全局状态 */
export var XFlowModelCommands;
(function (XFlowModelCommands) {
    const category = 'Model Operation';
    /** Update model 操作 */
    XFlowModelCommands.UPDATE_MODEL = {
        id: 'xflow:update-model',
        label: 'update model',
        category,
    };
})(XFlowModelCommands || (XFlowModelCommands = {}));
/** 全局状态 */
export var XFlowGroupCommands;
(function (XFlowGroupCommands) {
    const category = 'Group Operation';
    /** 初始化群组操作 */
    XFlowGroupCommands.INIT_GROUP = {
        id: 'xflow:init-group',
        label: 'init group',
        category,
    };
    /** ADD GROUP 操作 */
    XFlowGroupCommands.ADD_GROUP = {
        id: 'xflow:add-group',
        label: 'add group',
        category,
    };
    /** DELETE GROUP 操作 */
    XFlowGroupCommands.DEL_GROUP = {
        id: 'xflow:del-group',
        label: 'delete group',
        category,
    };
    /** 折叠操作 */
    XFlowGroupCommands.COLLAPSE_GROUP = {
        id: 'xflow:collapse-group',
        label: 'collapse group',
        category,
    };
})(XFlowGroupCommands || (XFlowGroupCommands = {}));
//# sourceMappingURL=constant.js.map