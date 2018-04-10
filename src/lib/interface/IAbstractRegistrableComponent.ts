import { Vue } from 'vue/types/vue';

export interface IAbstractRegistrableComponent extends Vue {
  /**
   * @public
   * @property componentId
   * @description Internal id for the component
   */
  componentId: string;
  /**
   * @public
   * @property isRegistrable
   * @description Flag used to determine if a component is registrable
   */
  isRegistrable: boolean;
  /**
   * @public
   * @property registeredComponents
   * @description Array containing all the registered components
   */
  registeredComponents: Array<IAbstractRegistrableComponent>;
  /**
   * @public
   * @property newRegisteredComponents
   * @description Array of new components that are registered
   */
  newRegisteredComponents: Array<IAbstractRegistrableComponent>;
  /**
   * @public
   * @property allComponentsReady
   * @description The promise that is used to figure out if all components are ready
   */
  allComponentsReady: Promise<Array<IAbstractRegistrableComponent>>;
  /**
   * @public
   * @property registrableComponents
   * @description Array of all components that are registrable
   */
  registrableComponents: Array<IAbstractRegistrableComponent>;

  /**
   * @public
   * @method isReady
   * @description The init method should be called when the component is fully ready,
   * this is usually when it's mounted but it could require more async data
   * @returns {void}
   */
  isReady(): void;

  /**
   * @public
   * @method handleAllComponentsReady
   * @description When all the transition components within this component are loaded this method will be
   * triggered. This is usually the point where the transition controller is setup.
   * @returns {void}
   */
  handleAllComponentsReady(): void;

  /**
   * @public
   * @method updateRegistrableComponents
   * @param callback
   * @description Method that watches for async component changes, this means it will create a new promise
   * that will be resolved when the "new" children are ready
   * @returns
   */
  updateRegistrableComponents(callback: (resolve: () => void) => void): Promise<void>;

  /**
   * @private
   * @method componentReady
   * @description This method is called by the child component so we can keep track of components that are loaded.
   * @param component
   * @returns {void}
   */
  componentReady(component: IAbstractRegistrableComponent): void;

  /**
   * @private
   * @method checkComponentsReady
   * @description This method checks if all components are loaded on init, overwrite if you need multiple checks!
   * @param component
   * @returns {void}
   */
  checkComponentsReady(component: IAbstractRegistrableComponent): void;

  /**
   * @private
   * @method setRegistrableComponents
   * @description Update the array of registrableComponents
   */
  setRegistrableComponents(): void;
}
