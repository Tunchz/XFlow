import { Graph, Registry } from '@tunchz/xflow/x6';
export const registry = Registry.create({
    type: 'react componnet',
});
Graph.registerReactComponent = registry.register;
Graph.unregisterReactComponent = registry.unregister;
//# sourceMappingURL=registry.js.map