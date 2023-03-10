/**
 * @fileOverview random layout
 * @author shiwu.wyy@antfin.com
 */
import { Edge, OutNode, DagreLayoutOptions, PointTuple } from "./types";
import { Base } from "./base";
/**
 * 层次布局
 */
export declare class DagreLayout extends Base {
    /** layout 方向, 可选 TB, BT, LR, RL */
    rankdir: "TB" | "BT" | "LR" | "RL";
    /** 节点对齐方式，可选 UL, UR, DL, DR */
    align: undefined | "UL" | "UR" | "DL" | "DR";
    /** 布局的起始（左上角）位置 */
    begin: PointTuple;
    /** 节点大小 */
    nodeSize: number | number[] | undefined;
    /** 节点水平间距(px) */
    nodesepFunc: ((d?: any) => number) | undefined;
    /** 每一层节点之间间距 */
    ranksepFunc: ((d?: any) => number) | undefined;
    /** 节点水平间距(px) */
    nodesep: number;
    /** 每一层节点之间间距 */
    ranksep: number;
    /** 是否保留布局连线的控制点 */
    controlPoints: boolean;
    /** 每层节点是否根据节点数据中的 comboId 进行排序，以防止同层 combo 重叠 */
    sortByCombo: boolean;
    /** 是否保留每条边上的dummy node */
    edgeLabelSpace: boolean;
    /** 给定的节点顺序，配合keepNodeOrder使用 */
    nodeOrder: string[];
    /** 上次的布局结果 */
    preset: {
        nodes: OutNode[];
        edges: any[];
    };
    nodes: OutNode[];
    edges: Edge[];
    /** 迭代结束的回调函数 */
    onLayoutEnd: () => void;
    constructor(options?: DagreLayoutOptions);
    getDefaultCfg(): {
        rankdir: string;
        align: undefined;
        nodeSize: undefined;
        nodesepFunc: undefined;
        ranksepFunc: undefined;
        nodesep: number;
        ranksep: number;
        controlPoints: boolean;
    };
    layoutNode: (nodeId: string) => boolean;
    /**
     * 执行布局
     */
    execute(): {
        nodes: OutNode[];
        edges: any[];
    } | undefined;
    getType(): string;
}
