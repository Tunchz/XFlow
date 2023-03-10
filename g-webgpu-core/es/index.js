// tslint:disable-next-line:no-reference
/// <reference path="../../../node_modules/@webgpu/types/dist/index.d.ts" />
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

var AST_TOKEN_TYPES;

(function (AST_TOKEN_TYPES) {
  AST_TOKEN_TYPES["Void"] = "Void";
  AST_TOKEN_TYPES["Boolean"] = "Boolean";
  AST_TOKEN_TYPES["Float"] = "Float";
  AST_TOKEN_TYPES["Uint32"] = "Uint32";
  AST_TOKEN_TYPES["Int32"] = "Int32";
  AST_TOKEN_TYPES["Vector"] = "Vector";
  AST_TOKEN_TYPES["Vector2Float"] = "vec2<f32>";
  AST_TOKEN_TYPES["Vector3Float"] = "vec3<f32>";
  AST_TOKEN_TYPES["Vector4Float"] = "vec4<f32>";
  AST_TOKEN_TYPES["Vector2Boolean"] = "vec2<bool>";
  AST_TOKEN_TYPES["Vector3Boolean"] = "vec3<bool>";
  AST_TOKEN_TYPES["Vector4Boolean"] = "vec4<bool>";
  AST_TOKEN_TYPES["Vector2Uint"] = "vec2<u32>";
  AST_TOKEN_TYPES["Vector3Uint"] = "vec3<u32>";
  AST_TOKEN_TYPES["Vector4Uint"] = "vec4<u32>";
  AST_TOKEN_TYPES["Vector2Int"] = "vec2<i32>";
  AST_TOKEN_TYPES["Vector3Int"] = "vec3<i32>";
  AST_TOKEN_TYPES["Vector4Int"] = "vec4<i32>";
  AST_TOKEN_TYPES["Matrix"] = "Matrix";
  AST_TOKEN_TYPES["Matrix3x3Float"] = "mat3x3<f32>";
  AST_TOKEN_TYPES["Matrix4x4Float"] = "mat4x4<i32>";
  AST_TOKEN_TYPES["Struct"] = "Struct";
  AST_TOKEN_TYPES["FloatArray"] = "Float[]";
  AST_TOKEN_TYPES["Vector4FloatArray"] = "vec4<f32>[]";
})(AST_TOKEN_TYPES || (AST_TOKEN_TYPES = {}));

var AST_NODE_TYPES;

(function (AST_NODE_TYPES) {
  AST_NODE_TYPES["Program"] = "Program";
  AST_NODE_TYPES["Identifier"] = "Identifier";
  AST_NODE_TYPES["VariableDeclaration"] = "VariableDeclaration";
  AST_NODE_TYPES["BlockStatement"] = "BlockStatement";
  AST_NODE_TYPES["ReturnStatement"] = "ReturnStatement";
  AST_NODE_TYPES["FunctionDeclaration"] = "FunctionDeclaration";
  AST_NODE_TYPES["VariableDeclarator"] = "VariableDeclarator";
  AST_NODE_TYPES["AssignmentExpression"] = "AssignmentExpression";
  AST_NODE_TYPES["LogicalExpression"] = "LogicalExpression";
  AST_NODE_TYPES["BinaryExpression"] = "BinaryExpression";
  AST_NODE_TYPES["ArrayExpression"] = "ArrayExpression";
  AST_NODE_TYPES["UnaryExpression"] = "UnaryExpression";
  AST_NODE_TYPES["UpdateExpression"] = "UpdateExpression";
  AST_NODE_TYPES["FunctionExpression"] = "FunctionExpression";
  AST_NODE_TYPES["MemberExpression"] = "MemberExpression";
  AST_NODE_TYPES["ConditionalExpression"] = "ConditionalExpression";
  AST_NODE_TYPES["ExpressionStatement"] = "ExpressionStatement";
  AST_NODE_TYPES["CallExpression"] = "CallExpression";
  AST_NODE_TYPES["NumThreadStatement"] = "NumThreadStatement";
  AST_NODE_TYPES["StorageStatement"] = "StorageStatement";
  AST_NODE_TYPES["DoWhileStatement"] = "DoWhileStatement";
  AST_NODE_TYPES["WhileStatement"] = "WhileStatement";
  AST_NODE_TYPES["ForStatement"] = "ForStatement";
  AST_NODE_TYPES["BreakStatement"] = "BreakStatement";
  AST_NODE_TYPES["ContinueStatement"] = "ContinueStatement";
  AST_NODE_TYPES["IfStatement"] = "IfStatement";
  AST_NODE_TYPES["ImportedFunctionStatement"] = "ImportedFunctionStatement";
})(AST_NODE_TYPES || (AST_NODE_TYPES = {}));

var STORAGE_CLASS;

(function (STORAGE_CLASS) {
  STORAGE_CLASS["Input"] = "Input";
  STORAGE_CLASS["Output"] = "Output";
  STORAGE_CLASS["Uniform"] = "Uniform";
  STORAGE_CLASS["Workgroup"] = "Workgroup";
  STORAGE_CLASS["UniformConstant"] = "UniformConstant";
  STORAGE_CLASS["Image"] = "Image";
  STORAGE_CLASS["StorageBuffer"] = "StorageBuffer";
  STORAGE_CLASS["Private"] = "Private";
  STORAGE_CLASS["Function"] = "Function";
})(STORAGE_CLASS || (STORAGE_CLASS = {}));

/**
 * ???????????????????????? Shader ??????
 * * WebGL GLSL 1.0
 * * WebGPU Chrome/Edge GLSL 4.5 & WGSL @see https://gpuweb.github.io/gpuweb/wgsl.html
 * * Safari WHLSL (maybe deprecated)
 */
var Target;

(function (Target) {
  Target["GLSL100"] = "GLSL100";
  Target["GLSL450"] = "GLSL450";
  Target["WGSL"] = "WGSL";
})(Target || (Target = {}));

var DefineValuePlaceholder = '__DefineValuePlaceholder__';
export * from './ComponentManager';
export * from './services';
export * from './shape';
export * from './components/renderer';
export * from './components/material/interface';
export * from './components/mesh/interface';
export * from './components/renderer';
export { container, createWorldContainer, lazyInject, lazyMultiInject, createEntity, Component, ComponentManager, IDENTIFIER, FrameGraphSystem, GeometrySystem, RendererSystem // InteractionSystem,
, MaterialSystem, MeshSystem, SceneGraphSystem, CullableComponent, MeshComponent, TransformComponent, MaterialComponent, GeometryComponent, HierarchyComponent, isSafari, generateAABBFromVertices, PixelPickingPass, AST_TOKEN_TYPES, AST_NODE_TYPES, STORAGE_CLASS, Target, DefineValuePlaceholder };
//# sourceMappingURL=index.js.map