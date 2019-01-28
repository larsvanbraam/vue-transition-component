# Child page transitioning
Having child pages in a page is not something that's very uncommon. You do want to have transitions for all your sub pages as well though to achieve this you have to modify the page that you would like to have the children. 

## Setting up the route
Before we can make this work you will need to update the configuration for the vue router to allow children. In the Vue Skeleton this can be done in the `routes.js`. In our example we will add a page called ChildPage.

### Routes.js

```javascript
...
  {
    path: '/dummy,
    component: DummyPage,
    name: 'dummy',
    children: [
      {
        path: '/dummy/child',
        component: ChildPage,
        name: 'child',
      }
    ]
  },
...
```

### DummyPage.vue
Open up the main vue file for your DummyPage and add a transition section in there somewhere between the opening and closing div.

```html
...
<transition @leave="onLeave">
	<router-view></router-view>
</transition>
...
```

### DummyPage.js
After this you will have to open up the ChildPage.js file that is linked to the component. Here you have to add the onLeave method that will trigger the FlowManager.

```javascript
import { FlowManager, AbstractPageTransitionComponent } from 'vue-transition-component';

export default {
  name: 'DummyPage',
  extends: AbstractPageTransitionComponent,
  methods: {
    onLeave(element, done) {
      FlowManager.transitionOut.then(() => FlowManager.done()).then(done);
    },
  },
};
```

**Note**: *You can apply this method to go as deep as you want to go!*


