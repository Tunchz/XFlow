import React from 'react';
import { Input } from 'antd';
import { usePanelContext } from '../base-panel/context';
export const NodePanelHeader = props => {
    const { prefixClz, onKeywordChange, state } = props;
    const { propsProxy } = usePanelContext();
    const panelProps = propsProxy.getValue();
    const onChange = (e) => {
        const panelNodes = state.collapseData.reduce((acc, item) => {
            if (item.children) {
                acc.push(...item.children);
            }
            return acc;
        }, []);
        onKeywordChange(e.target.value, panelNodes);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: `${prefixClz}-header`, style: props.style },
            panelProps.header && React.isValidElement(panelProps.header) && panelProps.header,
            panelProps.searchService && (React.createElement("div", { className: `${prefixClz}-header-search` },
                React.createElement(Input, { placeholder: "search component", allowClear: true, onChange: e => onChange(e), style: { width: '100%', border: 0 } }))))));
};
//# sourceMappingURL=panel-header.js.map