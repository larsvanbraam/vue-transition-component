[![Travis](https://img.shields.io/travis/larsvanbraam/vue-transition-component.svg?maxAge=2592000)](https://travis-ci.org/larsvanbraam/vue-transition-component)
[![Code Climate](https://img.shields.io/codeclimate/github/larsvanbraam/vue-transition-component.svg?maxAge=2592000)](https://codeclimate.com/github/larsvanbraam/vue-transition-component)
[![npm](https://img.shields.io/npm/dm/vue-transition-component.svg?maxAge=2592000)](https://www.npmjs.com/package/vue-transition-component)
[![GitHub issues](https://img.shields.io/github/issues/larsvanbraam/vue-transition-component.svg?style=flat-square)](https://github.com/larsvanbraam/vue-transition-component/issues)

<p align="center">
    <img src="http://vue-transition-component.larsvanbraam.nl/vue-transition-component-1024.png?v=2" alt="vue-transition-component" width="512"/>
</p>

Provides GreenSock transition functionality to vue.js components.

## Table of contents

1. [Installation](#installation)
2. [Demo](#demo)
3. [Usage](#usage)
4. [Building](#building)
5. [Authors](#authors)
6. [Contribute](#contribute)
7. [License](#license)

## Installation
### yarn / npm

```sh
yarn add vue-transition-component
```

```sh
npm i -S vue-transition-component
```

## Demo
I've created a demo repository that contains the setup for the latest vue-skeleton (v0.8.1) with the 
vue-transition-component (v1.1.17) installed. You can inspect the code there or if you just want to preview the block 
system you can visit the demo online!

### [Demo repository](https://github.com/larsvanbraam/vue-transition-component-demo)
### [Online demo](http://vue-transition-component.larsvanbraam.nl)

## Usage
Detailed documentation and examples are located in the wiki!

### [Check the wiki!](https://github.com/larsvanbraam/vue-transition-component/wiki)


## Building

In order to build vue-transition-component, ensure that you have [Git](http://git-scm.com/downloads) and [Node.js](http://nodejs.org/) installed.

Clone a copy of the repo:
```sh
git clone https://github.com/larsvanbraam/vue-transition-component.git
```

Change to the vue-transition directory:
```sh
cd vue-transition-component
```

Install dev dependencies:
```sh
yarn
```

Use one of the following main scripts:
```sh
yarn build           # build this project
yarn dev             # run dev-watch mode, serving example/index.html in the browser
yarn generate        # generate all artifacts (compiles ts, webpack, docs and coverage)
yarn test:unit       # run the unit tests
yarn validate        # runs validation scripts, including test, lint and coverage check
yarn lint            # run tslint on this project
yarn doc             # generate typedoc documentation
```

When installing this module, it adds a pre-push hook, that runs the `validate`
script before committing, so you can be sure that everything checks out.

If you want to create the distribution files yourself, you can run the
`build-dist` script, and the following files will get generated in the
`dist` folder:

- **/dist/vue-transition-component.js**: bundled with webpack, can be loaded from
	a script tag, available as `window.SengScrollTracker`
- **/dist/vue-transition-component.min.js**: same as above, but minified
- **/dist/vue-transition-component-amd.js**: bundled with webpack, can be used
	with e.g. requirejs
- **/dist/vue-transition-component-commonjs.js**: bundled with webpack, can be
	used in systems that support commonjs, but you should just use npm
- **/dist/vue-transition-component-umd.js**: bundled with webpack, works in the
	browser, with requirejs, and in a commonjs system
- **/dist/vue-transition-component-umd.min.js**: same as above, but minified
- **/dist/vue-transition-component-system.js**: bundled with typescript, can be
	used in systems	that support systemjs
- **/dist/vue-transition-component-es6.zip**: transpiled with typescript, only
	types are removed from the source files

## Authors
View [AUTHORS.md](./AUTHORS.md)

## Contribute
View [CONTRIBUTING.md](./CONTRIBUTING.md)

## License
[MIT](./LICENSE) © Lars van Braam
