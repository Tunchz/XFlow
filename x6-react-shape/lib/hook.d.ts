import { Graph } from '@tunchz/xflow/x6';
import { Definition } from './registry';
import { ReactShape } from './node';
declare module '@tunchz/xflow/x6/lib/graph/hook' {
    namespace Hook {
        interface IHook {
            getReactComponent(this: Graph, node: ReactShape): Definition;
        }
    }
    interface Hook {
        getReactComponent(node: ReactShape): Definition;
    }
}
