import 'reflect-metadata';
import { ManaSyringe } from '@tunchz/xflow/xflow-core';
import type { IModuleConfig } from '@tunchz/xflow/xflow-core';
import type { IMinimapOptions } from './interface';
/** 依赖扩展模块，必须要加载 */
declare const createModule: (config: IModuleConfig<IMinimapOptions>) => ManaSyringe.SyringeModule;
export { createModule };
