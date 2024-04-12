# css-var-delta

CSS Variable Delta - Library for calculating the delta of the screen size and setting it as a CSS variable.
Extremely useful for web games and responsive design.

[Demo](https://hikorniienko.github.io/css-var-delta/)

## Install

### cdn

```js
<script src="https://cdn.jsdelivr.net/npm/css-var-delta@1.0.9/dist/index.js"></script>
<script>
  new CssVarDelta.default(
      ["portrait@360x540", "landscape@960x540"],
      false
  );
</script>
```

### npm

```bash
npm install css-var-delta
```

```js
import CssVarDelta from 'css-var-delta';

new CssVarDelta(
  ['portrait@360x540', 'landscape@960x540'],
  false
);
```

## How to use

After initialization, the variable `--delta` will be added to the root document. Just multiply `--delta` by px or other dimensions.

### css

```css
.box {
  background-color: yellow;
  width: calc(var(--delta, 1) * 100px);
  height: calc(var(--delta, 1) * 100px);
}
```

### scss

```css
@use 'sass:math';

@function cvd($pixels) {
    @return calc(var(--delta, 1) * #{$pixels + px});
}

.box {
  background-color: yellow;
  width: cvd(100);
  height: cvd(100);
}
```

## Core

### Options

#### config 
`string[]` `['portrait@360x540', 'landscape@960x540']`

Config screen sizes for delta calculation in format **orientation@widthxheight**.
Where orientation is 'portrait' or 'landscape'.

#### debug 
`boolean` `false`

Debug mode, display delta, orientation, and current config in the console.

### Methods

#### destroy()
Remove resize event listener and delta CSS variable.
