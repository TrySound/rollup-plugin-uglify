const assert = require('assert');
const rollup = require('rollup').rollup;
const minify = require('uglify-js').minify;
const readFile = require('fs').readFileSync;
const uglify = require('../');

test('minify', () => {
    return rollup({
        entry: 'test/fixtures/unminified.js',
        plugins: [
            uglify()
        ]
    }).then(bundle => {
        const result = bundle.generate({ format: 'cjs' });
        expect(Object.keys(result)).toHaveLength(2);
        expect(result.code).toEqual('"use strict";var a=5;a<3&&console.log(4);\n');
        expect(result.map).toBeFalsy();
    });
});

test('minify via uglify options', () => {
    return rollup({
        entry: 'test/fixtures/empty.js',
        plugins: [
            uglify({ output: { comments: 'all' } })
        ]
    }).then(bundle => {
        const result = bundle.generate({ banner: '/* package name */', format: 'cjs' });
        expect(Object.keys(result)).toHaveLength(2);
        expect(result.code).toEqual('/* package name */\n"use strict";\n');
        expect(result.map).toBeFalsy();
    });
});

test('minify with sourcemaps', () => {
    return rollup({
        entry: 'test/fixtures/sourcemap.js',
        plugins: [
            uglify()
        ]
    }).then(bundle => {
        const result = bundle.generate({ format: 'cjs', sourceMap: true });
        expect(Object.keys(result)).toHaveLength(2);
        expect(result.map).toBeTruthy();
    });
});

test('allow passing minifier', () => {
    const expectedCode = readFile('test/fixtures/plain-file.js', 'utf-8');
    const testOptions = {
        foo: 'bar'
    };

    return rollup({
        entry: 'test/fixtures/plain-file.js',
        plugins: [
            uglify(testOptions, (code, options) => {
                expect(code.trim()).toEqual(expectedCode.trim());
                expect(options).toEqual({
                    foo: 'bar',
                    sourceMap: true
                });
                return { code };
            })
        ]
    }).then(bundle => {
        const result = bundle.generate({ format: 'es' });
        expect(result.code.trim()).toEqual(expectedCode.trim());
    });
});

test('throw error on uglify fail', () => {
    const result = rollup({
        entry: 'test/fixtures/failed.js',
        plugins: [
            uglify()
        ]
    });
    return expect(result.catch(e => e.message)).resolves.toMatch(/Unexpected token/);
});

