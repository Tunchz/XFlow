import React from 'react';
import { Input } from 'antd';
import { usePanelContext } from '../base-panel/context';
export const NodePanelHeader = props => {
    const { prefixClz, onKeywordChange } = props;
    const { propsProxy } = usePanelContext();
    const panelProps = propsProxy.getValue();
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: `${prefixClz}-header`, style: Object.assign({ zIndex: 1 }, props.style) },
            panelProps.header && React.isValidElement(panelProps.header) && panelProps.header,
            React.createElement("div", { className: `${prefixClz}-header-search` },
                React.createElement(Input, { placeholder: "search node", allowClear: true, onChange: e => onKeywordChange(e.target.value), style: { width: '100%', border: 0 } })))));
};
//# sourceMappingURL=panel-header.js.map