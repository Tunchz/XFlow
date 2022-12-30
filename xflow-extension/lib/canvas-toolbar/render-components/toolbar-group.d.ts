import React from 'react';
import type { IToolbarGroupOptions, IToolbarLayout } from '@tunchz/xflow/xflow-core';
export interface IProps {
    group: IToolbarGroupOptions;
    layout: IToolbarLayout;
}
export declare const ToolbarGroup: React.FC<IProps>;
