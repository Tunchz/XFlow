import { IBuffer } from './IBuffer';
import { BufferData } from './IRendererService';
export interface IAttributeInitializationOptions {
    buffer: IBuffer;
    /**
     * vertexAttribPointer 单位为 byte，默认值均为 0
     */
    offset?: number;
    stride?: number;
    /**
     * 每个顶点数据块大小，取值范围为 [1..4]
     */
    size?: number;
    /**
     * 是否需要归一化 [-1,1] 或者 [0,1]，默认值 false
     */
    normalized?: boolean;
    /**
     * gl.vertexAttribDivisorANGLE，自动开启 ANGLE_instanced_arrays 扩展
     */
    divisor?: number;
    /**
     * WebGPU
     */
    arrayStride?: number;
    stepMode?: GPUInputStepMode;
    attributes?: Iterable<GPUVertexAttributeDescriptor>;
}
export interface IAttribute {
    updateBuffer(options: {
        data: BufferData;
        offset: number;
    }): void;
    destroy(): void;
}
