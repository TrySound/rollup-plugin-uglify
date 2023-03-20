"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = void 0;
const uglify_js_1 = require("uglify-js");
const transform = async (code, optionsString) => {
    const options = eval(`(${optionsString})`);
    const result = (0, uglify_js_1.minify)(code, options);
    if (result.error) {
        throw result.error;
    }
    else {
        return result;
    }
};
exports.transform = transform;
//# sourceMappingURL=transform.js.map