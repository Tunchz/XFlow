import React from 'react';
import { Item } from './position';
const Size = props => {
    const { width, height, label = 'size', onChange } = props;
    return (React.createElement("div", { className: "group" },
        React.createElement("label", null, label),
        React.createElement("div", { className: "split" },
            React.createElement(Item, { addonBefore: "W", value: width, onChangeItem: (value) => {
                    onChange === null || onChange === void 0 ? void 0 : onChange('width', value);
                } }),
            React.createElement(Item, { addonBefore: "H", value: height, onChangeItem: (value) => {
                    onChange === null || onChange === void 0 ? void 0 : onChange('height', value);
                } }))));
};
export default Size;
//# sourceMappingURL=size.js.map