const minify = require('uglify-js').minify;

function uglify(userOptions, minifier) {
    if (minifier === undefined) {
        minifier = minify;
    }
    const options = Object.assign({ sourceMap: true }, userOptions);
    return {
        name: 'uglify',

        transformBundle(code) {
            return minifier(code, options);
        }
    };
}

module.exports = uglify;

