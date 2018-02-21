import isEqual from 'lodash/isEqual';
import filter from 'lodash/filter';

const IS_READY = 'isReady';

export default {
  name: 'AbstractRegistrableComponent',
  data() {
    return {
      $_registrableComponents: [],
    };
  },
  beforeCreate() {
    // This is used to detect if a component is registrable
    this.$_isRegistrable = true;
    // We need a component id
    this.$_componentId = this.$vnode.data.ref || this.$vnode.componentOptions.Ctor.options.name;
    this.$_registeredComponents = [];
    this.$_newRegisteredComponents = [];
    this.$_allComponentsReady = new Promise(resolve => {
      this.$_allComponentsReadyResolveMethod = resolve;
    });
  },
  methods: {
    isReady() {
      // If you want to you can listen to the isReady event
      this.$emit(IS_READY, this);
      // Notify the parent about being ready
      if (this.$parent && this.$parent.$_componentReady) {
        this.$parent.$_componentReady(this);
      }
    },
    handleAllComponentsReady() {},
    updateRegistrableComponents(callback) {
      // Store the components before change
      const beforeChange = this.$_registrableComponents.map(child => child._uid);
      // Reset the array
      this.$_registeredComponents = [];
      // Create a new promise for notify'ing about the change
      this.$_asyncComponentsReady = new Promise(resolve => {
        this.$_allComponentsReadyResolveMethod = resolve;
      });
      // Promised is used for doing async code in the component
      new Promise(resolve => callback(resolve)).then(() => {
        // Wait for the next tick
        this.$nextTick(() => {
          // Update the list of registrable components
          this.$_updateRegistrableComponents();
          // Find the new components after the change
          const afterChange = this.$_registrableComponents.map(child => child._uid);
          // Store the id's of the new components
          this.$_newRegisteredComponents = afterChange.filter(
            child => beforeChange.indexOf(child) === -1,
          );
          // Restore the components that were not modified
          this.$_registeredComponents = afterChange.filter(
            child => beforeChange.indexOf(child) > -1,
          );
          // There might be no change so trigger the resolve method right away!
          if (
            isEqual(beforeChange, afterChange) ||
            (this.$_newRegisteredComponents.length === 0 &&
              afterChange.length < beforeChange.length)
          ) {
            this.$_allComponentsReadyResolveMethod(this.$_newRegisteredComponents);
          }
        });
      });

      // Return the promise
      return this.$_asyncComponentsReady;
    },
    $_componentReady(component) {
      // Store the component id, so we can check if all are loaded
      this.$_registeredComponents.push(component._uid);
      // Check if we reached the total amount of transition components
      if (
        this.$_registrableComponents.length === this.$_registeredComponents.length &&
        this.$_allComponentsReadyResolveMethod
      ) {
        this.$_allComponentsReadyResolveMethod(
          filter(this.$refs, child => this.$_newRegisteredComponents.indexOf(child._uid) > -1),
        );
        this.$_newRegisteredComponents = [];
        this.$_allComponentsReadyResolveMethod = null;
      }
    },
    $_checkComponentsReady() {
      if (this.$_registrableComponents.length === 0) {
        this.$_allComponentsReadyResolveMethod();
      }
    },
    $_updateRegistrableComponents() {
      this.$_registrableComponents = filter(this.$refs, child => child.$_isRegistrable);
    },
  },
  mounted() {
    // Update the array of registrable components
    this.$_updateRegistrableComponents();
    // On init everything is new
    this.$_newRegisteredComponents = this.$_registrableComponents.map(child => child._uid);
    // Wait for all components to be ready
    this.$_allComponentsReady
      .then(() => this.handleAllComponentsReady())
      // Add a timeout to allow error throwing in the promise chain!
      .catch(result => {
        /* istanbul ignore next */
        setTimeout(() => {
          throw result;
        });
      });
    // We wait for the next tick otherwise the $children might not be set when you use a v-for loop
    this.$nextTick(() => this.$_checkComponentsReady());
  },
  beforeDestroy() {
    this.$_isRegistrable = null;

    if (this.$_registeredComponents) {
      this.$_registeredComponents.length = 0;
      this.$_registeredComponents = null;
    }

    if (this.$_newRegisteredComponents) {
      this.$_newRegisteredComponents.length = 0;
      this.$_newRegisteredComponents = null;
    }
  },
};
