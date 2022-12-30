import React from 'react';
import { Graph } from '@tunchz/xflow/x6';
import { ReactShape } from './node';
import { Definition } from './registry';
export declare class Wrap extends React.PureComponent<Wrap.Props, Wrap.State> {
    static throttleChangeTypes: string[];
    private scheduledAnimationFrame;
    constructor(props: Wrap.Props);
    throttleUpdateFunc: () => void;
    onChange: (e: any) => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    clone(elem: React.ReactElement): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | ((this: Graph, node: import("@tunchz/xflow/x6").Node<import("@tunchz/xflow/x6").Node.Properties>) => React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined);
}
export declare namespace Wrap {
    interface State {
        tick: number;
    }
    interface Props {
        node: ReactShape;
        graph: Graph;
        component: Definition;
    }
}
