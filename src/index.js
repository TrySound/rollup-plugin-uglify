import uglify from 'uglify-js';

export default function (options = {}) {
    return {
        transformBundle(code) {
            options.fromString = true;
            delete options.inSourceMap;
            delete options.outSourceMap;

            // trigger sourcemap generation
            if (options.sourceMap !== false) {
                options.outSourceMap = 'x';
            }

            const result = uglify.minify(code, options);

            // Strip sourcemaps comment and extra \n
            if (result.map) {
                const commentPos = result.code.lastIndexOf('//#');
                result.code = result.code.slice(0, commentPos).trim();
            }

            return result;
        }
    };
}
