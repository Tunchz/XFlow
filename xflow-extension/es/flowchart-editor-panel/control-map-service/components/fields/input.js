import React from 'react';
import { Input } from 'antd';
import { FormItemHeight } from '../constants';
const InputFiled = props => {
    const { label = 'label', value, onChange } = props;
    return (React.createElement("div", { className: "group" },
        React.createElement("label", null, label),
        React.createElement(Input, { value: value, style: {
                height: FormItemHeight,
            }, onChange: (e) => {
                onChange === null || onChange === void 0 ? void 0 : onChange(e.target.value);
            } })));
};
export default InputFiled;
//# sourceMappingURL=input.js.map