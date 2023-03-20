import {minify} from 'uglify-js';

export const transform = async (code: string | string[] | { [file: string]: string }, optionsString: string) => {
    const options = eval(`(${optionsString})`)
    const result = minify(code, options);

    if (result.error) {
        throw result.error;
    } else {
        return result;
    }
};
