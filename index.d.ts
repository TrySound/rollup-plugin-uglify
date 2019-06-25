import { Plugin } from 'rollup';
import { MinifyOptions } from 'uglify-js';

export interface Options extends MinifyOptions {

    /**
     * Specifically include/exclude chunk files names (minimatch pattern, or array of minimatch patterns), By default all chunk files will be minify.
     */
    include?: Array<string | RegExp> | string | RegExp | null;
    exclude?: Array<string | RegExp> | string | RegExp | null;

    /**
     * Generates source maps and passes them to rollup.
     *
     * @default true
     */
    sourcemap?: boolean;

    /**
     * Amount of workers to spawn. Defaults to the number of CPUs minus 1.
     */
    numWorkers?: number;

}

export declare function uglify(options?: Options): Plugin;
