import { KeyValue } from '../../types';
import { Point } from '../../geometry';
import { Edge } from '../../model';
import { EdgeView, NodeView } from '../../view';
import { Registry } from '../registry';
import * as anchors from './main';
export declare namespace NodeAnchor {
    type Definition<T> = (this: EdgeView, 
    /**
     * The NodeView to which we are connecting.
     */
    nodeView: NodeView, 
    /**
     * The SVGElement in our graph that contains the magnet
     * (element/subelement/port) to which we are connecting.
     */
    magnet: SVGElement, 
    /**
     * A reference to another component of the edge path that may be
     * necessary to find this anchor point. If we are calling this method
     * for a source anchor, it is the first vertex, or if there are no
     * vertices the target anchor. If we are calling this method for a target
     * anchor, it is the last vertex, or if there are no vertices the source
     * anchor...
     */
    ref: Point | Point.PointLike | SVGElement, args: T, type: Edge.TerminalType) => Point;
    type CommonDefinition = Definition<KeyValue>;
    type ResolvedDefinition<T> = (this: EdgeView, view: NodeView, magnet: SVGElement, refPoint: Point, args: T) => Point;
}
export declare namespace NodeAnchor {
    type Presets = typeof NodeAnchor['presets'];
    type OptionsMap = {
        readonly [K in keyof Presets]-?: Parameters<Presets[K]>[3];
    };
    type NativeNames = keyof Presets;
    interface NativeItem<T extends NativeNames = NativeNames> {
        name: T;
        args?: OptionsMap[T];
    }
    interface ManaualItem {
        name: Exclude<string, NativeNames>;
        args?: KeyValue;
    }
}
export declare namespace NodeAnchor {
    const presets: typeof anchors;
    const registry: Registry<CommonDefinition, typeof anchors, never>;
}
