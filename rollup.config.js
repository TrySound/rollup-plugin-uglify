import buble from 'rollup-plugin-buble';

var pkg = require('./package.json');

export default {
	entry: 'index.js',
	plugins: [buble()],
	targets: [
		{
			format: 'cjs',
			dest: 'dist/' + pkg.name + '.js'
		},
		{
			format: 'es6',
			dest: 'dist/' + pkg.name + '.mjs'
		}
	]
};
