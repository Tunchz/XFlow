import { NodeView } from '@tunchz/xflow/x6';
export declare class SimpleNodeView extends NodeView {
    static nodeFillColor: string;
    static setNodeFillColor: (color: string) => void;
    protected renderMarkup(): void;
    update(): void;
}
