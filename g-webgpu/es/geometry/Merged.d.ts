import { GeometryComponent } from '@tunchz/xflow/g-webgpu-core';
import { Geometry } from '.';
export interface IMergedGeometryParams {
    geometries: GeometryComponent[];
}
export declare class Merged extends Geometry<Partial<IMergedGeometryParams>> {
    protected onEntityCreated(): void;
}
