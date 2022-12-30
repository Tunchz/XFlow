import type { Graph } from '@tunchz/xflow/x6';
import type { IModelService } from '@tunchz/xflow/xflow-core';
import type { ICmdHooks } from '@tunchz/xflow/xflow-core';
import { IHookContribution } from '@tunchz/xflow/xflow-core';
import { IGraphProvider } from '@tunchz/xflow/xflow-core';
import { DisposableCollection, IModelContribution, Disposable } from '@tunchz/xflow/xflow-core';
/**
 * 内置的hook contribution
 * 处理 config上的runtime的注册项
 */
export declare class NodePortTooltipContribution implements IHookContribution<ICmdHooks>, IModelContribution {
    toDispose: DisposableCollection;
    protected readonly graphProvider: IGraphProvider;
    /** 获取画布实例 */
    getGraphInstance: () => Promise<{
        graph: Graph;
        config: import("@tunchz/xflow/xflow-core").IGraphConfig;
    }>;
    /** 获取GraphOptions */
    getPortRenderConfig: () => Graph.Options;
    registerHookHub: () => Promise<Disposable>;
    registerHook: (hooks: ICmdHooks) => Promise<Disposable>;
    registerModel(registry: IModelService): void;
}
