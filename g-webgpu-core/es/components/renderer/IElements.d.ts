import { gl } from './gl';
export interface IElementsInitializationOptions {
    data: number[] | Uint8Array | Uint16Array | Uint32Array;
    /**
     * gl.DRAW_STATIC | gl.DYNAMIC_DRAW | gl.STREAM_DRAW
     */
    usage?: gl;
    /**
     * gl.UNSIGNED_BYTE  | gl.UNSIGNED_SHORT | gl.UNSIGNED_INT（开启 OES_element_index_uint 扩展）
     */
    type?: gl.UNSIGNED_BYTE | gl.UNSIGNED_SHORT | gl.UNSIGNED_INT;
    length?: number;
    primitive?: gl.POINTS | gl.LINES | gl.LINE_STRIP | gl.LINE_LOOP | gl.TRIANGLES | gl.TRIANGLE_STRIP | gl.TRIANGLE_FAN;
    count?: number;
}
export interface IElements {
    /**
     * gl.bufferSubData
     */
    subData(options: {
        data: number[] | Uint8Array | Uint16Array | Uint32Array;
        offset: number;
    }): void;
    /**
     * gl.deleteBuffer
     */
    destroy(): void;
}
