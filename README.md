# babel-plugin-pure-js
Enforce a pure-functional subset of JS

## Install

```
npm i --save-dev babel-plugin-pure-js
```

## Usage

1. Add the plugin to your .babelrc
2. Name any Pure JS files to end with ```.pure.js```

Example .babelrc:

```
{
  "presets": ["env"],
  "plugins": ["pure-js", "transform-object-rest-spread"]
}
```
