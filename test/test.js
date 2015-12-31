import test from 'ava';
import { rollup } from 'rollup';
import { minify } from 'uglify-js';
import uglify from '..';
import { readFileSync as readFile } from 'fs';

test('should minify', t => {
	return rollup({
		entry: 'fixtures/unminified.js',
		plugins: [ uglify() ]
	}).then(bundle => {
		let unminified = readFile('fixtures/unminified.js', 'utf-8');
		let result = bundle.generate({
			format: 'cjs'
		});
		t.is(result.code, minify(unminified, { fromString: true }).code);
	});
});

test('should minify with sourcemaps', t => {
	return rollup({
		entry: 'fixtures/sourcemap.js',
		plugins: [ uglify() ]
	}).then(bundle => {
		let result = bundle.generate({
			format: 'cjs',
			sourceMap: true
		});

		t.ok(result.map, 'has a source map');
		t.is(result.map.version, 3, 'source map has expected version');
		t.ok(Array.isArray(result.map.sources), 'source map has sources array');
		t.is(result.map.sources.length, 2, 'source map has two sources');
		t.ok(Array.isArray(result.map.names), 'source maps has names array');
		t.ok(result.map.mappings, 'source map has mappings');
	});
});
