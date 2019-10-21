# Adding a pre-loader
Adding a pre-loader is something you might do a lot of times. Adding one to a vue project is really easy. In this example we will assume you have the seng-generator all set up. If not check out the section about creating a component first!

## Create the pre-loader component
To start you should create a transition component so open up the terminal run the following shorthand to generate our pre-loader component.

**Note**: *Make sure you create a transition in timeline so we can show/hide it by calling transitionIn/transitionOut.*

```bash
$ sg transition-component pre-loader
```

## Create an application store
My projects usually contain some global settings, for example is the audio muted, is the pre-loader complete, what is the global device state etc. So to achieve this we will use the seng-generator again but this time to create a store, of course you can choose any name you want but i'll use application for the example.

```bash
$ sg store application
```

After creating the new store it's time to add it to the project so open up the `src/store/modules.js` and add it.


```javascript
import application from './module/application';

export default {
  application,
};
```

After the store has been added it's time to add a state to the store, this give us the option to access it anywhere. 

```javascript
export const SET_PRELOAD = 'setPreload';

export default {
  namespaced: true,
  state: {
    preloadComplete: false,
  },
  getters: {},
  mutations: {
    [SET_PRELOAD]: (state, payload) => {
      state.preloadComplete = payload;
    },
  },
  actions: {},
};
```

Make sure you also update the index.js file in the `module/application` folder so that we can easily access the namespaced mutation.

```javascript
import application, { SET_PRELOAD } from './application';

export const ApplicationNamespace = 'application';

export const ApplicationMutationTypes = {
  SET_PRELOAD: `${ApplicationNamespace}/${SET_PRELOAD}`,
};

export default application;
```


## Updating the App component
When the store has been created it's time to update the main app. First things first is to open up the `App.js` file. Here you add the preload state, add the mutation and the pre-loader component.

```javascript
import { mapMutations, mapState } from 'vuex';
import PreLoader from '../component/PreLoader';
import { ApplicationNamespace, ApplicationMutationTypes } from '../store/module/application';

// @vue/component
export default {
  name: 'App',
  components: {
    PreLoader,
  },
  computed: {
    ...mapState(ApplicationNamespace, ['preloadComplete']),
  },
  methods: {
    ...mapMutations({
      setPreloadComplete: ApplicationMutationTypes.SET_PRELOAD,
    }),
  },
};
```

After this we will update the `App.vue` file to include the preloadComplete flag. This will make sure the vue-router will not render the landing routes until the preloadComplete flag has been set to true.

```html
<template>
  <div>
    <transition @leave="onLeave">
      <router-view v-if="preloadComplete"/>
    </transition>
    <PreLoader ref="preLoader"/>
  </div>
</template>
```

## Adding some pre-loading logic
Preloading assets is usually something you want to do to make sure the user does not have to wait until everything is loaded. So I created a node module that does some asset loading for you, you can check it out on GitHub > [https://github.com/larsvanbraam/task-loader](https://github.com/larsvanbraam/task-loader)

I will add a super simple example on preloading some assets for the sake of this example. If you want to see all the options available in the task loader check out GitHub.

```javascript
import { mapMutations, mapState } from 'vuex';
import TaskLoader, { LoadImageTask } from 'task-loader';
import { ApplicationNamespace, ApplicationMutationTypes } from '../store/module/application';

// @vue/component
export default {
  name: 'App',
  computed: {
    ...mapState(ApplicationNamespace, ['preloadComplete']),
  },
  methods: {
    ...mapMutations({
      setPreloadComplete: ApplicationMutationTypes.SET_PRELOAD,
    }),
    handleAllComponentsReady() {
      const { preLoader } = this.$refs;
      // Create the task-loader instance
      this.taskLoader = new TaskLoader();
      // Show the pre-loader
      preLoader
        .transitionIn()
        // Load the assets
        .then(() => this.preloadAssets())
        // Hide the pre-loader
        .then(() => preLoader.transitionOut())
        // This will enable the router-view
        .then(() => {
          this.setPreloadComplete(true);
        });
    },
    preloadAssets() {
      return this.taskLoader.loadTasks([
        new LoadImageTask({
          assets: ['path/to/image-1.jpg', 'path/to/image-2.jpg'],
        }),
      ]);
    },
  },
};
```



 
