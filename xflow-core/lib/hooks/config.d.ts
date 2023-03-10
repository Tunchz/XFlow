import type { IRegisterHookHubFn, IRegisterHookFn } from './interface';
import type { IModuleConfig } from '../xflow-main/interface';
export declare const noop: () => {
    dispose: () => void;
};
export declare namespace NsXFlowHook {
    const CONFIG_TYPE = "XFlowHook";
}
export declare class HookConfig implements IModuleConfig {
    /** CONFIG_TYPE */
    readonly CONFIG_TYPE = "XFlowHook";
    time: number;
    /** 外部注册hook的方法 */
    private hookRegisterFunc?;
    /** 外部注册hookhub的方法 */
    private hookhubRegisterFn?;
    /** 提供一个runtime注册hook的方式 */
    setRegisterHook: (fn: IRegisterHookFn) => void;
    /** 这里在canvas上提供一个runtime注册hookhub的方式 */
    setRegisterHookhub: (fn: IRegisterHookHubFn) => void;
    getConfig: () => Promise<{
        CONFIG_TYPE: string;
        hookRegisterFn: IRegisterHookFn<{
            graphOptions: import("@tunchz/xflow/xflow-hook").HookHub<import("@tunchz/xflow/x6").Graph.Options, import("@tunchz/xflow/x6").Graph.Options>;
            reactNodeRender: import("@tunchz/xflow/xflow-hook").HookHub<Map<string, import("..").NsGraph.INodeRender<any>>, Map<string, import("..").NsGraph.INodeRender<any>>>;
            reactEdgeLabelRender: import("@tunchz/xflow/xflow-hook").HookHub<Map<string, import("..").NsGraph.IEdgeRender<any>>, Map<string, import("..").NsGraph.IEdgeRender<any>>>;
            afterGraphInit: import("@tunchz/xflow/xflow-hook").HookHub<import("./interface").IGeneralAppService, import("./interface").IGeneralAppService>;
            beforeGraphDestroy: import("@tunchz/xflow/xflow-hook").HookHub<import("./interface").IGeneralAppService, import("./interface").IGeneralAppService>;
            x6Events: import("@tunchz/xflow/xflow-hook").HookHub<import("./interface").IEventCollection, import("./interface").IEventSubscription>;
        }>;
        hookhubRegisterFn: IRegisterHookHubFn<{
            graphOptions: import("@tunchz/xflow/xflow-hook").HookHub<import("@tunchz/xflow/x6").Graph.Options, import("@tunchz/xflow/x6").Graph.Options>;
            reactNodeRender: import("@tunchz/xflow/xflow-hook").HookHub<Map<string, import("..").NsGraph.INodeRender<any>>, Map<string, import("..").NsGraph.INodeRender<any>>>;
            reactEdgeLabelRender: import("@tunchz/xflow/xflow-hook").HookHub<Map<string, import("..").NsGraph.IEdgeRender<any>>, Map<string, import("..").NsGraph.IEdgeRender<any>>>;
            afterGraphInit: import("@tunchz/xflow/xflow-hook").HookHub<import("./interface").IGeneralAppService, import("./interface").IGeneralAppService>;
            beforeGraphDestroy: import("@tunchz/xflow/xflow-hook").HookHub<import("./interface").IGeneralAppService, import("./interface").IGeneralAppService>;
            x6Events: import("@tunchz/xflow/xflow-hook").HookHub<import("./interface").IEventCollection, import("./interface").IEventSubscription>;
        }>;
    }>;
    dispose: () => void;
}
