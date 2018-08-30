const { minify } = require("uglify-js");

const transform = (code, options) => {
  const result = minify(code, options);
  if (result.error) {
    throw result.error;
  } else {
    return result;
  }
};

exports.transform = transform;
