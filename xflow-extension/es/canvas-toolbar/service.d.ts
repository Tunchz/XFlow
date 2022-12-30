import type { IToolbarOptions } from '@tunchz/xflow/xflow-core';
import React from 'react';
import type { IToolbarProps } from './interface';
declare namespace NsToolbarModel {
    interface IState extends IToolbarOptions {
        customRender?: React.FC<{
            config: IToolbarOptions;
        }>;
    }
}
export declare const useToolbarModel: (props: IToolbarProps) => {
    isModelReady: boolean;
    state: NsToolbarModel.IState;
    setState: import("@tunchz/xflow/xflow-core").NsModel.ISetValue<NsToolbarModel.IState>;
    toolbarModel: import("@tunchz/xflow/xflow-core").RxModel<NsToolbarModel.IState>;
};
export {};
