const { minify } = require("uglify-js");

const transform = (code, optionsString) => {
  const options = eval(`(${optionsString})`);
  return new Promise((resolve, reject) => {
    const result = minify(code, options);
    if (result.error) {
      reject(result.error);
    } else {
      resolve({ result, nameCache: options.nameCache });
    }
  });
};

exports.transform = transform;
