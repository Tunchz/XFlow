import type { IGraphCommandService, IModelService } from '@tunchz/xflow/xflow-core';
import type { IProps, ISchema, TargetType, TargetData } from './interface';
import type { Cell } from '@tunchz/xflow/x6';
export declare namespace NsJsonSchemaFormModel {
    const id = "XFLOW_JSON_SCHEMA_FORM";
    interface IState {
        loading: boolean;
        schema: ISchema;
        targetType: TargetType;
        targetData: TargetData;
        targetCell: Cell | null;
    }
    const useModel: (model: IModelService) => Promise<import("@tunchz/xflow/xflow-core").NsModel.IModel<IState>>;
}
/** 方便其他组件执行Command改变Panel内部状态 */
export declare const executeJsonSchemaFormCommand: (cmds: IGraphCommandService, updateModel: (state: NsJsonSchemaFormModel.IState) => Promise<void>) => void;
export declare const useJsonSchemaFormModel: (props: IProps) => {
    commandService: IGraphCommandService;
    modelService: IModelService;
    state: NsJsonSchemaFormModel.IState;
    setState: import("@tunchz/xflow/xflow-core").NsModel.ISetValue<NsJsonSchemaFormModel.IState>;
    model: import("@tunchz/xflow/xflow-core").RxModel<NsJsonSchemaFormModel.IState>;
    isModelReady: boolean;
};
