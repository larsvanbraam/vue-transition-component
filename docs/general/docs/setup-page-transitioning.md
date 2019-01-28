# Setup page transitioning
Since pages are components as well we can also use this transition functionality to apply fancy animations on pages. To make this possible we have the FlowManager. The FlowManager handles the flow between two pages. The code uses the [javascript hook of the transition component](https://vuejs.org/v2/guide/transitions.html#JavaScript-Hooks).

## App.vue
Modify the `src/App/App.vue` file so the router view is wrapped inside of a transition component this will 
make sure the transition out flows of pages are triggered.

```html
...
<transition @leave="onLeave">
	<router-view />
</transition>
...
```

## App.js
Modify the `src/App/App.js` file so the onLeave method is defined and triggers the FlowManager

```javascript
import { FlowManager, AbstractRegistrableComponent } from 'vue-transition-component';

// @vue/component
export default {
  name: 'App',
  extends: AbstractRegistrableComponent,
  methods: {
    onLeave(element, done) {
      FlowManager.transitionOut.then(() => FlowManager.done()).then(done);
    },
  },
};
```