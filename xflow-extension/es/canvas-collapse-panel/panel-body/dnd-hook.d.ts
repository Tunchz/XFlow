import React from 'react';
import type { IGraphConfig } from '@tunchz/xflow/xflow-core';
import type { IProps, NsCollapsePanelModel, IOnActiveKeyChange, IPanelNode, INodeFactoryArgs } from '../interface';
export interface IBodyProps extends IProps {
    state: NsCollapsePanelModel.IState;
    onActiveKeyChange: IOnActiveKeyChange;
}
export declare const defaultNodeFactory: (args: INodeFactoryArgs) => import("@tunchz/xflow/x6").Node<import("@tunchz/xflow/x6").Node.Properties>;
export declare const useGraphDnd: (props: IBodyProps) => {
    graphConfig: IGraphConfig;
    onMouseDown: (nodeConfig: IPanelNode) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    modelService: import("@tunchz/xflow/xflow-core").IModelService;
    commandService: import("@tunchz/xflow/xflow-core").IGraphCommandService;
};
