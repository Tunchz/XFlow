import { getString, getNumber } from './util';
export function highlight(args = {}) {
    const color = getString(args.color, 'red');
    const blur = getNumber(args.blur, 0);
    const width = getNumber(args.width, 1);
    const opacity = getNumber(args.opacity, 1);
    return `
      <filter>
        <feFlood flood-color="${color}" flood-opacity="${opacity}" result="colored"/>
        <feMorphology result="morphed" in="SourceGraphic" operator="dilate" radius="${width}"/>
        <feComposite result="composed" in="colored" in2="morphed" operator="in"/>
        <feGaussianBlur result="blured" in="composed" stdDeviation="${blur}"/>
        <feBlend in="SourceGraphic" in2="blured" mode="normal"/>
      </filter>
    `.trim();
}
//# sourceMappingURL=highlight.js.map