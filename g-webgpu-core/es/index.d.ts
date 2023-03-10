/// <reference types="@webgpu/types" />
import 'reflect-metadata';
import { Component, ComponentManager } from './ComponentManager';
import { FrameGraphSystem } from './components/framegraph/System';
import { GeometryComponent } from './components/geometry/GeometryComponent';
import { GeometrySystem } from './components/geometry/System';
import { MaterialComponent } from './components/material/MaterialComponent';
import { MaterialSystem } from './components/material/System';
import { CullableComponent } from './components/mesh/CullableComponent';
import { MeshComponent } from './components/mesh/MeshComponent';
import { MeshSystem } from './components/mesh/System';
import { IView } from './components/renderer';
import { PixelPickingPass } from './components/renderer/passes/PixelPickingPass';
import { RendererSystem } from './components/renderer/System';
import { HierarchyComponent } from './components/scenegraph/HierarchyComponent';
import { SceneGraphSystem } from './components/scenegraph/System';
import { TransformComponent } from './components/scenegraph/TransformComponent';
import { createEntity } from './Entity';
import { IDENTIFIER } from './identifier';
import { container, createWorldContainer, lazyInject, lazyMultiInject } from './inversify.config';
import { generateAABBFromVertices } from './utils/aabb';
import { isSafari } from './utils/isSafari';
/**
 * inspired by Entitas' Systems
 * @see https://github.com/sschmid/Entitas-CSharp/wiki/Systems
 */
export interface ISystem {
    /**
     * in a similar way to Unity's `Start()`, we can do some initialization works:
     * * create global entities
     * * init event listeners
     */
    initialize?(): Promise<void>;
    /**
     * in a similar way to Unity's `Update()`, run once per frame
     */
    execute?(views: IView[]): Promise<void>;
    /**
     * run at the end of each frame
     */
    cleanup?(): void;
    /**
     * run once at the end of your program
     */
    tearDown?(): void;
}
declare type Entity = number;
declare enum AST_TOKEN_TYPES {
    Void = "Void",
    Boolean = "Boolean",
    Float = "Float",
    Uint32 = "Uint32",
    Int32 = "Int32",
    Vector = "Vector",
    Vector2Float = "vec2<f32>",
    Vector3Float = "vec3<f32>",
    Vector4Float = "vec4<f32>",
    Vector2Boolean = "vec2<bool>",
    Vector3Boolean = "vec3<bool>",
    Vector4Boolean = "vec4<bool>",
    Vector2Uint = "vec2<u32>",
    Vector3Uint = "vec3<u32>",
    Vector4Uint = "vec4<u32>",
    Vector2Int = "vec2<i32>",
    Vector3Int = "vec3<i32>",
    Vector4Int = "vec4<i32>",
    Matrix = "Matrix",
    Matrix3x3Float = "mat3x3<f32>",
    Matrix4x4Float = "mat4x4<i32>",
    Struct = "Struct",
    FloatArray = "Float[]",
    Vector4FloatArray = "vec4<f32>[]"
}
declare enum AST_NODE_TYPES {
    Program = "Program",
    Identifier = "Identifier",
    VariableDeclaration = "VariableDeclaration",
    BlockStatement = "BlockStatement",
    ReturnStatement = "ReturnStatement",
    FunctionDeclaration = "FunctionDeclaration",
    VariableDeclarator = "VariableDeclarator",
    AssignmentExpression = "AssignmentExpression",
    LogicalExpression = "LogicalExpression",
    BinaryExpression = "BinaryExpression",
    ArrayExpression = "ArrayExpression",
    UnaryExpression = "UnaryExpression",
    UpdateExpression = "UpdateExpression",
    FunctionExpression = "FunctionExpression",
    MemberExpression = "MemberExpression",
    ConditionalExpression = "ConditionalExpression",
    ExpressionStatement = "ExpressionStatement",
    CallExpression = "CallExpression",
    NumThreadStatement = "NumThreadStatement",
    StorageStatement = "StorageStatement",
    DoWhileStatement = "DoWhileStatement",
    WhileStatement = "WhileStatement",
    ForStatement = "ForStatement",
    BreakStatement = "BreakStatement",
    ContinueStatement = "ContinueStatement",
    IfStatement = "IfStatement",
    ImportedFunctionStatement = "ImportedFunctionStatement"
}
declare enum STORAGE_CLASS {
    Input = "Input",
    Output = "Output",
    Uniform = "Uniform",
    Workgroup = "Workgroup",
    UniformConstant = "UniformConstant",
    Image = "Image",
    StorageBuffer = "StorageBuffer",
    Private = "Private",
    Function = "Function"
}
declare type TypedArrayConstructor = Int8ArrayConstructor | Uint8ArrayConstructor | Uint8ClampedArrayConstructor | Int16ArrayConstructor | Uint16ArrayConstructor | Int32ArrayConstructor | Uint32ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor;
declare type DataType = AST_TOKEN_TYPES.Uint32 | AST_TOKEN_TYPES.Int32 | AST_TOKEN_TYPES.Boolean | AST_TOKEN_TYPES.Float | AST_TOKEN_TYPES.Vector2Float | AST_TOKEN_TYPES.Vector3Float | AST_TOKEN_TYPES.Vector4Float | AST_TOKEN_TYPES.Vector2Int | AST_TOKEN_TYPES.Vector3Int | AST_TOKEN_TYPES.Vector4Int | AST_TOKEN_TYPES.Vector2Uint | AST_TOKEN_TYPES.Vector3Uint | AST_TOKEN_TYPES.Vector4Uint | AST_TOKEN_TYPES.Vector2Boolean | AST_TOKEN_TYPES.Vector3Boolean | AST_TOKEN_TYPES.Vector4Boolean | AST_TOKEN_TYPES.Matrix3x3Float | AST_TOKEN_TYPES.Matrix4x4Float | AST_TOKEN_TYPES.FloatArray | AST_TOKEN_TYPES.Vector4FloatArray | AST_TOKEN_TYPES.Void;
interface GLSLContext {
    /**
     * ?????????
     */
    name: string;
    shader?: string;
    /**
     * size of thread grid
     * ??? WebGL 2 Compute ?????? dispatchCompute
     * ?????? WebGPU ?????? dispatch
     */
    dispatch: [number, number, number];
    /**
     * size of each thread group
     * Compute Shader ?????? local_size_x/y/z
     */
    threadGroupSize: [number, number, number];
    /**
     * ???????????????????????????????????????????????????????????????????????????
     */
    maxIteration: number;
    /**
     * ???????????? pingpong???????????????????????????????????????????????????
     */
    needPingpong: boolean;
    /**
     * ??????????????????????????????????????? WebGL ??????
     */
    output: {
        name: string;
        size?: [number, number];
        textureSize?: [number, number];
        length?: number;
        typedArrayConstructor?: TypedArrayConstructor;
        gpuBuffer?: GPUBuffer;
        outputElementsPerTexel?: number;
    };
    /**
     * ????????????????????????????????????????????????
     * 1. ????????????????????????
     * 2. ??????????????????????????????????????????????????????????????????????????????
     * TODO ??????????????????????????? tensorflow ?????? DIV_CEIL
     */
    defines: Array<{
        name: string;
        type: DataType;
        value: number;
        runtime: boolean;
    }>;
    globalDeclarations: Array<{
        name: string;
        type: DataType;
        value: string;
        shared: boolean;
    }>;
    uniforms: Array<{
        name: string;
        type: DataType;
        data?: number | number[] | Float32Array | Uint8Array | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array;
        size?: [number, number];
        storageClass: STORAGE_CLASS;
        readonly: boolean;
        writeonly: boolean;
        isReferer?: boolean;
    }>;
}
/**
 * ???????????????????????? Shader ??????
 * * WebGL GLSL 1.0
 * * WebGPU Chrome/Edge GLSL 4.5 & WGSL @see https://gpuweb.github.io/gpuweb/wgsl.html
 * * Safari WHLSL (maybe deprecated)
 */
declare enum Target {
    GLSL100 = "GLSL100",
    GLSL450 = "GLSL450",
    WGSL = "WGSL"
}
declare const DefineValuePlaceholder = "__DefineValuePlaceholder__";
interface KernelBundle {
    shaders: {
        [Target.WGSL]: string;
        [Target.GLSL450]: string;
        [Target.GLSL100]: string;
    };
    context?: GLSLContext;
    toString(): string;
}
export * from './ComponentManager';
export * from './services';
export * from './shape';
export * from './components/renderer';
export * from './components/material/interface';
export * from './components/mesh/interface';
export * from './components/renderer';
export { container, createWorldContainer, lazyInject, lazyMultiInject, createEntity, Component, ComponentManager, Entity, IDENTIFIER, FrameGraphSystem, GeometrySystem, RendererSystem, MaterialSystem, MeshSystem, SceneGraphSystem, CullableComponent, MeshComponent, TransformComponent, MaterialComponent, GeometryComponent, HierarchyComponent, isSafari, generateAABBFromVertices, PixelPickingPass, AST_TOKEN_TYPES, AST_NODE_TYPES, STORAGE_CLASS, Target, DefineValuePlaceholder, GLSLContext, DataType, KernelBundle, };
