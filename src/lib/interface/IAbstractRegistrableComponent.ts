import { Vue } from 'vue/types/vue';
import { Promise } from 'es6-promise';
import IAbstractTransitionComponent from './IAbstractTransitionComponent';
import IAbstractPageTransitionComponent from './IAbstractPageTransitionComponent';
import ComponentType from '../enum/ComponentType';

interface IAbstractRegistrableComponent extends Vue {
	/**
	 * @property components
	 * @description All components inside this component
	 */
	components: Array<IAbstractRegistrableComponent>;
	/**
	 * @property registeredComponents
	 * @description Array of registered components
	 */
	registeredComponents: Array<string>;
	/**
	 * @property allComponentsReadyResolveMethod
	 * @description All components ready resolve method
	 */
	allComponentsReadyResolveMethod: () => void;
	/**
	 * @property componentType
	 * @description The type of the component
	 */
	componentType: ComponentType;
	/**
	 * @property componentId
	 * @description The unique id of the rendered component, this is used for fetching the reference if the same
	 * components appears multiple times
	 */
	componentId: string;
	/**
	 * @property allComponentsReady
	 * @description When all the transition components within this component are loaded this method will be
	 * triggered. This is usually the point where the transition controller is setup.
	 */
	allComponentsReady: Promise<void>;
	/**
	 * @public
	 * @method isReady
	 * @description The isReady method should be called when the component is fully ready,
	 * this is usually when it's children are ready but it could require more async data
	 */
	isReady(): void;
	/**
	 * @public
	 * @method hasChild
	 * @description Check to see if a component with a certain Id exists
	 * @param componentId The id of the desired child component
	 * @param componentType The type of the desired component
	 * @returns a boolean to check if a child exists
	 */
	hasChild(componentId: string, componentType?:ComponentType): boolean;
	/**
	 * @public
	 * @method getChild
	 * @description If you want to get a child component based on it's componentId
	 * @param componentId The id of the desired child component
	 * @param componentType The type of the desired component
	 * @returns A child component based on the componentId
	 */
	getChild(
		componentId: string,
		componentType?:ComponentType,
	): IAbstractPageTransitionComponent | IAbstractTransitionComponent | IAbstractRegistrableComponent;
	/**
	 * @public
	 * @method handleAllComponentsReady
	 * @description This method is triggered once when all the components are ready.
	 */
	handleAllComponentsReady(): void;
	/**
	 * @public
	 * @method updateRegistrableComponents
	 * @description Call this method when you want to load more components async and have a callback when they are ready
	 * @returns {Promise<Array<IAbstractRegistrableComponent>>}
	 */
	updateRegistrableComponents(callback:(release:() => void) => void):Promise<Array<IAbstractRegistrableComponent>>;
	/**
	 * @public
	 * @method $_componentReady
	 * @description This method is a callback for when the child component is ready.
	 * @param component The component reference that is marked as ready.
	 */
	$_componentReady(component: IAbstractRegistrableComponent): void;
	/**
	 * @private
	 * @method $_checkComponentsReady
	 * @description Method that is triggered to check if all components are ready
	 */
	$_checkComponentsReady(): void;
	/**
	 * @private
	 * @method $_updateRegistrableComponents
	 * @description Method that is triggered to check if all components are ready
	 */
	$_updateRegistrableComponents(): void;
}

export default IAbstractRegistrableComponent;
