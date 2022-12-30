/// <reference types="react" />
import { Graph, Node, Registry } from '@tunchz/xflow/x6';
export declare type Definition = ((this: Graph, node: Node) => React.ReactElement | null | undefined) | React.ReactElement;
export declare const registry: Registry.Registry<Definition, import("@tunchz/xflow/x6/lib/types").KeyValue<Definition>, never>;
declare module '@tunchz/xflow/x6/lib/graph/graph' {
    namespace Graph {
        let registerReactComponent: typeof registry.register;
        let unregisterReactComponent: typeof registry.unregister;
    }
}
