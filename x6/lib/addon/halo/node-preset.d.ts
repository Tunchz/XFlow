import { Cell } from '../../model/cell';
import { Node } from '../../model/node';
import { Edge } from '../../model/edge';
import { CellView } from '../../view/cell';
import { Handle } from '../common';
import { Halo } from './index';
export declare class NodePreset {
    private halo;
    private edgeView;
    private flip;
    constructor(halo: Halo);
    get options(): Halo.Options;
    get graph(): import("../..").Graph;
    get model(): import("../..").Model;
    get view(): CellView<Cell<Cell.Properties>, CellView.Options>;
    get cell(): Cell<Cell.Properties>;
    get node(): Node<Node.Properties>;
    getPresets(): Halo.Options;
    removeCell(): void;
    startLink({ x, y }: Handle.EventArgs): void;
    createEdgeConnectedToSource(): Edge<Edge.Properties>;
    getMagnet(view: CellView, terminal: Edge.TerminalType): SVGElement;
    getEdgeTerminal(view: CellView, magnet: Element): Edge.TerminalCellData;
    doLink({ e, x, y }: Handle.EventArgs): void;
    stopLink({ e, x, y }: Handle.EventArgs): void;
    makeLoopEdge(edge: Edge): void;
    startResize({ e }: Handle.EventArgs): void;
    doResize({ e, dx, dy }: Handle.EventArgs): void;
    stopResize({ e }: Handle.EventArgs): void;
    startClone({ e, x, y }: Handle.EventArgs): void;
    centerNodeAtCursor(cell: Cell, x: number, y: number): void;
    doClone({ e, x, y }: Handle.EventArgs): void;
    stopClone({ e, x, y }: Handle.EventArgs): void;
    startFork({ e, x, y }: Handle.EventArgs): void;
    doFork({ e, x, y }: Handle.EventArgs): void;
    stopFork({ e, x, y }: Handle.EventArgs): void;
    startRotate({ e, x, y }: Handle.EventArgs): void;
    doRotate({ e, x, y }: Handle.EventArgs): void;
    stopRotate({ e }: Handle.EventArgs): void;
    unlink(): void;
}
