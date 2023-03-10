import React from 'react';
import { Select } from 'antd';
import { FormItemHeight } from '../constants';
const SelectField = props => {
    const { label = 'Select', value, onChange, options = [], width } = props;
    return (React.createElement("div", { className: "group" },
        React.createElement("label", null, label),
        React.createElement(Select, { size: "small", value: value, style: {
                width,
                height: FormItemHeight,
            }, getPopupContainer: trigger => trigger.parentNode, optionFilterProp: "children", onChange: (v) => {
                onChange === null || onChange === void 0 ? void 0 : onChange(v);
            }, filterOption: (input, option) => {
                const { label: text = '' } = option;
                if (typeof text === 'string') {
                    return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                }
                return text.toString().indexOf(input.toLowerCase()) >= 0;
            }, options: options })));
};
export default SelectField;
//# sourceMappingURL=select.js.map