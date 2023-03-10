/// <reference types="react" />
import type { IGraphCommandService, IModelService, IPosition, NsGraph } from '@tunchz/xflow/xflow-core';
import type { Cell } from '@tunchz/xflow/x6';
import type { NsJsonSchemaForm } from '../canvas-json-schema-form';
export interface IFlowchartFormPanelProps {
    style?: React.CSSProperties;
    className?: string;
    /** 是否展示 */
    show?: boolean;
    /** 节点位置 */
    position?: IPosition;
    prefixClz?: string;
    controlMapService?: (editorMap: NsJsonSchemaForm.IControlMap) => NsJsonSchemaForm.IControlMap;
    formSchemaService?: (args: {
        cell: Cell;
        targetType: NsJsonSchemaForm.TargetType;
        targetData: NsJsonSchemaForm.TargetData;
        modelService: IModelService;
        commandService: IGraphCommandService;
    }) => Promise<NsJsonSchemaForm.ISchema>;
    getCustomRenderComponent?: NsJsonSchemaForm.ICustomRender;
    header?: React.ReactNode;
}
export declare type IFlowchartFormWrapperProps = NsJsonSchemaForm.IControlProps & {
    children: (config: Object, plugin: {
        updateNode: (config: NsGraph.INodeConfig) => void;
        updateEdge: (config: NsGraph.IEdgeConfig) => void;
        updateGroup: (config: NsGraph.INodeConfig) => void;
    }) => React.ReactElement;
};
