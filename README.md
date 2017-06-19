[![Travis](https://img.shields.io/travis/larsvanbraam/vue-transition-component.svg?maxAge=2592000)](https://travis-ci.org/larsvanbraam/vue-transition-component)
[![npm](https://img.shields.io/npm/v/vue-transition-component.svg?maxAge=2592000)](https://www.npmjs.com/package/seng-event)
[![GitHub issues](https://img.shields.io/github/issues/larsvanbraam/vue-transition.svg?style=flat-square)](https://github.com/larsvanbraam/vue-transition/issues)

# vue-transition-component

Provides transition functionality to vue.js components.

## Table of contents

1. [Features](#features)
	1. [Provided mixins](#provided-mixins)
	2. [Provided utils ](#provided-utils)
2. [Installation](#installation)
3. [Usage](#usage)
	1. [Creating a TransitionComponent](#creating-a-transitionComponent)
		1. [DummyComponent.vue](#dummyComponent.vue) 
		2. [DummyComponent.js](#dummyComponent.js)
		3. [DummyComponentTransitionController.ts](#dummyComponentTransitionController)
		4. [Seng-generator](#seng-generator) 
	2. [Rendering the component](#rendering-the-component)
	3. [Nesting timelines](#nesting-timelines)
	4. [Page transitions](#page-transitions)
		1. [App.vue](#app.vue)
		2. [App.js](#app.js)
		3. [Routes.js](#routes.js)
	5. [Access a child component](#access-a-child-component)
4. [Documentation](#documentation)
5. [Building](#building)
5. [Authors](#authors)
6. [Contribute](#contribute)
7. [License](#license):	

## Features
### Provided mixins
The functionality is provided through 3 types of mixins. These mixins give you an easy way of transitioning components.

- **AbstractRegistrableComponent**
- **AbstractTransitionComponent**
- **AbstractPageTransitionComponent**

### Provided utils
- **AbstractTransitionController** - is the base for all your transitions, It contains the timelines for transitioning in and out
- **FlowManager** - allows you to control the flow between two pages 

## Installation
### yarn / npm

```sh
yarn add vue-transition-component
```

```sh
npm i -S vue-transition-component
```

## Usage
All examples below are based on the [vue-skeleton](https://github.com/hjeti/vue-skeleton) by [hjeti](https://github.com/hjeti/) 

### 1. Creating a TransitionComponent
For demonstration purpose we will create a new component called DummyComponent.

#### DummyComponent.vue
The *.vue file does not require any modification.

#### DummyComponent.js
HandleAllComponentsReady is triggered when all the child components are 'ready'. Therefore we can create the DummyComponentTransition and be sure that all the child components are initialized.  

```js
import AbstractTransitionComponent from 'vue-transition-component';
import DummyComponentTransition from 'component/DummyComponent/DummyComponentTransition';

export default {
	name: 'DummyComponent',
	extends: AbstractTransitionComponent,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new DummyComponentTransition(this);
			this.isReady();
		},
	},
};

```

**Note:** *Vue.js will overwrite your methods so be aware of overwriting the following methods:*

1. `isReady`
2. `handleAllComponentsReady`
3. `transitionIn`
4. `transitionOut`
5. `checkComponentsReady`
6. `componentReady`
7. `getChildComponent`

#### DummyComponentTransitionController.ts
This file will contain all the transitions for your page, you can add tweens to the [provided greensock timelines](https://greensock.com/docs/#/HTML5/GSAP/TimelineLite/). 

```js
import AbstractTransitionController from 'vue-transition';

class DummyComponentTransition extends AbstractTransitionController
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
	}

	/**
	* @public
	* @method setupTransitionOutTimeline
	* @description Use this method to setup your transition out timeline
	* */
	protected setupTransitionOutTimeline(): void {
	}
}

export default DummyComponentTransition;

```

To setup the transitionIn you can do the following example:

```js
...
protected setupTransitionInTimeline(): void {
	this.transitionInTimeline.fromTo(this.viewModel.$el, 1, {autoAlpha: 0}, {autoAlpha: 1});
}
...
```

To setup the transitionOut you can pretty much do the same thing, keep in mind that if the transitionOutTimeline is not set it will reverse the transitionInTimeline.

```js
...
protected setupTransitionOutTimeline(): void {
	this.transitionOutTimeline.to(this.viewModel.$el, 1, {autoAlpha: 0});
}
...
```

#### Seng-generator
Check out the [seng-generator](https://github.com/mediamonks/seng-generator) generating components automatically!
I've added template files for automatically generating components with the seng-generator. If you use the
vue-skeleton you can download [these folders](/https://github.com/larsvanbraam/vue-transition-component/tree/master/seng-generator-templates) and paste them in your template folder!


### Rendering the component
Using transition components is the same as using any other component in Vue.js exept for the fact that you have to provide two extra props. The componentReady listener is the callback for when the component is ready and the componentId is the unique id of the component.

```html
<DummyComponent componentId="DummyComponent"/>
```

### Nesting timelines
The best part about components is that you can re-use them. This also applies to the timelines that you created for a component. When creating a transition component that contains another transition component you can add the subTimeline to your main timeline. You do this by refering to the `componentId`

```js
protected setupTransitionOutTimeline(): void {
	this.transitionOutTimeline.add(this.getSubTimeline('DummyComponent'));
}
```
**Note:** When you inject a timeline into another timeline you can no longer use the transitionIn/transitionOut outside of this timeline. For example when you want to transitionOut a component by triggering the transitionOut method but the timeline is also part of the parent component timeline this will not work.

### Page transitions
Since pages are components as well we can also use this transition functionality to apply fancy animations on pages. To make this possible we have the FlowManager. The FlowManager handles the flow between two pages. The code uses the [javascript hook of the transition component](https://vuejs.org/v2/guide/transitions.html#JavaScript-Hooks). Make sure to update the `App.vue` and the `App.js` file to use the FlowManager. After you've done that make sure you set the componentId on the route object, you can find this file in the `routes.js`

#### App.vue
```html
...
<transition @leave="onLeave" v-bind:css="false">
	<router-view></router-view>
</transition>
...
```

#### App.js
```js
export default {
	name: 'App',
	methods: {
		onLeave(element, done) {
			FlowManager.transitionOut.then(done);
		},
	},
};
```

#### Routes.js
```js
import HomePage from 'page/HomePage';
import Pages from 'data/enum/Pages';
import PageNames from 'data/enum/PageNames';

export default [
	{
		path: Pages.HOME,
		component: HomePage,
		name: PageNames.HOME,
		props: { componentId: PageNames.HOME },
	},
];
```

### Access a child component
Sometimes you want to manually trigger a transitionIn/transitionOut on a component without adding it to the main timeline. To do this you need a reference to the child component. To get a child component reference you can call the method `getChildComponent` providing the component id you provided while registering the component

```js
...
this.dummyComponent = this.getChildComponent('DummyComponent');
...

```

## Documentation
View the [generated documentation](http://rawgit.com/larsvanbraam/vue-transition-component/master/docs/).

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

- **/dist/vue-transition-component.js**: bundled with webpack, can be loaded from
	a script tag, available as `window.SengBoilerplate`
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
