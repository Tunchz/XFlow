import { Node } from '@tunchz/xflow/x6';
import { NsGraph } from '@tunchz/xflow/xflow-core/es/interface';
export declare const XFLOW_NODE_SHAPE = "XFLOW_NODE_SHAPE";
export declare const NODE_DEFAULT_WIDTH = 160;
export declare const NODE_DEFAULT_HEIGHT = 32;
declare let XFlowNode: Node.Definition;
declare const AnchorGroup: typeof NsGraph.AnchorGroup;
export { XFlowNode, AnchorGroup };
