[![Travis](https://img.shields.io/travis/larsvanbraam/vue-transition-component.svg?maxAge=2592000)](https://travis-ci.org/larsvanbraam/vue-transition-component)
[![Code Climate](https://img.shields.io/codeclimate/github/larsvanbraam/vue-transition-component.svg?maxAge=2592000)](https://codeclimate.com/github/larsvanbraam/vue-transition-component)
[![npm](https://img.shields.io/npm/dm/vue-transition-component.svg?maxAge=2592000)](https://www.npmjs.com/package/vue-transition-component)
[![GitHub issues](https://img.shields.io/github/issues/larsvanbraam/vue-transition-component.svg?style=flat-square)](https://github.com/larsvanbraam/vue-transition-component/issues)

<p align="center">
    <img src="vue-transition-component.larsvanbraam.nl/vue-transition-component-1024.png?v=2" alt="vue-transition-component" width="512"/>
</p>

Provides GreenSock transition functionality to vue.js components.

## Table of contents

1. [Installation](#installation)
2. [Provided mixins](#provided-mixins)
	1. [AbstractRegistrableComponent](#abstractregistrablecomponent)
	2. [AbstractTransitionComponent](#abstracttransitioncomponent)
	3. [AbstractPageComponent](#abstractpagecomponent)
3. [Provided utils ](#provided-utils)
	1. [AbstractTransitionController](#abstracttransitioncontroller)
	2. [FlowManager](#flowmanager)
4. [Examples](#examples)
	1. [Creating a TransitionComponent](#creating-a-transitioncomponent)
	2. [Rendering the component](#rendering-the-component)
	3. [Nesting timelines](#nesting-timelines)
	4. [Access a child component](#access-a-child-component)
	5. [Listen to transition events](#listen-to-transition-events)
	6. [Page transitions](#page-transitions)
		1. [App.vue](#app-vue)
		2. [App.js](#app-js)
		3. [Routes.js](#routes-js)
	7. [Hijacking flows](#hijacking-flows)
		1. [App level hijacking](#app-level-hijacking)
		2. [Page level hijacking](#page-level-hijacking)
5. [Webstorm configuration](https://github.com/larsvanbraam/vue-transition-component/wiki/Webstorm-configuration)
	1. [Live templates](https://github.com/larsvanbraam/vue-transition-component/wiki/Webstorm-configuration#live-templates)
6. [Building](#building)
7. [Authors](#authors)
8. [Contribute](#contribute)
9. [License](#license)

## Installation
### yarn / npm

```sh
yarn add vue-transition-component
```

```sh
npm i -S vue-transition-component
```

## Provided mixins
The extra functionality is provided through three mixins. 

### AbstractRegistrableComponent
This is the core component that contains all of the logic for registring components and handling when they are 'ready'.

#### Methods
After extending this mixin a couple of methods are added to your component, you can see all of them in the [generated documentation](http://rawgit.com/larsvanbraam/vue-transition-component/master/docs/). See below for the most common ones!

##### getChild
- Description: *This method retrieves a child component within your component based on the componentId that's provided when registring it.*
- Parameters
	- `componentId` 
		- type: `string` 
		- required: *true* 
	- `componentType`
		- type: `ComponentType`
		- required: *false* 
		- description: *To avoid issues you should provide the type of component you are requesting*
- Returns 
	- `IAbstractRegistrableComponent | IAbstractTransitionComponent | IAbstractPageComponent`

##### hasChild
- Description: *This method checks if a child component exists*
- Parameters
	- `componentId`
		- type: `string`
		- required: *true*
	- `componentType`
		- type: `ComponentType`
		- required: *false*
		- description: *To avoid issues you should provide the type of component you are requesting*
- Returns
	- `boolean`

### AbstractTransitionComponent
This component extends the AbstractRegistrableCompponent and is the component that allows you to trigger transition in methods on your component. It also contains the TransitionController that contains the GreenSock timelines.

#### Methods
After extending this mixin a couple of methods are added to your component, you can see all of them in the [generated documentation](http://rawgit.com/larsvanbraam/vue-transition-component/master/docs/). See below for the most common ones!

##### transitionIn
- Description: This method allows you to trigger a transitionIn on your component.
- Parameters
	- `forceTransition`
		- type: `boolean` 
		- required: *false*
		- description: *If you trigger a transitionIn when the transitionOut is still running by default it will wait for the transitionOut to be complete, if you provide this flag it will force your new transiton.*
- Returns
	- `Promise<void>`

##### transitionOut
- Description: This method allows you to trigger a transitionOut on your component.
- Parameters
	- `forceTransition`
		- type: `boolean` 
		- required: *false* 
		- description: *If you trigger a transitionOut when the transitionIn is still running by default it will wait for the transitionIn to be complete, if you provide this flag it will force your new transiton.*
- Returns
	- `Promise<void>`

### AbstractPageComponent
This component extends the AbstractTransitionComponent and is the component that changes a default component into a page transition component. It contains information about the flow of the page. becides that it does not add extra functionality to your component!

## Provided utils
### AbstractTransitionController
The AbstractTransitionController is the base for all your transitions, It contains the timelines for transitioning in and out

#### Methods
Extending this class wil add a lot of functionality to your transitionController, you can see all of it in the [generated documentation](http://rawgit.com/larsvanbraam/vue-transition-component/master/docs/). See below for the most common ones!

##### getSubTimeline
- Description: This method retrieves a sub timeline from a child component. This is used for when you want to nest a timeline within another timeline. 
- Parameters
	- `componentId`
		- type: `string` 
		- required: *true*
		- description: *This is the id of the component that you used while registring it.*
	- `direction`
		- type: `string` 
		- required: *false*
		- description: *Components can have multiple timelines for in/out animations here you can specify what timeline you would like to get* 
- Returns
	- `Animation`
	
##### getSubTimelineDuration
- Description: This method retrieves the duration of a sub timeline.
- Parameters
	- `componentId`
		- type: `string` 
		- required: *true*
		- description: *This is the id of the component that you used while registring it.*
	- `direction`
		- type: `string` 
		- required: *false*
		- description: *Components can have multiple timelines for in/out animations here you can specify what timeline you would like to get* 
- Returns
	- `number`	

### FlowManager
The FlowManager allows you to control the flow between two pages. See the example about [page transitions](#page-transitions) for more information about this!

**For more detailed documentation please check the [generated documentation](http://rawgit.com/larsvanbraam/vue-transition-component/master/docs/)!**

## Examples
All examples below are based on the [vue-skeleton](https://github.com/hjeti/vue-skeleton) by [hjeti](https://github.com/hjeti/). 

#### Folder structure
    /components
    ├── [ComponentName]/
    │   └── index.js
    │   └── [ComponentName].vue    
    │   └── [ComponentName].js
    │   └── [ComponentName].scss
    │   └── [ComponentName]TransitionController.ts        
    └── ...
    
### Creating a TransitionComponent
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
7. `getChild`
8. `hasChild`

#### DummyComponentTransitionController.ts
This file will contain all the transitions for your page, you can add tweens to the [provided greensock timelines](https://greensock.com/docs/#/HTML5/GSAP/TimelineLite/). 

```js
import AbstractTransitionController from 'vue-transition-component';

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

To setup the transitionIn you could do the following:

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

#### index.js
The index.js file just imports the main javascript file so you can easily import it!

```js
import DummyComponent from './DummyComponent';

export default DummyComponent;
```

#### Seng-generator
Check out the latest version of the [seng-generator](https://github.com/mediamonks/seng-generator), it will generate components for you! I've added custom template files for the transition components. You can easily add the new template path to the .senggenerator file by first removing it from the root of your project and then run the following command: 

```sh
 sg init

```

**Template path:**

```
./template,./node_modules/vue-transition-component/template

```

**Destination path:**

```
.

```

### Rendering the component
Using transition components is the same as using any other component in Vue.js exept for the fact that you have to provide two extra props. The componentReady listener is the callback for when the component is ready and the componentId is the unique id of the component.

```html
<DummyComponent componentId="DummyComponent"/>
```

### Nesting timelines
The best part about components is that you can re-use them. This also applies to the timelines that you created for a component. When creating a transition component that contains another transition component you can add the subTimeline to your main timeline. You do this by refering to the `componentId`

```js
protected setupTransitionInTimeline(): void {
	this.transitionInTimeline.add(this.getSubTimeline('DummyComponent'));
}
```

### Access a child component
#### Method 1
Sometimes you want to manually trigger a transitionIn/transitionOut on a component without adding it to the main timeline. To do this you need a reference to the child component. To get a child component reference you can call the method `getChild` providing the `componentId`. You should also provide the type of component you are requesting, since not all components have the same functionality. For example when you would like to request a TransitionComponent:

```js
...
import { ComponentType } from 'vue-transition-component';
...
...
this.dummyComponent = this.getChild('DummyComponent', ComponentType.TRANSITION_COMPONENT);
this.dummyComponent.transitionIn();
...

```

There following component types are available: 

```js
...
import { ComponentType } from 'vue-transition-component';
...
...
this.dummyComponent1 = this.getChild('DummyComponent', ComponentType.REGISTRABLE_COMPONENT);
this.dummyComponent2 = this.getChild('DummyComponent', ComponentType.TRANSITION_COMPONENT);
this.dummyComponent3 = this.getChild('DummyComponent', ComponentType.PAGE_COMPONENT);
...

```

**Note:** Providing the component type is not mandatory. So for example when you only use transition components in your project you could leave it out, this is at your own risk and could cause issues if you start mixing TransitionComponents and RegistrableComponents.

```js
...
this.dummyComponent = this.getChild('DummyComponent');
...

```

#### Method 2
An alternative way of getting the child component reference as soon as it's ready is to add a event listener
(**@isReady**) to your component. Keep in mind that this event does not mean that all the components are ready. There
 is also no strict check to make sure you get the expected component. So use with caution!
```html
<DummyComponent componentId="DummyComponent" @isReady="handleIsReady" />
```
```js
...
methods: {
	handleIsReady: (component) => {
		// Do stuff with your component reference
	},
},
...

```

### Listen to transition events
The transition controller uses the [seng-event](https://www.npmjs.com/package/seng-event) module to dispatch events. The following events are dispatched:

- `TransitionInStart `
- `TransitionInComplete`
- `TransitionOutStart`
- `TransitionOutComplete`

You can listen to the by adding an event listener to the transitionController:

```js
...
import { TransitionEvent } from 'vue-transition-component';
...
...
handleAllComponentsReady() {
	this.transitionController = new DummyComponentTransition(this);
	this.transitionController.addEventListener(TransitionEvent.TRANSITION_IN_START, () => {
		console.log('transition in start');
	});
	this.transitionController.addEventListener(TransitionEvent.TRANSITION_IN_COMPLETE, () => {
		console.log('transition in complete');
	});
	this.transitionController.addEventListener(TransitionEvent.TRANSITION_OUT_START, () => {
		console.log('transition out start');
	});
	this.transitionController.addEventListener(TransitionEvent.TRANSITION_OUT_COMPLETE, () => {
		console.log('transition out complete');
	});
	this.isReady();
},
...
```

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
			FlowManager.transitionOut
				.then(() => FlowManager.done())
				.then(done);
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

### Hijacking flows
When you are working with page transitions you might want to hijack a flow before the transitionIn is executed, this could be usefull for when you want to create a global preloader or a page specific preloader. 

### App level hijacking
To hijack the entire site on `App.js` level you can use the hijack method from the FlowManager to hijack all page navigation. It will return a promise with one parameter that can be triggered to release the hijack.

```typescript
created() {
	FlowManager.hijackFlow()
		.then(release => {
			// Your awesome code which is triggered before the flow is released
			release();
		});
},
```

### Page level hijacking
To hijack a page transition on page level you can call the hijackTransitionIn method, this method will also return a promise with one parameter that can be triggered to release the hijack.

```typescript
...
created() {
	this.hijackTransitionIn()
		.then((release) => {
			// Add your awesome which is triggered before the transition in is called
			release();
		});
},
...	
```

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
