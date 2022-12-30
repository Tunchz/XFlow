"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cullFaceMap = exports.stencilOpMap = exports.stencilFuncMap = exports.blendFuncMap = exports.blendEquationMap = exports.depthFuncMap = exports.colorSpaceMap = exports.wrapModeMap = exports.filterMap = exports.mipmapMap = exports.formatMap = exports.dataTypeMap = exports.usageMap = exports.primitiveMap = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _gWebgpuCore = require("@antv/g-webgpu-core");

var _primitiveMap, _usageMap, _dataTypeMap, _formatMap, _mipmapMap, _filterMap, _wrapModeMap, _colorSpaceMap, _depthFuncMap, _blendEquationMap, _blendFuncMap, _stencilFuncMap, _stencilOpMap, _cullFaceMap;

// @see https://github.com/regl-project/regl/blob/gh-pages/lib/constants/primitives.json
var primitiveMap = (_primitiveMap = {}, (0, _defineProperty2.default)(_primitiveMap, _gWebgpuCore.gl.POINTS, 'points'), (0, _defineProperty2.default)(_primitiveMap, _gWebgpuCore.gl.LINES, 'lines'), (0, _defineProperty2.default)(_primitiveMap, _gWebgpuCore.gl.LINE_LOOP, 'line loop'), (0, _defineProperty2.default)(_primitiveMap, _gWebgpuCore.gl.LINE_STRIP, 'line strip'), (0, _defineProperty2.default)(_primitiveMap, _gWebgpuCore.gl.TRIANGLES, 'triangles'), (0, _defineProperty2.default)(_primitiveMap, _gWebgpuCore.gl.TRIANGLE_FAN, 'triangle fan'), (0, _defineProperty2.default)(_primitiveMap, _gWebgpuCore.gl.TRIANGLE_STRIP, 'triangle strip'), _primitiveMap);
exports.primitiveMap = primitiveMap;
var usageMap = (_usageMap = {}, (0, _defineProperty2.default)(_usageMap, _gWebgpuCore.gl.STATIC_DRAW, 'static'), (0, _defineProperty2.default)(_usageMap, _gWebgpuCore.gl.DYNAMIC_DRAW, 'dynamic'), (0, _defineProperty2.default)(_usageMap, _gWebgpuCore.gl.STREAM_DRAW, 'stream'), _usageMap);
exports.usageMap = usageMap;
var dataTypeMap = (_dataTypeMap = {}, (0, _defineProperty2.default)(_dataTypeMap, _gWebgpuCore.gl.BYTE, 'int8'), (0, _defineProperty2.default)(_dataTypeMap, _gWebgpuCore.gl.UNSIGNED_INT, 'int16'), (0, _defineProperty2.default)(_dataTypeMap, _gWebgpuCore.gl.INT, 'int32'), (0, _defineProperty2.default)(_dataTypeMap, _gWebgpuCore.gl.UNSIGNED_BYTE, 'uint8'), (0, _defineProperty2.default)(_dataTypeMap, _gWebgpuCore.gl.UNSIGNED_SHORT, 'uint16'), (0, _defineProperty2.default)(_dataTypeMap, _gWebgpuCore.gl.UNSIGNED_INT, 'uint32'), (0, _defineProperty2.default)(_dataTypeMap, _gWebgpuCore.gl.FLOAT, 'float'), _dataTypeMap);
exports.dataTypeMap = dataTypeMap;
var formatMap = (_formatMap = {}, (0, _defineProperty2.default)(_formatMap, _gWebgpuCore.gl.ALPHA, 'alpha'), (0, _defineProperty2.default)(_formatMap, _gWebgpuCore.gl.LUMINANCE, 'luminance'), (0, _defineProperty2.default)(_formatMap, _gWebgpuCore.gl.LUMINANCE_ALPHA, 'luminance alpha'), (0, _defineProperty2.default)(_formatMap, _gWebgpuCore.gl.RGB, 'rgb'), (0, _defineProperty2.default)(_formatMap, _gWebgpuCore.gl.RGBA, 'rgba'), (0, _defineProperty2.default)(_formatMap, _gWebgpuCore.gl.RGBA4, 'rgba4'), (0, _defineProperty2.default)(_formatMap, _gWebgpuCore.gl.RGB5_A1, 'rgb5 a1'), (0, _defineProperty2.default)(_formatMap, _gWebgpuCore.gl.RGB565, 'rgb565'), (0, _defineProperty2.default)(_formatMap, _gWebgpuCore.gl.DEPTH_COMPONENT, 'depth'), (0, _defineProperty2.default)(_formatMap, _gWebgpuCore.gl.DEPTH_STENCIL, 'depth stencil'), _formatMap);
exports.formatMap = formatMap;
var mipmapMap = (_mipmapMap = {}, (0, _defineProperty2.default)(_mipmapMap, _gWebgpuCore.gl.DONT_CARE, 'dont care'), (0, _defineProperty2.default)(_mipmapMap, _gWebgpuCore.gl.NICEST, 'nice'), (0, _defineProperty2.default)(_mipmapMap, _gWebgpuCore.gl.FASTEST, 'fast'), _mipmapMap);
exports.mipmapMap = mipmapMap;
var filterMap = (_filterMap = {}, (0, _defineProperty2.default)(_filterMap, _gWebgpuCore.gl.NEAREST, 'nearest'), (0, _defineProperty2.default)(_filterMap, _gWebgpuCore.gl.LINEAR, 'linear'), (0, _defineProperty2.default)(_filterMap, _gWebgpuCore.gl.LINEAR_MIPMAP_LINEAR, 'mipmap'), (0, _defineProperty2.default)(_filterMap, _gWebgpuCore.gl.NEAREST_MIPMAP_LINEAR, 'nearest mipmap linear'), (0, _defineProperty2.default)(_filterMap, _gWebgpuCore.gl.LINEAR_MIPMAP_NEAREST, 'linear mipmap nearest'), (0, _defineProperty2.default)(_filterMap, _gWebgpuCore.gl.NEAREST_MIPMAP_NEAREST, 'nearest mipmap nearest'), _filterMap);
exports.filterMap = filterMap;
var wrapModeMap = (_wrapModeMap = {}, (0, _defineProperty2.default)(_wrapModeMap, _gWebgpuCore.gl.REPEAT, 'repeat'), (0, _defineProperty2.default)(_wrapModeMap, _gWebgpuCore.gl.CLAMP_TO_EDGE, 'clamp'), (0, _defineProperty2.default)(_wrapModeMap, _gWebgpuCore.gl.MIRRORED_REPEAT, 'mirror'), _wrapModeMap);
exports.wrapModeMap = wrapModeMap;
var colorSpaceMap = (_colorSpaceMap = {}, (0, _defineProperty2.default)(_colorSpaceMap, _gWebgpuCore.gl.NONE, 'none'), (0, _defineProperty2.default)(_colorSpaceMap, _gWebgpuCore.gl.BROWSER_DEFAULT_WEBGL, 'browser'), _colorSpaceMap);
exports.colorSpaceMap = colorSpaceMap;
var depthFuncMap = (_depthFuncMap = {}, (0, _defineProperty2.default)(_depthFuncMap, _gWebgpuCore.gl.NEVER, 'never'), (0, _defineProperty2.default)(_depthFuncMap, _gWebgpuCore.gl.ALWAYS, 'always'), (0, _defineProperty2.default)(_depthFuncMap, _gWebgpuCore.gl.LESS, 'less'), (0, _defineProperty2.default)(_depthFuncMap, _gWebgpuCore.gl.LEQUAL, 'lequal'), (0, _defineProperty2.default)(_depthFuncMap, _gWebgpuCore.gl.GREATER, 'greater'), (0, _defineProperty2.default)(_depthFuncMap, _gWebgpuCore.gl.GEQUAL, 'gequal'), (0, _defineProperty2.default)(_depthFuncMap, _gWebgpuCore.gl.EQUAL, 'equal'), (0, _defineProperty2.default)(_depthFuncMap, _gWebgpuCore.gl.NOTEQUAL, 'notequal'), _depthFuncMap);
exports.depthFuncMap = depthFuncMap;
var blendEquationMap = (_blendEquationMap = {}, (0, _defineProperty2.default)(_blendEquationMap, _gWebgpuCore.gl.FUNC_ADD, 'add'), (0, _defineProperty2.default)(_blendEquationMap, _gWebgpuCore.gl.MIN_EXT, 'min'), (0, _defineProperty2.default)(_blendEquationMap, _gWebgpuCore.gl.MAX_EXT, 'max'), (0, _defineProperty2.default)(_blendEquationMap, _gWebgpuCore.gl.FUNC_SUBTRACT, 'subtract'), (0, _defineProperty2.default)(_blendEquationMap, _gWebgpuCore.gl.FUNC_REVERSE_SUBTRACT, 'reverse subtract'), _blendEquationMap);
exports.blendEquationMap = blendEquationMap;
var blendFuncMap = (_blendFuncMap = {}, (0, _defineProperty2.default)(_blendFuncMap, _gWebgpuCore.gl.ZERO, 'zero'), (0, _defineProperty2.default)(_blendFuncMap, _gWebgpuCore.gl.ONE, 'one'), (0, _defineProperty2.default)(_blendFuncMap, _gWebgpuCore.gl.SRC_COLOR, 'src color'), (0, _defineProperty2.default)(_blendFuncMap, _gWebgpuCore.gl.ONE_MINUS_SRC_COLOR, 'one minus src color'), (0, _defineProperty2.default)(_blendFuncMap, _gWebgpuCore.gl.SRC_ALPHA, 'src alpha'), (0, _defineProperty2.default)(_blendFuncMap, _gWebgpuCore.gl.ONE_MINUS_SRC_ALPHA, 'one minus src alpha'), (0, _defineProperty2.default)(_blendFuncMap, _gWebgpuCore.gl.DST_COLOR, 'dst color'), (0, _defineProperty2.default)(_blendFuncMap, _gWebgpuCore.gl.ONE_MINUS_DST_COLOR, 'one minus dst color'), (0, _defineProperty2.default)(_blendFuncMap, _gWebgpuCore.gl.DST_ALPHA, 'dst alpha'), (0, _defineProperty2.default)(_blendFuncMap, _gWebgpuCore.gl.ONE_MINUS_DST_ALPHA, 'one minus dst alpha'), (0, _defineProperty2.default)(_blendFuncMap, _gWebgpuCore.gl.CONSTANT_COLOR, 'constant color'), (0, _defineProperty2.default)(_blendFuncMap, _gWebgpuCore.gl.ONE_MINUS_CONSTANT_COLOR, 'one minus constant color'), (0, _defineProperty2.default)(_blendFuncMap, _gWebgpuCore.gl.CONSTANT_ALPHA, 'constant alpha'), (0, _defineProperty2.default)(_blendFuncMap, _gWebgpuCore.gl.ONE_MINUS_CONSTANT_ALPHA, 'one minus constant alpha'), (0, _defineProperty2.default)(_blendFuncMap, _gWebgpuCore.gl.SRC_ALPHA_SATURATE, 'src alpha saturate'), _blendFuncMap);
exports.blendFuncMap = blendFuncMap;
var stencilFuncMap = (_stencilFuncMap = {}, (0, _defineProperty2.default)(_stencilFuncMap, _gWebgpuCore.gl.NEVER, 'never'), (0, _defineProperty2.default)(_stencilFuncMap, _gWebgpuCore.gl.ALWAYS, 'always'), (0, _defineProperty2.default)(_stencilFuncMap, _gWebgpuCore.gl.LESS, 'less'), (0, _defineProperty2.default)(_stencilFuncMap, _gWebgpuCore.gl.LEQUAL, 'lequal'), (0, _defineProperty2.default)(_stencilFuncMap, _gWebgpuCore.gl.GREATER, 'greater'), (0, _defineProperty2.default)(_stencilFuncMap, _gWebgpuCore.gl.GEQUAL, 'gequal'), (0, _defineProperty2.default)(_stencilFuncMap, _gWebgpuCore.gl.EQUAL, 'equal'), (0, _defineProperty2.default)(_stencilFuncMap, _gWebgpuCore.gl.NOTEQUAL, 'notequal'), _stencilFuncMap);
exports.stencilFuncMap = stencilFuncMap;
var stencilOpMap = (_stencilOpMap = {}, (0, _defineProperty2.default)(_stencilOpMap, _gWebgpuCore.gl.ZERO, 'zero'), (0, _defineProperty2.default)(_stencilOpMap, _gWebgpuCore.gl.KEEP, 'keep'), (0, _defineProperty2.default)(_stencilOpMap, _gWebgpuCore.gl.REPLACE, 'replace'), (0, _defineProperty2.default)(_stencilOpMap, _gWebgpuCore.gl.INVERT, 'invert'), (0, _defineProperty2.default)(_stencilOpMap, _gWebgpuCore.gl.INCR, 'increment'), (0, _defineProperty2.default)(_stencilOpMap, _gWebgpuCore.gl.DECR, 'decrement'), (0, _defineProperty2.default)(_stencilOpMap, _gWebgpuCore.gl.INCR_WRAP, 'increment wrap'), (0, _defineProperty2.default)(_stencilOpMap, _gWebgpuCore.gl.DECR_WRAP, 'decrement wrap'), _stencilOpMap);
exports.stencilOpMap = stencilOpMap;
var cullFaceMap = (_cullFaceMap = {}, (0, _defineProperty2.default)(_cullFaceMap, _gWebgpuCore.gl.FRONT, 'front'), (0, _defineProperty2.default)(_cullFaceMap, _gWebgpuCore.gl.BACK, 'back'), _cullFaceMap);
exports.cullFaceMap = cullFaceMap;
//# sourceMappingURL=constants.js.map