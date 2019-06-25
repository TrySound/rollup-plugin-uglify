const { codeFrameColumns } = require("@babel/code-frame");
const Worker = require("jest-worker").default;
const serialize = require("serialize-javascript");
const { createFilter } = require('rollup-pluginutils');

function uglify(userOptions = {}) {
  if (userOptions.sourceMap != null) {
    throw Error("sourceMap option is removed, use sourcemap instead");
  }

  const filter = createFilter( userOptions.include, userOptions.exclude, { resolve: false } );

  const minifierOptions = serialize(
    Object.assign({}, userOptions, {
      exclude: undefined,
      include: undefined,
      sourceMap: userOptions.sourcemap !== false,
      sourcemap: undefined,
      numWorkers: undefined
    })
  );

  return {
    name: "uglify",

    renderStart() {
      this.worker = new Worker(require.resolve("./transform.js"), {
        numWorkers: userOptions.numWorkers
      });
    },

    renderChunk(code, { fileName }) {
      if(!filter(fileName)){
        return null;
      }

      return this.worker.transform(code, minifierOptions).catch(error => {
        const { message, line, col: column } = error;
        console.error(
          codeFrameColumns(code, { start: { line, column } }, { message })
        );
        throw error;
      });
    },

    generateBundle() {
      this.worker.end();
    },

    renderError() {
      this.worker.end();
    }
  };
}

exports.uglify = uglify;
