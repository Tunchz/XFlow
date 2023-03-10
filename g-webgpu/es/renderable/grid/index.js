import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { gl, IDENTIFIER } from '@tunchz/xflow/g-webgpu-core';
import { inject, injectable, named } from 'inversify';
import { Renderable } from '../Renderable';

/* babel-plugin-inline-import './shaders/webgl.grid.frag.glsl' */
var gridFrag = "// generate grid, borrow from clay.gl viewer\n// @see https://github.com/pissang/clay-viewer/blob/master/src/graphic/ground.glsl\n#extension GL_OES_standard_derivatives : enable\n\nvarying vec3 v_Position;\n// varying vec3 v_Normal;\n\nuniform float u_GridSize : 5;\nuniform float u_GridSize2 : .5;\nuniform vec4 u_GridColor : [0, 0, 0, 1];\nuniform vec4 u_GridColor2 : [0.3, 0.3, 0.3, 1];\nuniform bool u_GridEnabled : true;\n\n// uniform vec3 u_LightDirection;\n// uniform vec3 u_LightColor;\n// uniform vec3 u_Camera;\n\nvoid main() {\n  // vec3 n = v_Normal;\n  // vec3 l = normalize(u_LightDirection);\n  // float NdotL = clamp(dot(n, l), 0.001, 1.0);\n\n  gl_FragColor = vec4(1.);\n\n  if (u_GridEnabled) {\n    float wx = v_Position.x;\n    float wz = v_Position.z;\n    // float x0 = abs(fract(wx / u_GridSize - 0.5) - 0.5) / fwidth(wx) * u_GridSize / 2.0;\n    // float z0 = abs(fract(wz / u_GridSize - 0.5) - 0.5) / fwidth(wz) * u_GridSize / 2.0;\n\n    float x1 = abs(fract(wx / u_GridSize2 - 0.5) - 0.5) / fwidth(wx) * u_GridSize2;\n    float z1 = abs(fract(wz / u_GridSize2 - 0.5) - 0.5) / fwidth(wz) * u_GridSize2;\n\n    // float v0 = 1.0 - clamp(min(x0, z0), 0.0, 1.0);\n    float v1 = 1.0 - clamp(min(x1, z1), 0.0, 1.0);\n    // if (v0 > 0.1) {\n        // gl_FragColor = mix(gl_FragColor, u_GridColor, v0);\n    // }\n    // else {\n        gl_FragColor = mix(gl_FragColor, u_GridColor2, v1);\n    // }\n  }\n\n  // float shadowFactor = calcShadow(u_ShadowMap, v_PositionFromLight, l, n);\n  // vec3 diffuseColor = u_LightColor * NdotL * shadowFactor;\n\n  // gl_FragColor.rgb *= diffuseColor;\n}";

/* babel-plugin-inline-import './shaders/webgl.grid.vert.glsl' */
var gridVert = "attribute vec3 a_Position;\n\nvarying vec3 v_Position;\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\n\nvoid main() {\n  v_Position = a_Position;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(a_Position, 1.);\n}";
export var Grid = (_dec = injectable(), _dec2 = inject(IDENTIFIER.Systems), _dec3 = named(IDENTIFIER.MaterialSystem), _dec4 = inject(IDENTIFIER.Systems), _dec5 = named(IDENTIFIER.GeometrySystem), _dec6 = inject(IDENTIFIER.ShaderModuleService), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Renderable) {
  _inherits(Grid, _Renderable);

  var _super = _createSuper(Grid);

  function Grid() {
    var _this;

    _classCallCheck(this, Grid);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _initializerDefineProperty(_this, "materialSystem", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "geometrySystem", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "shaderModuleService", _descriptor3, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(Grid, [{
    key: "onAttributeChanged",
    value: function onAttributeChanged(_ref) {
      var name = _ref.name,
          data = _ref.data;
      var mesh = this.getMeshComponent();

      if (mesh && mesh.material) {
        if (name === 'gridColor') {
          mesh.material.setUniform('u_GridColor', data);
          mesh.material.setUniform('u_GridColor2', data);
        } else if (name === 'gridSize') {
          mesh.material.setUniform('u_GridSize', data);
          mesh.material.setUniform('u_GridSize2', data);
        }
      }
    }
  }, {
    key: "onEntityCreated",
    value: function onEntityCreated() {
      this.shaderModuleService.registerModule('grid', {
        vs: gridVert,
        fs: gridFrag
      });

      var _this$shaderModuleSer = this.shaderModuleService.getModule('grid'),
          vs = _this$shaderModuleSer.vs,
          fs = _this$shaderModuleSer.fs,
          extractedUniforms = _this$shaderModuleSer.uniforms;

      var material = this.materialSystem.createShaderMaterial({
        vertexShader: vs,
        fragmentShader: fs
      });
      this.setMaterial(material);
      var geometry = this.geometrySystem.createBufferGeometry({
        vertexCount: 4
      });
      this.setGeometry(geometry);
      material.setCull({
        enable: false,
        face: gl.BACK
      }).setDepth({
        enable: true,
        func: gl.LESS
      }); // @ts-ignore

      material.setUniform(extractedUniforms);
      this.setAttributes({
        gridColor: this.config.gridColor,
        gridSize: this.config.gridSize
      });
      geometry.setIndex([0, 3, 2, 2, 1, 0]);
      geometry.setAttribute('a_Position', Float32Array.from([-4, -1, -4, 4, -1, -4, 4, -1, 4, -4, -1, 4]), {
        arrayStride: 4 * 2,
        stepMode: 'vertex',
        attributes: [{
          shaderLocation: 0,
          offset: 0,
          format: 'float2'
        }]
      });
    }
  }]);

  return Grid;
}(Renderable), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "materialSystem", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "geometrySystem", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "shaderModuleService", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
//# sourceMappingURL=index.js.map