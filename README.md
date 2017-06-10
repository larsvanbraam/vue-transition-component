[![Travis](https://img.shields.io/travis/mediamonks/seng-boilerplate.svg?maxAge=2592000)](https://travis-ci.org/mediamonks/seng-boilerplate)
[![Code Climate](https://img.shields.io/codeclimate/github/mediamonks/seng-boilerplate.svg?maxAge=2592000)](https://codeclimate.com/github/mediamonks/seng-boilerplate)
[![Coveralls](https://img.shields.io/coveralls/mediamonks/seng-boilerplate.svg?maxAge=2592000)](https://coveralls.io/github/mediamonks/seng-boilerplate?branch=master)
[![npm](https://img.shields.io/npm/v/seng-boilerplate.svg?maxAge=2592000)](https://www.npmjs.com/package/seng-boilerplate)
[![npm](https://img.shields.io/npm/dm/seng-boilerplate.svg?maxAge=2592000)](https://www.npmjs.com/package/seng-boilerplate)

# vue-transition

Add a description here...


## Installation

### yarn / npm

```sh
yarn add vue-transition
```

```sh
npm i -S vue-transition
```

### other

We also have browser, amd, commonjs, umd, systemjs and es6 versions of
this module available attached to the [Github Releases](https://github.com/mediamonks/seng-boilerplate/releases).

<!---

Note: The below cannot be used yet, as there is no way to link to a
specific version yet without updating this readme manually after each
new version.


### browser

```html
<script src="http://mediamonks-development.s3.amazonaws.com/seng/libs/seng-boilerplate/1.2.0/seng-boilerplate.min.js"></script>
```
```js
console.log(window.SengBoilerplate)
```

### other

Besides the browser version, there are other versions available for
download as well:

- [browser](http://mediamonks-development.s3.amazonaws.com/seng/libs/seng-boilerplate/1.2.0/seng-boilerplate.js) (and [minified](http://mediamonks-development.s3.amazonaws.com/seng/libs/seng-boilerplate/1.2.0/seng-boilerplate.min.js))
- [umd](http://mediamonks-development.s3.amazonaws.com/seng/libs/seng-boilerplate/1.2.0/seng-boilerplate.js) (and [minified](http://mediamonks-development.s3.amazonaws.com/seng/libs/seng-boilerplate/1.2.0/seng-boilerplate-umd.min.js))
- [amd](http://mediamonks-development.s3.amazonaws.com/seng/libs/seng-boilerplate/1.2.0/seng-boilerplate-amd.js)
- [commonjs](http://mediamonks-development.s3.amazonaws.com/seng/libs/seng-boilerplate/1.2.0/seng-boilerplate-commonjs.js)
- [systemjs](http://mediamonks-development.s3.amazonaws.com/seng/libs/seng-boilerplate/1.2.0/seng-boilerplate-system.js)
- [es6](http://mediamonks-development.s3.amazonaws.com/seng/libs/seng-boilerplate/1.2.0/seng-boilerplate-es6.zip)

-->

### manual

Check the **build** section below to see your you can build for all the
targets yourself.

## Usage

```ts
import SengBoilerplate from 'seng-boilerplate';
// import SengBoilerplate from 'seng-boilerplate/lib/classname';

// do something with SengBoilerplate
```


## Documentation

View the [generated documentation](http://mediamonks.github.io/seng-boilerplate/).


## Building

In order to build seng-boilerplate, ensure that you have [Git](http://git-scm.com/downloads)
and [Node.js](http://nodejs.org/) installed.

Clone a copy of the repo:
```sh
git clone https://github.com/mediamonks/seng-boilerplate.git
```

Change to the seng-boilerplate directory:
```sh
cd seng-boilerplate
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
yarn typings         # install .d.ts dependencies (done on install)
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

- **/dist/seng-boilerplate.js**: bundled with webpack, can be loaded from
	a script tag, available as `window.SengBoilerplate`
- **/dist/seng-boilerplate.min.js**: same as above, but minified
- **/dist/seng-boilerplate-amd.js**: bundled with webpack, can be used
	with e.g. requirejs
- **/dist/seng-boilerplate-commonjs.js**: bundled with webpack, can be
	used in systems that support commonjs, but you should just use npm
- **/dist/seng-boilerplate-umd.js**: bundled with webpack, works in the
	browser, with requirejs, and in a commonjs system
- **/dist/seng-boilerplate-umd.min.js**: same as above, but minified
- **/dist/seng-boilerplate-system.js**: bundled with typescript, can be
	used in systems	that support systemjs
- **/dist/seng-boilerplate-es6.zip**: transpiled with typescript, only
	types are removed from the source files

## Contribute

View [CONTRIBUTING.md](./CONTRIBUTING.md)


## Changelog

View [CHANGELOG.md](./CHANGELOG.md)


## Authors

View [AUTHORS.md](./AUTHORS.md)


## LICENSE

[MIT](./LICENSE) © MediaMonks

### Travis

This project uses [Travis](https://travis-ci.org) to build, test and
publish its code to npm. Travis is free for public Github repositories.

It runs on all commits, shows the build status for pull requests, and
publishes to npm when a new tag/release is created.

Travis only runs the `npm test` script, so have configured that script
to run everything we want Travis to check. Besides the unit tests, we
also run our validations and linters.

The travis configuration is placed in a `.travis.yml` file, consisting
of multiple sections.

1.  Defines the `node_js` [language](https://docs.travis-ci.com/user/languages/javascript-with-nodejs),
    and tells travis on which node versions to run the process.
2.  Before running, it needs to install some global dependencies, and
    when it processes some coverage results.
3.  It can do a [npm deploy](https://docs.travis-ci.com/user/deployment/npm),
    telling it to keep the generated artifacts and only publish when run
    on node 4 and when a tag was committed. It also contains the email
    address and api key of the npm user.
4.  Code Climate has a [travis plugin](https://docs.travis-ci.com/user/code-climate/)
    that automatically uploads the code coverage results.

Because we want to keep the npm api key secret, we generate a secure
token with the [Travis Client](https://github.com/travis-ci/travis.rb),
a CLI written in ruby.

Before we can do this, we must make sure that the repository is added
to Travis, because Travis needs the repository owner/name info to make
sure the encrypted values only work for that repository.

1.  First you need to [login](https://github.com/travis-ci/travis.rb#login)
    with your travis account:

    ```sh
    $ travis login
    ```

    To verify that you are logged in correctly you can check:

    ```sh
    $ travis whoami
    ```

2.  Then make sure you are logged in to your npm account with the
    [adduser](https://docs.npmjs.com/cli/adduser) command:

    ```sh
    $ npm adduser
    ```

    To verify that you are logged in correctly you can check:

    ```sh
    $ npm whoami
    ```

3.  Now we need to grab your auth token so we can encrypt it:

    ```sh
    $ cat ~/.npmrc

    # outputs:
    //registry.npmjs.org/:_authToken=<your_auth_token>
    ```

4.  Then let's encrypt that token using the travis [encrypt](https://github.com/travis-ci/travis.rb#encrypt)
    command:

    ```sh
    $ travis encrypt <your_auth_token>
    Detected repository as mediamonks/seng-boilerplate, is this correct? |yes|
    Please add the following to your .travis.yml file:

      secure: "YcN...Zb="
    ```

    Now copy that last line, paste it into your `.travis.yml`, and make
    sure it looks something like this:

    ```yml
    deploy:
      provider: npm
      email: "john@doe.com"
      api_key:
        secure: "YcN...Zb="
    ```

### Code Climate

Todo: describe Code Climate configuration and usage.

### Coverall

Todo: describe Coverall configuration and usage.

### NPM

Todo: describe NPM configuration and usage.
