import { Graph, FunctionExt } from '@tunchz/xflow/x6'
import { registry, Definition } from './registry'
import { ReactShape } from './node'

declare module '@tunchz/xflow/x6/lib/graph/hook' {
  namespace Hook {
    interface IHook {
      getReactComponent(this: Graph, node: ReactShape): Definition
    }
  }

  interface Hook {
    getReactComponent(node: ReactShape): Definition
  }
}

Graph.Hook.prototype.getReactComponent = function (node: ReactShape) {
  const getReactComponent = this.options.getReactComponent
  if (typeof getReactComponent === 'function') {
    const ret = FunctionExt.call(getReactComponent, this.graph, node)
    if (ret != null) {
      return ret
    }
  }

  let ret = node.getComponent()
  if (typeof ret === 'string') {
    const component = registry.get(ret)
    if (component == null) {
      return registry.onNotFound(ret)
    }
    ret = component
  }

  return ret as Definition
}
