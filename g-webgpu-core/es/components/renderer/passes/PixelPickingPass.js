import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _temp;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { inject, injectable } from 'inversify';
import { IDENTIFIER } from '../../../identifier';
import { decodePickingColor } from '../../../utils/math';
import { RenderPass } from './RenderPass';
var PickingStage = {
  NONE: 0.0,
  ENCODE: 1.0,
  HIGHLIGHT: 2.0
};
/**
 * color-based picking
 * @see https://threejsfundamentals.org/threejs/lessons/threejs-picking.html
 */

export var PixelPickingPass = (_dec = injectable(), _dec2 = inject(IDENTIFIER.RenderEngine), _dec3 = inject(IDENTIFIER.ResourcePool), _dec4 = inject(IDENTIFIER.RenderPassFactory), _dec5 = inject(IDENTIFIER.MeshComponentManager), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function () {
  function PixelPickingPass() {
    var _this = this;

    _classCallCheck(this, PixelPickingPass);

    _initializerDefineProperty(this, "engine", _descriptor, this);

    _initializerDefineProperty(this, "resourcePool", _descriptor2, this);

    _initializerDefineProperty(this, "renderPassFactory", _descriptor3, this);

    _initializerDefineProperty(this, "mesh", _descriptor4, this);

    this.pickingFBO = void 0;
    this.views = void 0;
    this.highlightEnabled = true;
    this.highlightColor = [255, 0, 0, 255];
    this.alreadyInRendering = false;

    this.setup = function (fg, passNode, pass) {
      var output = fg.createRenderTarget(passNode, 'picking fbo', {
        width: 1,
        height: 1
      });
      pass.data = {
        output: passNode.write(fg, output)
      }; // ????????? FrameGraph ??????

      passNode.hasSideEffect = true;
    };

    this.execute = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(fg, pass, views) {
        var _iterator, _step, _loop;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.views = views;

                if (!_this.alreadyInRendering) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                _iterator = _createForOfIteratorHelper(views);

                try {
                  _loop = function _loop() {
                    var view = _step.value;

                    var _view$getViewport = view.getViewport(),
                        width = _view$getViewport.width,
                        height = _view$getViewport.height; // throttled


                    _this.alreadyInRendering = true; // ???????????????

                    var resourceNode = fg.getResourceNode(pass.data.output);
                    _this.pickingFBO = _this.resourcePool.getOrCreateResource(resourceNode.resource); // TODO: only draw 1x1 quad, with offset camera

                    _this.pickingFBO.resize({
                      width: width,
                      height: height
                    });

                    _this.engine.useFramebuffer(_this.pickingFBO, function () {
                      _this.engine.clear({
                        framebuffer: _this.pickingFBO,
                        color: [0, 0, 0, 0],
                        stencil: 0,
                        depth: 1
                      }); // ??????


                      var renderPass = _this.renderPassFactory(RenderPass.IDENTIFIER); // ????????????


                      var meshes = [];
                      var scene = view.getScene();

                      var _iterator2 = _createForOfIteratorHelper(scene.getEntities()),
                          _step2;

                      try {
                        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                          var meshEntity = _step2.value;

                          var mesh = _this.mesh.getComponentByEntity(meshEntity);

                          var material = mesh.material;
                          material.setUniform('u_PickingStage', PickingStage.ENCODE);
                          meshes.push(mesh);
                        } // @ts-ignore

                      } catch (err) {
                        _iterator2.e(err);
                      } finally {
                        _iterator2.f();
                      }

                      renderPass.renderView(view);
                      meshes.forEach(function (mesh) {
                        var material = mesh.material;
                        material.setUniform('u_PickingStage', PickingStage.HIGHLIGHT);
                      });
                      _this.alreadyInRendering = false;
                    });
                  };

                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    _loop();
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }();

    this.pick = function (_ref2, view) {
      var x = _ref2.x,
          y = _ref2.y;
      var _this$engine = _this.engine,
          readPixels = _this$engine.readPixels,
          useFramebuffer = _this$engine.useFramebuffer;

      var _view$getViewport2 = view.getViewport(),
          width = _view$getViewport2.width,
          height = _view$getViewport2.height;

      var xInDevicePixel = x * window.devicePixelRatio;
      var yInDevicePixel = y * window.devicePixelRatio; // const xInDevicePixel = x;
      // const yInDevicePixel = y;

      if (xInDevicePixel > width || xInDevicePixel < 0 || yInDevicePixel > height || yInDevicePixel < 0) {
        return;
      }

      var pickedColors;
      var pickedFeatureIdx;
      useFramebuffer(_this.pickingFBO, function () {
        // avoid realloc
        pickedColors = readPixels({
          x: Math.round(xInDevicePixel),
          // ???????????????????????????????????? WebGL ???????????????????????? Y ???
          y: Math.round(height - (y + 1) * window.devicePixelRatio),
          // y: Math.round(height - (y + 1)),
          width: 1,
          height: 1,
          data: new Uint8Array(1 * 1 * 4),
          framebuffer: _this.pickingFBO
        });

        if (pickedColors[0] !== 0 || pickedColors[1] !== 0 || pickedColors[2] !== 0) {
          pickedFeatureIdx = decodePickingColor(pickedColors);

          if (_this.highlightEnabled) {
            // ??????
            _this.highlightPickedFeature(pickedColors, view);
          }
        }
      });
      return pickedFeatureIdx;
    };
  }

  _createClass(PixelPickingPass, [{
    key: "enableHighlight",
    value: function enableHighlight(enabled) {
      this.highlightEnabled = enabled;
    }
  }, {
    key: "setHighlightColor",
    value: function setHighlightColor(color) {
      this.highlightColor = color;
    }
  }, {
    key: "highlightPickedFeature",

    /**
     * highlight ???????????????????????? feature ??? buffer????????????????????????
     * 1. ???????????????????????????
     * 2. ?????????????????????????????????????????? alpha ??????
     * ???????????????????????? shader ???????????????
     */
    value: function highlightPickedFeature(pickedColors, view) {
      if (pickedColors) {
        var _iterator3 = _createForOfIteratorHelper(view.getScene().getEntities()),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var meshEntity = _step3.value;
            var mesh = this.mesh.getComponentByEntity(meshEntity);
            var material = mesh.material;
            material.setUniform('u_PickingStage', PickingStage.HIGHLIGHT);
            material.setUniform('u_PickingColor', [pickedColors[0], pickedColors[1], pickedColors[2]]);
            material.setUniform('u_HighlightColor', this.highlightColor);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
    }
  }]);

  return PixelPickingPass;
}(), _class3.IDENTIFIER = 'PixelPicking Pass', _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "engine", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "resourcePool", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "renderPassFactory", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "mesh", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
//# sourceMappingURL=PixelPickingPass.js.map