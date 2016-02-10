# rollup-plugin-uglify [![Travis Build Status][travis-img]][travis]

[travis-img]: https://travis-ci.org/TrySound/rollup-plugin-uglify.svg
[travis]: https://travis-ci.org/TrySound/rollup-plugin-uglify

[Rollup](https://github.com/rollup/rollup) plugin to minify generated bundle.

## Install

```sh
npm i rollup-plugin-uglify -D
```

## Usage

```js
import { rollup } from 'rollup';
import uglify from 'rollup-plugin-uglify';

rollup({
	entry: 'main.js',
	plugins: [
		uglify()
	]
});
```

## Warning
[UglifyJS](https://github.com/mishoo/UglifyJS2), which this plugin is based on, does not support the ES2015 module syntax. Thus using this plugin with Rollup's default bundle format (`'es6'`) will not work and error out.

# License

MIT © [Bogdan Chadkin](mailto:trysound@yandex.ru)
