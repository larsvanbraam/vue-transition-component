# vue-transition

Work in progress!


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
this module available attached to the [Github Releases](https://github.com/larsvanbraam/vue-transition/releases).

### manual

Check the **build** section below to see your you can build for all the
targets yourself.

## Usage

TODO: add usage documentation

## Documentation

View the [generated documentation](http://larsvanbraam.github.io/vue-transition/).


## Building

In order to build vue-transition, ensure that you have [Git](http://git-scm.com/downloads)
and [Node.js](http://nodejs.org/) installed.

Clone a copy of the repo:
```sh
git clone https://github.com/larsvanbraam/vue-transition.git
```

Change to the vue-transition directory:
```sh
cd vue-transition
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

- **/dist/vue-transition.js**: bundled with webpack, can be loaded from
	a script tag, available as `window.SengBoilerplate`
- **/dist/vue-transition.min.js**: same as above, but minified
- **/dist/vue-transition-amd.js**: bundled with webpack, can be used
	with e.g. requirejs
- **/dist/vue-transition-commonjs.js**: bundled with webpack, can be
	used in systems that support commonjs, but you should just use npm
- **/dist/vue-transition-umd.js**: bundled with webpack, works in the
	browser, with requirejs, and in a commonjs system
- **/dist/vue-transition-umd.min.js**: same as above, but minified
- **/dist/vue-transition-system.js**: bundled with typescript, can be
	used in systems	that support systemjs
- **/dist/vue-transition-es6.zip**: transpiled with typescript, only
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
    Detected repository as larsvanbraam/vue-transition, is this correct? |yes|
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
