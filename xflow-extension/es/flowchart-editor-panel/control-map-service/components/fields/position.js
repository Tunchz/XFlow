import React from 'react';
import { InputNumber } from 'antd';
import { FormItemHeight } from '../constants';
export const Item = ({ value, onChangeItem, addonBefore }) => (React.createElement("div", { className: "addon-before-group" },
    React.createElement(InputNumber, { value: value, style: { height: FormItemHeight, border: 'none' }, onChange: (v) => {
            onChangeItem(v);
        } }),
    React.createElement("span", null, addonBefore)));
const Position = props => {
    const { label = 'position', x, y, onChange } = props;
    return (React.createElement("div", { className: "group" },
        React.createElement("label", null, label),
        React.createElement("div", { className: "split" },
            React.createElement(Item, { addonBefore: "X", value: x, onChangeItem: (value) => {
                    onChange === null || onChange === void 0 ? void 0 : onChange('x', value);
                } }),
            React.createElement(Item, { addonBefore: "Y", value: y, onChangeItem: (value) => {
                    onChange === null || onChange === void 0 ? void 0 : onChange('y', value);
                } }))));
};
export default Position;
//# sourceMappingURL=position.js.map