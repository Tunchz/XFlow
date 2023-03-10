import { __awaiter } from "tslib";
import { IconStore, MODELS, XFlowGraphCommands } from '@tunchz/xflow/xflow-core';
import { ZoomInOutlined, ZoomOutOutlined, OneToOneOutlined, CompressOutlined, FullscreenOutlined, FullscreenExitOutlined, } from '@ant-design/icons';
import { createToolbarConfig } from '../canvas-toolbar';
export var CANVAS_SCALE_TOOLBAR_CONFIG;
(function (CANVAS_SCALE_TOOLBAR_CONFIG) {
    IconStore.set('ZoomInOutlined', ZoomInOutlined);
    IconStore.set('ZoomOutOutlined', ZoomOutOutlined);
    IconStore.set('OneToOneOutlined', OneToOneOutlined);
    IconStore.set('CompressOutlined', CompressOutlined);
    IconStore.set('FullscreenOutlined', FullscreenOutlined);
    IconStore.set('FullscreenExitOutlined', FullscreenExitOutlined);
    CANVAS_SCALE_TOOLBAR_CONFIG.ZOOM_IN = XFlowGraphCommands.GRAPH_ZOOM.id + '-zoom-in';
    CANVAS_SCALE_TOOLBAR_CONFIG.ZOOM_OUT = XFlowGraphCommands.GRAPH_ZOOM.id + '-zoom-out';
    CANVAS_SCALE_TOOLBAR_CONFIG.SCALE_TO_ONE = XFlowGraphCommands.GRAPH_ZOOM.id + '-scale-to-one';
    CANVAS_SCALE_TOOLBAR_CONFIG.SCALE_TO_FIT = XFlowGraphCommands.GRAPH_ZOOM.id + '-scale-to-fit';
    CANVAS_SCALE_TOOLBAR_CONFIG.FULLSCREEN = XFlowGraphCommands.GRAPH_ZOOM.id + '-fullscreen';
    CANVAS_SCALE_TOOLBAR_CONFIG.MAX_SCALE = 1.5;
    CANVAS_SCALE_TOOLBAR_CONFIG.MIN_SCALE = 0.05;
    CANVAS_SCALE_TOOLBAR_CONFIG.zoomOptions = {
        maxScale: CANVAS_SCALE_TOOLBAR_CONFIG.MAX_SCALE,
        minScale: CANVAS_SCALE_TOOLBAR_CONFIG.MIN_SCALE,
    };
    CANVAS_SCALE_TOOLBAR_CONFIG.getToolbarConfig = ({ zoomFactor, fullscreen, }) => {
        return [
            {
                name: 'main',
                items: [
                    {
                        id: CANVAS_SCALE_TOOLBAR_CONFIG.ZOOM_IN,
                        tooltip: 'zoom in',
                        iconName: 'ZoomInOutlined',
                        onClick: ({ commandService }) => {
                            commandService.executeCommand(XFlowGraphCommands.GRAPH_ZOOM.id, {
                                factor: 0.1,
                                zoomOptions: CANVAS_SCALE_TOOLBAR_CONFIG.zoomOptions,
                            });
                        },
                    },
                    {
                        id: CANVAS_SCALE_TOOLBAR_CONFIG.ZOOM_OUT,
                        tooltip: 'zoom out',
                        iconName: 'ZoomOutOutlined',
                        onClick: ({ commandService }) => {
                            commandService.executeCommand(XFlowGraphCommands.GRAPH_ZOOM.id, {
                                factor: -0.1,
                                zoomOptions: CANVAS_SCALE_TOOLBAR_CONFIG.zoomOptions,
                            });
                        },
                    },
                    {
                        id: CANVAS_SCALE_TOOLBAR_CONFIG.SCALE_TO_ONE,
                        iconName: 'OneToOneOutlined',
                        tooltip: 'scale 1:1',
                        isEnabled: zoomFactor !== 1,
                        onClick: ({ commandService }) => {
                            commandService.executeCommand(XFlowGraphCommands.GRAPH_ZOOM.id, {
                                factor: 'real',
                                zoomOptions: CANVAS_SCALE_TOOLBAR_CONFIG.zoomOptions,
                            });
                        },
                    },
                    {
                        id: CANVAS_SCALE_TOOLBAR_CONFIG.SCALE_TO_FIT,
                        tooltip: 'scale to fit',
                        iconName: 'CompressOutlined',
                        onClick: ({ commandService }) => {
                            commandService.executeCommand(XFlowGraphCommands.GRAPH_ZOOM.id, {
                                factor: 'fit',
                                zoomOptions: CANVAS_SCALE_TOOLBAR_CONFIG.zoomOptions,
                            });
                        },
                    },
                    {
                        id: CANVAS_SCALE_TOOLBAR_CONFIG.FULLSCREEN,
                        tooltip: !fullscreen ? 'fullscreen' : 'exit fullscreen',
                        iconName: !fullscreen ? 'FullscreenOutlined' : 'FullscreenExitOutlined',
                        onClick: ({ commandService }) => {
                            commandService.executeCommand(XFlowGraphCommands.GRAPH_FULLSCREEN.id, {});
                        },
                    },
                ],
            },
        ];
    };
})(CANVAS_SCALE_TOOLBAR_CONFIG || (CANVAS_SCALE_TOOLBAR_CONFIG = {}));
export const TOOLBAR_TYPE = 'CANVAS_SCALE_TOOLBAR';
export const useConfig = createToolbarConfig(config => {
    config.setToolbarModelService((model, modelService) => __awaiter(void 0, void 0, void 0, function* () {
        const graphScale = yield MODELS.GRAPH_SCALE.useValue(modelService);
        /** ???????????????*/
        model.setValue(m => {
            m.mainGroups = CANVAS_SCALE_TOOLBAR_CONFIG.getToolbarConfig({
                zoomFactor: graphScale.zoomFactor,
                fullscreen: false,
            });
        });
        const graphFullscreenModel = yield MODELS.GRAPH_FULLSCREEN.getModel(modelService);
        /** ???????????????????????? */
        graphFullscreenModel.setValue(false);
        /** ?????? */
        graphFullscreenModel.watch(fullscreen => {
            model.setValue(m => {
                m.mainGroups = CANVAS_SCALE_TOOLBAR_CONFIG.getToolbarConfig({
                    zoomFactor: graphScale.zoomFactor,
                    fullscreen,
                });
            });
        });
        const graphScaleModel = yield MODELS.GRAPH_SCALE.getModel(modelService);
        /** graphScaleModel??????????????? Toolbar*/
        graphScaleModel.watch(({ zoomFactor }) => __awaiter(void 0, void 0, void 0, function* () {
            const fullscreen = yield MODELS.GRAPH_FULLSCREEN.useValue(modelService);
            model.setValue(m => {
                m.mainGroups = CANVAS_SCALE_TOOLBAR_CONFIG.getToolbarConfig({
                    zoomFactor,
                    fullscreen,
                });
            });
        }));
    }));
});
//# sourceMappingURL=config.js.map