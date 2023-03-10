import { __awaiter, __decorate, __metadata } from "tslib";
import { inject, injectable } from 'mana-syringe';
import { ICommandHandler, ICommandContextProvider } from '../../command/interface';
import { XFlowGraphCommands } from '../constant';
export var NsGraphDelTool;
(function (NsGraphDelTool) {
    /** Command: 用于注册named factory */
    NsGraphDelTool.command = XFlowGraphCommands.GRAPH_DEL_TOOL;
    /** hookName */
    NsGraphDelTool.hookKey = 'delTool';
})(NsGraphDelTool || (NsGraphDelTool = {}));
let GraphDelToolCommand = class GraphDelToolCommand {
    constructor() {
        /** 执行Cmd */
        this.execute = () => __awaiter(this, void 0, void 0, function* () {
            const ctx = this.contextProvider();
            const { args, hooks: runtimeHook } = ctx.getArgs();
            const hooks = ctx.getHooks();
            const result = yield hooks.delTool.call(args, (handlerArgs) => __awaiter(this, void 0, void 0, function* () {
                const { cellId, toolName, toolConfig } = handlerArgs;
                const graph = yield ctx.getX6Graph();
                const cell = graph.getCellById(cellId);
                if (cell) {
                    if (toolName === '*') {
                        cell.removeTools(toolConfig);
                    }
                    else {
                        cell.removeTool(toolName, toolConfig);
                    }
                }
                return { err: null };
            }), runtimeHook);
            ctx.setResult(result);
            return this;
        });
        /** undo cmd */
        this.undo = () => __awaiter(this, void 0, void 0, function* () {
            const ctx = this.contextProvider();
            if (this.isUndoable()) {
                ctx.undo();
            }
            return this;
        });
        /** redo cmd */
        this.redo = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.isUndoable()) {
                yield this.execute();
            }
            return this;
        });
    }
    isUndoable() {
        const ctx = this.contextProvider();
        return ctx.isUndoable();
    }
};
__decorate([
    inject(ICommandContextProvider),
    __metadata("design:type", Object)
], GraphDelToolCommand.prototype, "contextProvider", void 0);
GraphDelToolCommand = __decorate([
    injectable({
        token: { token: ICommandHandler, named: NsGraphDelTool.command.id },
    })
    /** 创建节点命令 */
], GraphDelToolCommand);
export { GraphDelToolCommand };
//# sourceMappingURL=graph-del-tool.js.map