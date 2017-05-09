import { minify } from 'uglify-js';

export default function uglify(options = {}, minifier = minify) {
	return {
		name: 'uglify',

		transformBundle(code) {
			// trigger sourcemap generation
			if (options.sourceMap !== false) {
				options.sourceMap = true;
			}

			const result = minifier(code, options);

			// Strip sourcemaps comment and extra \n
			if (result.map) {
				const commentPos = result.code.lastIndexOf('//#');
				result.code = result.code.slice(0, commentPos).trim();
			}

			return result;
		}
	};
}
