import uglify from 'uglify-js';

export default function (options = {}) {
	return {
		transformBundle(code) {
			options.fromString = true;

			// trigger sourcemap generation
			if (options.sourceMap !== false) {
				options.outSourceMap = 'x';
			}

			let result = uglify.minify(code, options);

			// Strip sourcemaps comment and extra \n
			if (result.map) {
				let commentPos = result.code.lastIndexOf('//#');
				result.code = result.code.slice(0, commentPos).trim();
			}

			return result;
		}
	};
}
