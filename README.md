# css-var-delta

CSS Variable Delta - Library for calculating the delta of the screen size and setting it as a CSS variable.
Extremely useful for web games and responsive design.

[Demo](https://hikorniienko.github.io/css-var-delta/)

* [Install](#install)
  * [cdn](#cdn)
  * [npm](#npm)
* [How to use](#how-to-use)
* [Core](#core)
  * [Options](#options)
  * [Methods](#methods)

## Install

### cdn

```js
<script src="/path/to/index.js"></script>
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
  ["portrait@360x540", "landscape@960x540"],
  false
);
```

## How to use

## Core

### Options

#### config 
`string[]` `['portrait@360x540', 'landscape@960x540']` *`required`*

Config screen sizes for delta calculation in format **orientation@widthxheight**.
Where orientation is 'portrait' or 'landscape'.

#### debug 
`boolean` `false`

Debug mode, display delta, orientation, and current config in the console.

### Methods

#### destroy()
Remove resize event listener and delta CSS variable.
