export var DataUri;
(function (DataUri) {
    function isDataUrl(url) {
        const prefix = 'data:';
        return url.substr(0, prefix.length) === prefix;
    }
    DataUri.isDataUrl = isDataUrl;
    /**
     * Converts an image at `url` to base64-encoded data uri.
     * The mime type of the image is inferred from the `url` file extension.
     */
    function imageToDataUri(url, callback) {
        // No need to convert to data uri if it is already in data uri.
        if (!url || isDataUrl(url)) {
            // Keep the async nature of the function.
            setTimeout(() => callback(null, url));
            return;
        }
        const onError = () => {
            callback(new Error(`Failed to load image: ${url}`));
        };
        const onLoad = window.FileReader
            ? // chrome, IE10+
                (xhr) => {
                    if (xhr.status === 200) {
                        const reader = new FileReader();
                        reader.onload = (evt) => {
                            const dataUri = evt.target.result;
                            callback(null, dataUri);
                        };
                        reader.onerror = onError;
                        reader.readAsDataURL(xhr.response);
                    }
                    else {
                        onError();
                    }
                }
            : (xhr) => {
                const toString = (u8a) => {
                    const CHUNK_SZ = 0x8000;
                    const c = [];
                    for (let i = 0; i < u8a.length; i += CHUNK_SZ) {
                        c.push(String.fromCharCode.apply(null, u8a.subarray(i, i + CHUNK_SZ)));
                    }
                    return c.join('');
                };
                if (xhr.status === 200) {
                    let suffix = url.split('.').pop() || 'png';
                    if (suffix === 'svg') {
                        suffix = 'svg+xml';
                    }
                    const meta = `data:image/${suffix};base64,`;
                    const bytes = new Uint8Array(xhr.response);
                    const base64 = meta + btoa(toString(bytes));
                    callback(null, base64);
                }
                else {
                    onError();
                }
            };
        const xhr = new XMLHttpRequest();
        xhr.responseType = window.FileReader ? 'blob' : 'arraybuffer';
        xhr.open('GET', url, true);
        xhr.addEventListener('error', onError);
        xhr.addEventListener('load', () => onLoad(xhr));
        xhr.send();
    }
    DataUri.imageToDataUri = imageToDataUri;
    function dataUriToBlob(dataUrl) {
        let uri = dataUrl.replace(/\s/g, '');
        uri = decodeURIComponent(uri);
        const index = uri.indexOf(',');
        const dataType = uri.slice(0, index); // e.g. 'data:image/jpeg;base64'
        const mime = dataType.split(':')[1].split(';')[0]; // e.g. 'image/jpeg'
        const data = uri.slice(index + 1);
        let decodedString;
        if (dataType.indexOf('base64') >= 0) {
            // data may be encoded in base64
            decodedString = atob(data);
        }
        else {
            // convert the decoded string to UTF-8
            decodedString = unescape(encodeURIComponent(data));
        }
        // write the bytes of the string to a typed array
        const ia = new Uint8Array(decodedString.length);
        for (let i = 0; i < decodedString.length; i += 1) {
            ia[i] = decodedString.charCodeAt(i);
        }
        return new Blob([ia], { type: mime });
    }
    DataUri.dataUriToBlob = dataUriToBlob;
    function downloadBlob(blob, fileName) {
        const msSaveBlob = window.navigator.msSaveBlob;
        if (msSaveBlob) {
            // requires IE 10+
            // pulls up a save dialog
            msSaveBlob(blob, fileName);
        }
        else {
            // other browsers
            // downloads directly in Chrome and Safari
            // presents a save/open dialog in Firefox
            // Firefox bug: `from` field in save dialog always shows `from:blob:`
            // https://bugzilla.mozilla.org/show_bug.cgi?id=1053327
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            // mark the url for garbage collection
            window.URL.revokeObjectURL(url);
        }
    }
    DataUri.downloadBlob = downloadBlob;
    function downloadDataUri(dataUrl, fileName) {
        const blob = dataUriToBlob(dataUrl);
        downloadBlob(blob, fileName);
    }
    DataUri.downloadDataUri = downloadDataUri;
    function parseViewBox(svg) {
        const matches = svg.match(/<svg[^>]*viewBox\s*=\s*(["']?)(.+?)\1[^>]*>/i);
        if (matches && matches[2]) {
            return matches[2].replace(/\s+/, ' ').split(' ');
        }
        return null;
    }
    function getNumber(str) {
        const ret = parseFloat(str);
        return Number.isNaN(ret) ? null : ret;
    }
    function svgToDataUrl(svg, options = {}) {
        let viewBox = null;
        const getNumberFromViewBox = (index) => {
            if (viewBox == null) {
                viewBox = parseViewBox(svg);
            }
            if (viewBox != null) {
                return getNumber(viewBox[index]);
            }
            return null;
        };
        const getNumberFromMatches = (reg) => {
            const matches = svg.match(reg);
            if (matches && matches[2]) {
                return getNumber(matches[2]);
            }
            return null;
        };
        let w = options.width;
        if (w == null) {
            w = getNumberFromMatches(/<svg[^>]*width\s*=\s*(["']?)(.+?)\1[^>]*>/i);
        }
        if (w == null) {
            w = getNumberFromViewBox(2);
        }
        if (w == null) {
            throw new Error('Can not parse width from svg string');
        }
        let h = options.height;
        if (h == null) {
            h = getNumberFromMatches(/<svg[^>]*height\s*=\s*(["']?)(.+?)\1[^>]*>/i);
        }
        if (h == null) {
            h = getNumberFromViewBox(3);
        }
        if (h == null) {
            throw new Error('Can not parse height from svg string');
        }
        const decoded = encodeURIComponent(svg)
            .replace(/'/g, '%27')
            .replace(/"/g, '%22');
        const header = 'data:image/svg+xml';
        const dataUrl = `${header},${decoded}`;
        return dataUrl;
    }
    DataUri.svgToDataUrl = svgToDataUrl;
})(DataUri || (DataUri = {}));
//# sourceMappingURL=index.js.map