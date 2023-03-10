import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _typeof from "@babel/runtime/helpers/typeof";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { gl, isSafari } from '@tunchz/xflow/g-webgpu-core';
import * as WebGPUConstants from '@webgpu/types/dist/constants';
import { extractUniforms } from '../utils/uniform';
import { getColorStateDescriptors, getCullMode, getDepthStencilStateDescriptor, primitiveMap } from './constants';
import WebGPUBuffer from './WebGPUBuffer';

// @ts-ignore
function concatenate(resultConstructor) {
  var totalLength = 0;

  for (var _len = arguments.length, arrays = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    arrays[_key - 1] = arguments[_key];
  }

  for (var _i = 0, _arrays = arrays; _i < _arrays.length; _i++) {
    var arr = _arrays[_i];
    totalLength += arr.length;
  }

  var result = new resultConstructor(totalLength);
  var offset = 0;

  for (var _i2 = 0, _arrays2 = arrays; _i2 < _arrays2.length; _i2++) {
    var _arr = _arrays2[_i2];
    result.set(_arr, offset);
    offset += _arr.length;
  }

  return result;
}

var WebGPUModel = /*#__PURE__*/function () {
  /**
   * ?????????????????????????????????
   */

  /**
   * vertex
   */

  /**
   * indices's buffer
   */
  function WebGPUModel(engine, options) {
    _classCallCheck(this, WebGPUModel);

    this.engine = engine;
    this.options = options;
    this.pipelineLayout = void 0;
    this.renderPipeline = void 0;
    this.uniformsBindGroupLayout = void 0;
    this.uniformBindGroup = void 0;
    this.uniformBuffer = void 0;
    this.uniforms = {};
    this.uniformGPUBufferLayout = [];
    this.attributeCache = {};
    this.indexBuffer = void 0;
    this.indexCount = void 0;
  }

  _createClass(WebGPUModel, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var _this$options, vs, fs, attributes, uniforms, primitive, count, elements, depth, blend, stencil, cull, instances, _yield$this$compilePi, vertexStage, fragmentStage, vertexState, descriptor;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$options = this.options, vs = _this$options.vs, fs = _this$options.fs, attributes = _this$options.attributes, uniforms = _this$options.uniforms, primitive = _this$options.primitive, count = _this$options.count, elements = _this$options.elements, depth = _this$options.depth, blend = _this$options.blend, stencil = _this$options.stencil, cull = _this$options.cull, instances = _this$options.instances; // build shaders first

                _context.next = 3;
                return this.compilePipelineStageDescriptor(vs, fs, null);

              case 3:
                _yield$this$compilePi = _context.sent;
                vertexStage = _yield$this$compilePi.vertexStage;
                fragmentStage = _yield$this$compilePi.fragmentStage;

                if (uniforms) {
                  // create uniform bind groups & layout
                  this.buildUniformBindGroup(uniforms);
                }

                if (elements) {
                  this.indexBuffer = elements.get();
                  this.indexCount = elements.indexCount;
                } // TODO: instanced array


                vertexState = {
                  vertexBuffers: Object.keys(attributes).map(function (attributeName, i) {
                    var attribute = attributes[attributeName];

                    var _attribute$get = attribute.get(),
                        arrayStride = _attribute$get.arrayStride,
                        stepMode = _attribute$get.stepMode,
                        ats = _attribute$get.attributes;

                    _this.attributeCache[attributeName] = attribute;
                    return {
                      arrayStride: arrayStride,
                      stepMode: stepMode,
                      attributes: ats
                    };
                  })
                };
                descriptor = {
                  sampleCount: this.engine.mainPassSampleCount,
                  primitiveTopology: primitiveMap[primitive || gl.TRIANGLES],
                  rasterizationState: _objectSpread(_objectSpread({}, this.getDefaultRasterizationStateDescriptor()), {}, {
                    // TODO: support frontface
                    cullMode: getCullMode({
                      cull: cull
                    })
                  }),
                  depthStencilState: getDepthStencilStateDescriptor({
                    depth: depth,
                    stencil: stencil
                  }),
                  colorStates: getColorStateDescriptors({
                    blend: blend
                  }, this.engine.options.swapChainFormat),
                  layout: this.pipelineLayout,
                  vertexStage: vertexStage,
                  fragmentStage: fragmentStage,
                  vertexState: vertexState
                }; // create pipeline

                this.renderPipeline = this.engine.device.createRenderPipeline(descriptor);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "addUniforms",
    value: function addUniforms(uniforms) {
      this.uniforms = _objectSpread(_objectSpread({}, this.uniforms), extractUniforms(uniforms));
    }
  }, {
    key: "draw",
    value: function draw(options) {
      var _this2 = this;

      var renderPass = this.engine.getCurrentRenderPass();

      var uniforms = _objectSpread(_objectSpread({}, this.uniforms), extractUniforms(options.uniforms || {}));

      var bindGroupBindings = []; // TODO: uniform ????????????

      Object.keys(uniforms).forEach(function (uniformName) {
        var type = _typeof(uniforms[uniformName]);

        if (type === 'boolean' || type === 'number' || Array.isArray(uniforms[uniformName]) || // @ts-ignore
        uniforms[uniformName].BYTES_PER_ELEMENT) {
          var _this2$uniformGPUBuff;

          var offset = (_this2$uniformGPUBuff = _this2.uniformGPUBufferLayout.find(function (_ref) {
            var name = _ref.name;
            return name === uniformName;
          })) === null || _this2$uniformGPUBuff === void 0 ? void 0 : _this2$uniformGPUBuff.offset;

          if (offset !== null) {
            _this2.uniformBuffer.subData({
              // @ts-ignore
              data: uniforms[uniformName],
              // @ts-ignore
              offset: offset
            });
          }
        } else {
          var _this2$uniformGPUBuff2;

          var _offset = (_this2$uniformGPUBuff2 = _this2.uniformGPUBufferLayout.find(function (_ref2) {
            var name = _ref2.name;
            return name === uniformName;
          })) === null || _this2$uniformGPUBuff2 === void 0 ? void 0 : _this2$uniformGPUBuff2.offset;

          if (_offset !== null) {
            var textureOrFramebuffer = uniforms[uniformName].get();

            var _ref3 = // @ts-ignore
            textureOrFramebuffer.color || textureOrFramebuffer,
                texture = _ref3.texture,
                sampler = _ref3.sampler;

            if (sampler) {
              bindGroupBindings.push({
                // @ts-ignore
                binding: _offset,
                resource: sampler
              }); // @ts-ignore

              _offset++;
            }

            bindGroupBindings.push({
              // @ts-ignore
              binding: _offset,
              resource: texture.createView()
            });
          }
        }
      });

      if (this.uniformBuffer) {
        bindGroupBindings[0] = {
          binding: 0,
          resource: {
            buffer: this.uniformBuffer.get() // ?????? GPUBuffer ????????????

          }
        };
      }

      this.uniformBindGroup = this.engine.device.createBindGroup({
        layout: this.uniformsBindGroupLayout,
        entries: bindGroupBindings
      });

      if (this.renderPipeline) {
        renderPass.setPipeline(this.renderPipeline);
      }

      renderPass.setBindGroup(0, this.uniformBindGroup);

      if (this.indexBuffer) {
        renderPass.setIndexBuffer(this.indexBuffer.get(), WebGPUConstants.IndexFormat.Uint32, 0);
      }

      Object.keys(this.attributeCache).forEach(function (attributeName, i) {
        renderPass.setVertexBuffer(0 + i, _this2.attributeCache[attributeName].get().buffer, 0);
      }); // renderPass.draw(verticesCount, instancesCount, verticesStart, 0);

      if (this.indexBuffer) {
        renderPass.drawIndexed(this.indexCount, this.options.instances || 1, 0, 0, 0);
      } else {
        renderPass.draw(this.options.count || 0, this.options.instances || 0, 0, 0);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      throw new Error('Method not implemented.');
    }
  }, {
    key: "compilePipelineStageDescriptor",
    value: function () {
      var _compilePipelineStageDescriptor = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(vertexCode, fragmentCode, defines) {
        var shaderVersion, vertexShader, fragmentShader;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                shaderVersion = '#version 450\n';
                vertexShader = vertexCode;
                fragmentShader = fragmentCode;

                if (this.engine.options.useWGSL) {
                  _context2.next = 10;
                  break;
                }

                _context2.next = 6;
                return this.compileShaderToSpirV(vertexCode, 'vertex', shaderVersion);

              case 6:
                vertexShader = _context2.sent;
                _context2.next = 9;
                return this.compileShaderToSpirV(fragmentCode, 'fragment', shaderVersion);

              case 9:
                fragmentShader = _context2.sent;

              case 10:
                return _context2.abrupt("return", this.createPipelineStageDescriptor(vertexShader, fragmentShader));

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function compilePipelineStageDescriptor(_x, _x2, _x3) {
        return _compilePipelineStageDescriptor.apply(this, arguments);
      }

      return compilePipelineStageDescriptor;
    }()
  }, {
    key: "compileShaderToSpirV",
    value: function compileShaderToSpirV(source, type, shaderVersion) {
      return this.compileRawShaderToSpirV(shaderVersion + source, type);
    }
  }, {
    key: "compileRawShaderToSpirV",
    value: function compileRawShaderToSpirV(source, type) {
      return this.engine.glslang.compileGLSL(source, type);
    }
  }, {
    key: "createPipelineStageDescriptor",
    value: function createPipelineStageDescriptor(vertexShader, fragmentShader) {
      return {
        vertexStage: {
          module: this.engine.device.createShaderModule({
            code: vertexShader,
            // @ts-ignore
            isWHLSL: isSafari
          }),
          entryPoint: 'main'
        },
        fragmentStage: {
          module: this.engine.device.createShaderModule({
            code: fragmentShader,
            // @ts-ignore
            isWHLSL: isSafari
          }),
          entryPoint: 'main'
        }
      };
    }
    /**
     * @see https://gpuweb.github.io/gpuweb/#rasterization-state
     */

  }, {
    key: "getDefaultRasterizationStateDescriptor",
    value: function getDefaultRasterizationStateDescriptor() {
      return {
        frontFace: WebGPUConstants.FrontFace.CCW,
        cullMode: WebGPUConstants.CullMode.None,
        depthBias: 0,
        depthBiasSlopeScale: 0,
        depthBiasClamp: 0
      };
    }
  }, {
    key: "buildUniformBindGroup",
    value: function buildUniformBindGroup(uniforms) {
      var _this3 = this;

      var offset = 0; // FIXME: ?????? uniform ??????????????? buffer??????????????? Float32Array ?????????????????????????????????????????????

      var mergedUniformData = concatenate.apply(void 0, [Float32Array].concat(_toConsumableArray(Object.keys(uniforms).map(function (uniformName) {
        if (uniforms[uniformName]) {
          _this3.uniformGPUBufferLayout.push({
            name: uniformName,
            offset: offset
          }); // @ts-ignore


          offset += (uniforms[uniformName].length || 1) * 4;
          return uniforms[uniformName];
        } else {
          // texture & framebuffer
          return [];
        }
      }))));
      var entries = [];
      var hasUniform = false;

      if (mergedUniformData.length) {
        hasUniform = true; // TODO: ?????? uniform ????????? slot 0??????????????? Shader ?????????????????????

        entries.push({
          // TODO: ?????????????????? slot 0
          binding: 0,
          visibility: WebGPUConstants.ShaderStage.Fragment | WebGPUConstants.ShaderStage.Vertex,
          // TODO: ?????? VS ??? FS ?????????
          type: WebGPUConstants.BindingType.UniformBuffer
        });
      } // ?????? texture & sampler


      Object.keys(uniforms).filter(function (uniformName) {
        return uniforms[uniformName] === null;
      }).forEach(function (uniformName, i) {
        _this3.uniformGPUBufferLayout.push({
          name: uniformName,
          offset: i * 2 + (hasUniform ? 1 : 0)
        });

        entries.push({
          // Sampler
          binding: i * 2 + (hasUniform ? 1 : 0),
          visibility: WebGPUConstants.ShaderStage.Fragment,
          type: WebGPUConstants.BindingType.Sampler
        }, {
          // Texture view
          binding: i * 2 + (hasUniform ? 1 : 0) + 1,
          visibility: WebGPUConstants.ShaderStage.Fragment,
          type: WebGPUConstants.BindingType.SampledTexture
        });
      });
      this.uniformsBindGroupLayout = this.engine.device.createBindGroupLayout({
        // ?????? API 0.0.22 ???????????? entries???Chrome Canary 84.0.4110.0 ????????????
        // ?????? bindings ?????? Warning: GPUBindGroupLayoutDescriptor.bindings is deprecated: renamed to entries
        // @see https://github.com/antvis/GWebGPUEngine/issues/5
        entries: entries
      });
      this.pipelineLayout = this.engine.device.createPipelineLayout({
        bindGroupLayouts: [this.uniformsBindGroupLayout]
      });

      if (hasUniform) {
        this.uniformBuffer = new WebGPUBuffer(this.engine, {
          // TODO: ?????? Struct ??? boolean
          // @ts-ignore
          data: mergedUniformData instanceof Array ? // @ts-ignore
          new Float32Array(mergedUniformData) : mergedUniformData,
          usage: WebGPUConstants.BufferUsage.Uniform | WebGPUConstants.BufferUsage.CopyDst
        });
      }
    }
  }]);

  return WebGPUModel;
}();

export { WebGPUModel as default };
//# sourceMappingURL=WebGPUModel.js.map