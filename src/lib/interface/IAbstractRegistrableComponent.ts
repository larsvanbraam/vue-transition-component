import { Vue } from 'vue/types/vue';

/**
 * The AbstractRegistrableComponent is the core component of the vue-transition-component. It's used for
 * registering components and making sure all the children are done before we start creating timelines.
 * Nested registrable components will let their parent know that they are ready.
 */
export interface IAbstractRegistrableComponent extends Vue {
  /**
   * The internal id of the component is automatically generated or linked to the ref that
   * is set in the parent component.
   *
   * @public
   */
  componentId: string;

  /**
   * Flag used to determine if a component is registrable
   *
   * @public
   */
  isRegistrable: boolean;

  /**
   * Array containing all the registered components
   *
   * @public
   */
  registeredComponents: Array<IAbstractRegistrableComponent>;

  /**
   * Array of new components that are registered
   *
   * @public
   */
  newRegisteredComponents: Array<IAbstractRegistrableComponent>;

  /**
   * The promise that is used to figure out if all components are ready
   *
   * @public
   */
  allComponentsReady: Promise<Array<IAbstractRegistrableComponent>>;

  /**
   * Array of all components that are registrable
   *
   * @public
   */
  registrableComponents: Array<IAbstractRegistrableComponent>;

  /**
   * The init method should be called when the component is fully ready,
   * this is usually when it's mounted but it could require more async data
   *
   * @public
   */
  isReady(): void;

  /**
   * When all the transition components within this component are loaded this method will be
   * triggered. This is usually the point where the transition controller is setup.
   *
   * @public
   */
  handleAllComponentsReady(): void;

  /**
   * Method that watches for async component changes, this means it will create a new promise
   * that will be resolved when the "new" children are ready
   *
   * @public
   * @param {(resolve: () => void) => void} callback The method that will be called so you can release the update method
   * @returns {Promise<Array<IAbstractRegistrableComponent>>} An array containing the newly registered components
   */
  updateRegistrableComponents(
    callback: (resolve: () => void) => void,
  ): Promise<Array<IAbstractRegistrableComponent>>;

  /**
   * This method is called by the child component so we can keep track of components that are loaded.
   *
   * @public
   * @param {IAbstractRegistrableComponent} component The reference to the component that is ready
   */
  componentReady(component: IAbstractRegistrableComponent): void;

  /**
   * This method checks if all components are loaded on init, overwrite if you need multiple checks!
   *
   * @public
   */
  checkComponentsReady(): void;

  /**
   * Update the array of registrableComponents
   *
   * @public
   */
  setRegistrableComponents(): void;
}
