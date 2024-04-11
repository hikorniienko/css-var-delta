# css-var-delta

CSS Variable Delta - Library for calculating the delta of the screen size and setting it as a CSS variable.
Extremely useful for web games and responsive design.

## In the browser

```js
<script src="/path/to/index.js"></script>
<script>
new CssVarDelta.default(
    ["portrait@360x540", "landscape@960x540"],
    false
);
</script>
```

## NPM Install

```bash
npm install css-var-delta
```

```js
import CssVarDelta from 'css-var-delta';
```

## Basic Usage Example

```js
new CssVarDelta(
    ["portrait@360x540", "landscape@960x540"],
    false
);
```

## Options

#### config `string[]` `['portrait@360x540', 'landscape@960x540']` *`required`*
Config screen sizes for delta calculation in format ['orientation@widthxheight'].
Where orientation is 'portrait' or 'landscape'.

## Methods

#### destroy()
Remove resize event listener and delta CSS variable
