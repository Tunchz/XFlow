import JQuery from 'jquery';
import 'jquery-mousewheel';
import { Platform } from '../platform';
if (Platform.SUPPORT_PASSIVE) {
    JQuery.event.special.touchstart = {
        setup(data, ns, handle) {
            if (!this.addEventListener) {
                return false;
            }
            this.addEventListener('touchstart', handle, {
                passive: true,
            });
        },
    };
    const hook = JQuery.event.special.mousewheel;
    if (hook) {
        const setup = hook.setup;
        hook.setup = function () {
            const addEventListener = this.addEventListener;
            if (!addEventListener) {
                return false;
            }
            this.addEventListener = (name, handler) => {
                addEventListener.call(this, name, handler, { passive: true });
            };
            setup.call(this);
            this.addEventListener = addEventListener;
        };
    }
}
// compatible with NodeList.prototype.forEach() before chrome 51
// https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}
// compatible with ParentNode.append() before chrome 54
// https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/append()/append().md
;
(function (arr) {
    arr.forEach((item) => {
        if (Object.prototype.hasOwnProperty.call(item, 'append')) {
            return;
        }
        Object.defineProperty(item, 'append', {
            configurable: true,
            enumerable: true,
            writable: true,
            value(...args) {
                const docFrag = document.createDocumentFragment();
                args.forEach((arg) => {
                    const isNode = arg instanceof Node;
                    docFrag.appendChild(isNode ? arg : document.createTextNode(String(arg)));
                });
                this.appendChild(docFrag);
            },
        });
    });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);
//# sourceMappingURL=index.js.map