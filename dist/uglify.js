"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uglify = void 0;
const serialize_javascript_1 = __importDefault(require("serialize-javascript"));
const transform_1 = require("./transform");
const uglify = (userOptions = {}) => {
    const minifierOptions = (0, serialize_javascript_1.default)(userOptions);
    return {
        name: "uglify",
        renderChunk: async (code, chunk, options, meta) => {
            return (0, transform_1.transform)(code, minifierOptions);
        },
    };
};
exports.uglify = uglify;
//# sourceMappingURL=uglify.js.map