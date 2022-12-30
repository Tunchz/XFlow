import { __awaiter } from "tslib";
export const defaultFormSchemaService = (args) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { targetType } = args;
    const isGroup = (_a = args.targetData) === null || _a === void 0 ? void 0 : _a.isGroup;
    const groupSchema = {
        tabs: [
            {
                name: 'Setup',
                groups: [
                    {
                        name: 'groupName',
                        controls: [
                            {
                                label: 'Group',
                                name: 'group-service',
                                shape: 'group-service',
                                placeholder: 'Group Name',
                            },
                        ],
                    },
                ],
            },
        ],
    };
    const nodeSchema = {
        tabs: [
            {
                name: 'Setup',
                groups: [
                    {
                        name: 'groupName',
                        controls: [
                            {
                                label: 'Node',
                                name: 'node-service',
                                shape: 'node-service',
                                placeholder: 'Node Name',
                            },
                        ],
                    },
                ],
            },
        ],
    };
    const edgeSchema = {
        tabs: [
            {
                name: 'Setup',
                groups: [
                    {
                        name: 'groupName',
                        controls: [
                            {
                                label: 'Edge',
                                name: 'edge-service',
                                shape: 'edge-service',
                                placeholder: 'Edge Name',
                            },
                        ],
                    },
                ],
            },
        ],
    };
    if (isGroup) {
        return groupSchema;
    }
    if (targetType === 'node') {
        return nodeSchema;
    }
    if (targetType === 'edge') {
        return edgeSchema;
    }
    return {
        tabs: [
            {
                name: 'Setup',
                groups: [
                    {
                        name: 'groupName',
                        controls: [
                            {
                                label: '',
                                name: 'canvas-service',
                                shape: 'canvas-service',
                            },
                        ],
                    },
                ],
            },
        ],
    };
});
//# sourceMappingURL=index.js.map