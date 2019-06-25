const { rollup } = require("rollup");
const { uglify } = require("../");

test("minify", async () => {
  const bundle = await rollup({
    input: "test/fixtures/unminified.js",
    plugins: [uglify()]
  });
  const result = await bundle.generate({ format: "cjs" });
  const { code, map } = result.output[0];
  expect(code).toEqual(
    '"use strict";window.a=5,window.a<3&&console.log(4);\n'
  );
  expect(map).toBeFalsy();
});

test("minify via uglify options", async () => {
  const bundle = await rollup({
    input: "test/fixtures/empty.js",
    plugins: [uglify({ output: { comments: "all" } })]
  });
  const result = await bundle.generate({
    banner: "/* package name */",
    format: "cjs"
  });
  const { code, map } = result.output[0];
  expect(code).toEqual('/* package name */\n"use strict";\n');
  expect(map).toBeFalsy();
});

test("minify with sourcemaps", async () => {
  const bundle = await rollup({
    input: "test/fixtures/sourcemap.js",
    plugins: [uglify()]
  });
  const result = await bundle.generate({ format: "cjs", sourcemap: true });
  const { code, map } = result.output[0];
  expect(map).toBeTruthy();
});

test("allow to disable source maps", async () => {
  const bundle = await rollup({
    input: "test/fixtures/sourcemap.js",
    plugins: [uglify({ sourcemap: false })]
  });
  await bundle.generate({ format: "cjs" });
});

test("does not allow to pass sourceMap", async () => {
  try {
    const bundle = await rollup({
      input: "test/fixtures/sourcemap.js",
      plugins: [uglify({ sourceMap: false })]
    });
    await bundle.generate({ format: "cjs" });
    expect(true).toBeFalsy();
  } catch (error) {
    expect(error.toString()).toMatch(/sourceMap option is removed/);
  }
});

test("throw error on uglify fail", async () => {
  try {
    const bundle = await rollup({
      input: "test/fixtures/failed.js",
      plugins: [
        {
          renderChunk: () => ({ code: "var = 1" })
        },
        uglify()
      ]
    });
    await bundle.generate({ format: "esm" });
    expect(true).toBeFalsy();
  } catch (error) {
    expect(error.toString()).toMatch(/Name expected/);
  }
});

test("works with code splitting", async () => {
  const bundle = await rollup({
    input: ["test/fixtures/chunk-1.js", "test/fixtures/chunk-2.js"],
    experimentalCodeSplitting: true,
    plugins: [uglify()]
  });
  const { output } = await bundle.generate({ format: "esm" });
  const newOutput = {};
  Object.keys(output).forEach(key => {
    const { modules, facadeModuleId, ...value } = output[key];
    newOutput[key] = value;
  });
  expect(newOutput).toMatchSnapshot();
});

test("allow to pass not string values to worker", async () => {
  const bundle = await rollup({
    input: "test/fixtures/unminified.js",
    plugins: [uglify({ mangle: { properties: { regex: /^_/ } } })]
  });
  const result = await bundle.generate({ format: "cjs" });
  expect(result.output[0].code).toEqual(
    '"use strict";window.a=5,window.a<3&&console.log(4);\n'
  );
});

test("include chunk file by string name", async () => {
  const bundle = await rollup({
    input: "test/fixtures/unminified.js",
    plugins: [ uglify({ include: 'some.js' }) ]
  });

  const result = await bundle.generate({ format: "es", file: 'some.js' });
  const { code, map } = result.output[0];
  expect(code).toBe(`window.a=5,window.a<3&&console.log(4);\n`);
  expect(map).toBeFalsy();
});

test("exclude chunk file pattern name by minimatch pattern", async () => {
  const bundle = await rollup({
    input: "test/fixtures/unminified.js",
    plugins: [ uglify({ exclude: '*-cjs.js' }) ]
  });
  const result = await bundle.generate({ format: "cjs", entryFileNames: '[name]-[format].js' });
  const { code, map } = result.output[0];

  expect(code).toBe(`'use strict';\n\nwindow.a = 5;\n\nif (window.a < 3) {\n  console.log(4);\n}\n`);
  expect(map).toBeFalsy();
});

test("include only one chunk file by regex", async () => {
  const bundle = await rollup({
    input: [ "test/fixtures/chunk-1.js", "test/fixtures/chunk-2.js" ],
    plugins: [ uglify({ include: /.+-1\.\w+/ }) ]
  });
  const result = await bundle.generate({ format: "es" });
  const chunk1 = result.output[0];
  const chunk2 = result.output[1];

  expect(chunk1.code).toBe(`var chunk1="chunk-1";console.log(chunk1);\n`);
  expect(chunk1.map).toBeFalsy();
  expect(chunk2.code).toBe(`var chunk2 = 'chunk-2';\nconsole.log(chunk2);\n`);
  expect(chunk2.map).toBeFalsy();
});
