# Install the plugin
Install the plugin in your App.js with the configuration that you want.
For all the possible config options and more documentation please visit the [scroll-tracker-component-manager docs](https://github.com/riccoarntz/scroll-tracker-component-manager/wiki)

```javascript
import { ScrollTrackerPlugin } from 'vue-transition-component';

// @vue/component
export default {
  name: 'App',
  extends: AbstractRegistrableComponent,
  mounted() {
    Vue.use(ScrollTrackerPlugin, {
      config: {
        // When this is enabled you should set the container(body) to a fixed height(100%).
        enableSmoothScroll: false,
        // When this is set to a container other than the window, you need to set
        // the html/body tag to a fixed height(100%) and overflow: hidden.
        // And set the container to a fixed height(100%) and overflow: auto.
        container: this.$refs.container,
        inViewProgressEnabled: false,
      },
    });
  },
  methods: {
    onLeave(element, done) {
      FlowManager.transitionOut.then(() => FlowManager.done()).then(done);
    },
  },
}
```

## Scaffold a scroll-page
``AbstractScrollComponent's`` are only added to the ``scroll-tracker-component-manager`` if a page is extended from the
``AbstractPageScrollComponent`` mixin, you can scaffold this type of page using the ``seng-generator``

#### Scroll Page Mixin
```
import { AbstractPageTransitionComponent, getEventBus, REMOVE_COMPONENTS }  from 'vue-transition-component';

export default {
  name: 'AbstractPageScrollComponent',
  extends: AbstractPageTransitionComponent,
  beforeDestroy() {
    // When we leave the page, this is how we are removing the items from the scroll-tracker-component manager.
    getEventBus().$emit(REMOVE_COMPONENTS, this.scrollComponents);
  },
  beforeCreate() {
    this.scrollComponents = {};
  },
  methods: {
    onBeforeRouteUpdate(to, from) {
      // In case we are staying on the same page but with different component/content we are removing the items from the
      // scroll-tracker-component manager
      if (to.path !== from.path) {
        getEventBus().$emit(REMOVE_COMPONENTS, this.scrollComponents);
        this.scrollComponents = {};
      }
    },
    handleScrollComponentReady(component) {
      // This is where we keep track of the scroll-components that are added to the
      // scroll-tracker-component-manager as soon as all component are ready in the page.
      if (component.addToScrollTracker) {
        this.scrollComponents[component.componentId] = component;
      }
    },
  },
};
```

## Adding a scroll component
Make sure your component is extended from the mixin ``AbstractScrollComponent``. This can be done via the
``seng-generator``.


#### Scroll Component Mixin
```
import VueTypes from 'vue-types';
import { AbstractTransitionComponent }  from 'vue-transition-component';

export default {
  name: 'AbstractScrollComponent',
  extends: AbstractTransitionComponent,
  props: {
    addToScrollTracker: VueTypes.bool.def(true),
    transitionInThreshold: VueTypes.number.def(0),
    inViewProgressThreshold: VueTypes.number.def(0),
  },
  data() {
    return {
      inView: false,
    };
  },
  created() {
    this.currentViewProgress = 0;
    this.hasEntered = false;
  },
  methods: {
    // This is called when your component is within the view
    enterView() {
      this.inView = true;
      return this.transitionIn().then(() => this.startLoopingAnimation());
    },
    // This is called when you component is out of the view.
    leaveView() {
      this.inView = false;
      this.stopLoopingAnimation();
    },
    // This is called when your component is already passed the view, but you scroll-bar started already passed this
    point.
    beyondView() {
      if (!this.hasEntered) {
        this.transitionIn();
      }
    },
    // Depending on wheter this is enabled in your config, this will pass you a progress from ``0 to 1``.
    inViewProgress(progress) {},
  },
};
```

```html
...
<template>
  <div class="scroll-page">
    <DummyScrollComponentA
      // when the component is ready we can add it to the scroll-tracker-component-manager via this method.
      @isReady="handleScrollComponentReady"
      ref="ref1"
    />

    <DummyScrollComponentA
      @isReady="handleScrollComponentReady"
      ref="ref2"
    />

    <DummyScrollComponentA
      @isReady="handleScrollComponentReady"
      ref="ref3"
    />
  </div>
</template>

...
```
If you are repeating the same component more times, make sure to add a unique ref for each component, we are using this
ref to add/remove the component from/to the scroll-tracker-component-manager plugin.


## Manually add/remove a component
You can also manually add/remove components to the scroll-tracker-manager by calling emitting the following events.

```
import {  getEventBus, REMOVE_COMPONENTS, ADD_COMPONENTS }  from 'vue-transition-component';

getEventBus().$emit(ADD_COMPONENTS, yourScrollComponent);
getEventBus().$emit(REMOVE_COMPONENTS, yourScrollComponent);
```
