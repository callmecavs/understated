# understated

[![understated on Travis](https://img.shields.io/travis/callmecavs/understated.svg?style=flat-square)](https://travis-ci.org/callmecavs/understated) [![understated on NPM](https://img.shields.io/npm/v/understated.svg?style=flat-square)](https://www.npmjs.com/package/understated) [![understated Downloads on NPM](https://img.shields.io/npm/dm/understated.svg?style=flat-square)](https://www.npmjs.com/package/understated) [![Standard JavaScript Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

Render stateless components and JSX to real DOM.

## Install

```sh
$ npm i understated --save
```

## Use

```javascript
import {
  h,
  render
} from 'understated'

// tell babel to use h as the JSX pragma
/** @jsx h */

// create a component
const Component = props => (
  <p className="content">{ props.text }</p>
)

// render it
render(
  <Component text="A stateless component."/>,
  document.body
)
```

## See Also

* [understated-cli](https://github.com/callmecavs/understated-cli) - Create understated sites with no configuration.

## License

[MIT](https://opensource.org/licenses/MIT). © 2017 Michael Cavalea
