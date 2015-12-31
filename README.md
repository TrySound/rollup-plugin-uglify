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

# License

MIT © [Bogdan Chadkin](mailto:trysound@yandex.ru)
