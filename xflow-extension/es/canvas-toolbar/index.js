import React from 'react';
import { useXFlowApp } from '@tunchz/xflow/xflow-core';
import { ToolbarConfig } from './config';
import { XFlowToolbar } from './render-components';
export const CanvasToolbar = props => {
    const app = useXFlowApp();
    const hasApp = !!app;
    /** 获取ContextMenu的配置 */
    const contextMenuConfig = React.useMemo(() => (props.config ? props.config : new ToolbarConfig()), [props.config]);
    if (!hasApp) {
        return null;
    }
    return React.createElement(XFlowToolbar, Object.assign({}, props, { config: contextMenuConfig }));
};
export const createToolbarConfig = (addOptions) => (value) => {
    /** bridge config and value */
    const proxy = React.useMemo(() => ({ getValue: () => ({}) }), []);
    proxy.getValue = () => value;
    /** 生成config */
    const toolbarConfig = React.useMemo(() => {
        const config = new ToolbarConfig();
        addOptions(config, proxy);
        return config;
    }, [proxy]);
    return toolbarConfig;
};
//# sourceMappingURL=index.js.map