const assert = require('assert');
const { rollup } = require('rollup');
const { minify } = require('uglify-js');
const { readFileSync: readFile } = require('fs');
const uglify = require('../');

process.chdir('test');

const trim = str => str.replace(/\s+$/g, '');

describe('rollup-plugin-uglify', () => {
	it('should minify', () => {
		return rollup({
			entry: 'fixtures/unminified.js',
			plugins: [ uglify() ]
		}).then(bundle => {
			const unminified = readFile('fixtures/unminified.js', 'utf-8');
			const result = bundle.generate({
				format: 'cjs'
			});

			assert.equal(trim(result.code), trim('"use strict";var a=5;a<3&&console.log(4)'));
		});
	});

	it('should minify via uglify options', () => {
		return rollup({
			entry: 'fixtures/empty.js',
			plugins: [ uglify({
				output: { comments: 'all' }
			}) ]
		}).then(bundle => {
			const result = bundle.generate({
				banner: '/* package name */',
				format: 'cjs'
			});

			assert.equal(trim(result.code), trim('/* package name */\n"use strict"'));
		});
	});

	it('should minify with sourcemaps', () => {
		return rollup({
			entry: 'fixtures/sourcemap.js',
			plugins: [ uglify() ]
		}).then(bundle => {
			const result = bundle.generate({
				format: 'cjs',
				sourceMap: true
			});

			assert.ok(result.map, 'has a source map');
			assert.equal(result.map.version, 3, 'source map has expected version');
			assert.ok(Array.isArray(result.map.sources), 'source map has sources array');
			assert.equal(result.map.sources.length, 2, 'source map has two sources');
			assert.ok(Array.isArray(result.map.names), 'source maps has names array');
			assert.ok(result.map.mappings, 'source map has mappings');
		});
	});

	it('should allow passing minifier', () => {
		const expectedCode = readFile('fixtures/plain-file.js', 'utf-8');
		const testOptions = {
			foo: 'bar'
		};

		return rollup({
			entry: 'fixtures/plain-file.js',
			plugins: [ uglify(testOptions, (code, options) => {
				assert.ok(code, 'has unminified code');
				assert.equal(trim(code), trim(expectedCode), 'expected file content is passed to minifier');
				assert.ok(options, 'has minifier options');
				assert.equal(options.foo, 'bar', 'minifier gets custom options');

				return { code };
			})]
		}).then(bundle => {
			const result = bundle.generate({
        format: 'cjs'
			});

			assert.ok(result.code, 'result has return code');
			assert.equal(trim(result.code), trim(expectedCode), 'result code has expected content');
		});
	});
});
