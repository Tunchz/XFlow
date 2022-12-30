/// <reference types="react" />
import type { ContextMenuConfig } from './config';
import type { IAnchor, IMenuModel, IMenuTarget, IModelService, DisposableCollection } from '@tunchz/xflow/xflow-core';
export interface IProps {
    config: ContextMenuConfig;
}
export declare namespace CONTEXT_MENU_MODEL {
    const id = "CONTEXT_MENU_MODEL";
    interface IState {
        anchor: IAnchor;
        target: IMenuTarget;
        customRender: React.FC<IMenuRenderProps>;
        menuModel: IMenuModel;
        toDispose: DisposableCollection;
    }
    const useValue: (modelService: IModelService) => Promise<IState>;
    const getModel: (modelService: IModelService) => Promise<import("@tunchz/xflow/xflow-core").NsModel.IModel<IState>>;
}
export interface IMenuRenderProps {
    target: IMenuTarget;
    modelService: IModelService;
    onHide: () => void;
}
