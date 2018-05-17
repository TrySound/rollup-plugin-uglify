const minify = require("uglify-js").minify;

function uglify(userOptions, minifier) {
  if (minifier === undefined) {
    minifier = minify;
  }
  const options = Object.assign({ sourceMap: true }, userOptions);

  return {
    name: "uglify",

    transformBundle(code) {
      const result = minifier(code, options);
      if (result.error) {
        throw result.error;
      }
      return result;
    }
  };
}

module.exports = uglify;
