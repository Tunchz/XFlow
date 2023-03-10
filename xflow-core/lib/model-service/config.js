"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelServiceConfig = exports.NsModelServiceConfig = void 0;
var tslib_1 = require("tslib");
var deferred_1 = require("../common/deferred");
var disposable_1 = require("../common/disposable");
var NsModelServiceConfig;
(function (NsModelServiceConfig) {
    NsModelServiceConfig.CONFIG_TYPE = 'MODEL_SERVICE_CONFIG';
})(NsModelServiceConfig = exports.NsModelServiceConfig || (exports.NsModelServiceConfig = {}));
var disposableNoop = function () { return disposable_1.Disposable.create(function () { }); };
var ModelServiceConfig = /** @class */ (function () {
    function ModelServiceConfig() {
        var _this = this;
        /** CONFIG_TYPE */
        this.CONFIG_TYPE = NsModelServiceConfig.CONFIG_TYPE;
        /** 外部注册context的方法 */
        this.registerModelFn = disposableNoop;
        /** CONFIG_TYPE */
        this.isMounted = new deferred_1.Deferred();
        this.registerModel = function (registerModel) {
            _this.registerModelFn = registerModel;
        };
        this.setMountState = function () {
            _this.isMounted.resolve(true);
        };
        this.getConfig = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isMounted.promise];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                CONFIG_TYPE: this.CONFIG_TYPE,
                                modelRegisterFunc: this.registerModelFn || disposableNoop,
                            }];
                }
            });
        }); };
        this.dispose = function () {
            _this.registerModelFn = disposableNoop;
            _this.isMounted = new deferred_1.Deferred();
        };
    }
    return ModelServiceConfig;
}());
exports.ModelServiceConfig = ModelServiceConfig;
//# sourceMappingURL=config.js.map