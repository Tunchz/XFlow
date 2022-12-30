import type { ICmdHooks } from '@tunchz/xflow/xflow-core';
import { DisposableCollection, Disposable } from '@tunchz/xflow/xflow-core';
import { IHookContribution } from '@tunchz/xflow/xflow-core';
/**
 * 内置的hook contribution
 * 处理 config上的runtime的注册项
 */
export declare class HookContribution implements IHookContribution<ICmdHooks> {
    toDispose: DisposableCollection;
    registerHookHub: () => Promise<Disposable>;
    registerHook: (hooks: ICmdHooks) => Promise<Disposable>;
}
