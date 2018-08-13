# rollup-plugin-uglify [![Travis Build Status][travis-img]][travis]

[travis-img]: https://travis-ci.org/TrySound/rollup-plugin-uglify.svg
[travis]: https://travis-ci.org/TrySound/rollup-plugin-uglify

[Rollup](https://github.com/rollup/rollup) plugin to minify generated bundle. Uses [UglifyJS](https://github.com/mishoo/UglifyJS2) under the hood.

_Note: uglify-js is able to transpile only es5 syntax. If you want to transpile es6+ syntax use [terser](https://github.com/TrySound/rollup-plugin-terser) instead_

## Install

```sh
npm i rollup-plugin-uglify -D
```

## Usage

```js
import { rollup } from 'rollup';
import { uglify } from 'rollup-plugin-uglify';

rollup({
  entry: 'main.js',
  plugins: [
    uglify()
  ]
});
```

## Options

```js
uglify(options, minifier)
```

`options` – default: `{}`, type: `object`. [UglifyJS API options](https://github.com/mishoo/UglifyJS2/blob/master/README.md#minify-options)

`minifier` – default: `require('uglify-js').minify`, type: `function`. Module to use as a minifier. You can use other versions (or forks) of UglifyJS instead default one.

## Examples

### Comments

If you'd like to preserve comments (for licensing for example), then you can specify a function to do this like so:

```js
uglify({
  output: {
    comments: function (node, comment) {
      if (comment.type === "comment2") {
        // multiline comment
        return /@preserve|@license|@cc_on/i.test(comment.value);
      }
      return false;
    }
  }
});
```

Alternatively, you can also choose to keep all comments (e.g. if a licensing header has already been prepended by a previous rollup plugin):

```js
uglify({
  output: {
    comments: 'all'
  }
});
```

See [UglifyJS documentation](https://github.com/mishoo/UglifyJS2/blob/master/README.md) for further reference.

# License

MIT © [Bogdan Chadkin](mailto:trysound@yandex.ru)
