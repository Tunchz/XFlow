import { IUniform } from '../../components/renderer/IUniform';
/**
 * 提供 ShaderModule 管理服务
 */
export interface IModuleParams {
    vs?: string;
    fs?: string;
    uniforms?: {
        [key: string]: IUniform;
    };
}
export interface IShaderModuleService {
    registerModule(moduleName: string, moduleParams: IModuleParams): void;
    getModule(moduleName: string): IModuleParams;
    /**
     * 注册内置 shader module
     */
    registerBuiltinModules(): void;
    destroy(): void;
}
export default class ShaderModuleService implements IShaderModuleService {
    private moduleCache;
    private rawContentCache;
    registerBuiltinModules(): void;
    registerModule(moduleName: string, moduleParams: IModuleParams): void;
    destroy(): void;
    getModule(moduleName: string): IModuleParams;
    private processModule;
}
