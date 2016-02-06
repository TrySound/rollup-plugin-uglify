import babel from 'rollup-plugin-babel';

export default {
    entry: 'src/index.js',
    external: [ 'uglify-js' ],
    plugins: [
        babel({
            presets: [ 'es2015-rollup' ]
        })
    ]
};
