# vite-sodium-universal-test

Vite seems to be having trouble processing sodium-universal, it's trying to include sodium-native rather than sodium-javascript.
This repo is a minimal reproduction of the issue.
It includes vite, sodium-universal and node polyfills for both esbuild and rollup.

## Setup

```
pnpm install
```

## Test

### Dev

Running the app with `pnpm run dev` will result in the app crashing at runtime.
The error should look something like the following:

```
Uncaught ReferenceError: __dirname is not defined
    at node_modules/.pnpm/sodium-native@3.3.0/node_modules/sodium-native/index.js (index.js:1:40)
```

Uncommenting the esbuild pluging `sodium-fix` should make the app run as expected.
All this plugin does is resolve all imports of `sodium-native` to `sodium-javascript`.

### Prod

Building the app with `pnpm run build` and then loading the result using `pnpm run preview` will also result in the app crashing at runtime.
The error should look something like the following:

```
index.js:13 Uncaught TypeError: M.arch is not a function
    at index.js:13:46
```

This error is coming from `node-gyp-build` which is used by `sodium-native` and is not running `sodium-javascript` as it should.
