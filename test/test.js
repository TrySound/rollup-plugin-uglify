const assert = require("assert");
const rollup = require("rollup").rollup;
const readFile = require("fs").readFileSync;
const uglify = require("../");

test("minify", async () => {
  const bundle = await rollup({
    input: "test/fixtures/unminified.js",
    plugins: [uglify()]
  });
  const result = await bundle.generate({ format: "cjs" });
  expect(Object.keys(result)).toHaveLength(2);
  expect(result.code).toEqual('"use strict";var a=5;a<3&&console.log(4);\n');
  expect(result.map).toBeFalsy();
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
  expect(Object.keys(result)).toHaveLength(2);
  expect(result.code).toEqual('/* package name */\n"use strict";\n');
  expect(result.map).toBeFalsy();
});

test("minify with sourcemaps", async () => {
  const bundle = await rollup({
    input: "test/fixtures/sourcemap.js",
    plugins: [uglify()]
  });
  const result = await bundle.generate({ format: "cjs", sourcemap: true });
  expect(Object.keys(result)).toHaveLength(2);
  expect(result.map).toBeTruthy();
});

test("allow passing minifier", async () => {
  const expectedCode = readFile("test/fixtures/plain-file.js", "utf-8");
  const testOptions = {
    foo: "bar"
  };

  const bundle = await rollup({
    input: "test/fixtures/plain-file.js",
    plugins: [
      uglify(testOptions, (code, options) => {
        expect(code.trim()).toEqual(expectedCode.trim());
        expect(options).toEqual({
          foo: "bar",
          sourceMap: true
        });
        return { code };
      })
    ]
  });
  const result = await bundle.generate({ format: "es" });
  expect(result.code.trim()).toEqual(expectedCode.trim());
});

test("throw error on uglify fail", async () => {
  const bundle = await rollup({
    input: "test/fixtures/failed.js",
    plugins: [
      uglify({}, () => ({
        error: Error("some error")
      }))
    ]
  });
  try {
    await bundle.generate({ format: "es" });
    expect(true).toBeFalsy();
  } catch (err) {
    expect(err.toString()).toMatch(/some error/);
  }
});
