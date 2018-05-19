const { codeFrameColumns } = require("@babel/code-frame");
const { minify } = require("uglify-js");

function uglify(userOptions, minifier = minify) {
  const options = Object.assign({ sourceMap: true }, userOptions);

  return {
    name: "uglify",

    transformBundle(code) {
      const result = minifier(code, options);
      if (result.error) {
        const { message, line, col: column } = result.error;
        console.error(
          codeFrameColumns(code, { start: { line, column } }, { message })
        );
        throw result.error;
      }
      return result;
    }
  };
}

exports.uglify = uglify;
