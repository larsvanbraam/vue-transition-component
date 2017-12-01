import { Promise } from 'es6-promise';
import { find } from 'lodash';
import ComponentType from '../enum/ComponentType';

const IS_READY = 'isReady';
export const COMPONENT_ID = 'componentId';

export default {
	name: 'AbstractRegistrableComponent',
	props: {
		[COMPONENT_ID]: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			registrableComponents: [],
		};
	},
	beforeCreate() {
		this.componentType = ComponentType.REGISTRABLE_COMPONENT;
		this.registeredComponents = [];
		this.newRegisteredComponents = [];
		this.allComponentsReady = new Promise((resolve) => {
			this.allComponentsReadyResolveMethod = resolve;
		});
	},
	methods: {
		/**
		 * @public
		 * @method isReady
		 * @description The init method should be called when the component is full y ready,
		 * this is usually when it's mounted but it could require more async data
		 * @returns {void}
		 */
		isReady() {
			this.$emit(IS_READY, this); // If you want to you can listen to the isReady event

			if (this.$parent && this.$parent['componentReady']) {
				this.$parent['componentReady'](this);
			}
		},
		/**
		 * @public
		 * @method hasChild
		 * @param componentId,
		 * @param componentType
		 * @returns boolean
		 */
		hasChild(componentId, componentType) {
			// Find the child component based on the componentId
			const child = <any>find(
				this.$children, child => child[COMPONENT_ID] === componentId,
			);
			// Check if if the child exists and/or if the type is correct
			return child !== void 0 && (componentType === void 0 || child.componentType === componentType);
		},
		/**
		 * @public
		 * @method getChild
		 * @description Get a child component reference
		 * @param {string} componentId
		 * @param { ComponentType } componentType
		 * @returns {AbstractRegistrableComponent} childComponent
		 */
		getChild(componentId, componentType) {
			// Find the child component based on the componentId
			const child = <any>find(
				this.$children, child => child[COMPONENT_ID] === componentId,
			);

			if (child) {
				if (componentType !== void 0) {
					if (child.componentType === componentType) {
						return child;
					}
					throw new Error('Requested component is not of type: ' + ComponentType[componentType]);
				} else {
					return child;
				}
			}

			throw new Error(`Requested component [${componentId}] is not found within [${this.componentId}]`);
		},
		/**
		 * @public
		 * @method componentReady
		 * @description This method is called by the child component so we can keep track of components that are loaded.
		 * @param component
		 * @returns {void}
		 */
		componentReady(component) {
			// Store the component id, so we can check if all are loaded
			this.registeredComponents.push(component._uid);
			// Check if we reached the total amount of transition components
			if (
				this.registrableComponents.length === this.registeredComponents.length &&
				this.allComponentsReadyResolveMethod
			) {
				this.allComponentsReadyResolveMethod(
					this.$children.filter(child => this.newRegisteredComponents.indexOf(child._uid) > -1),
				);
				this.newRegisteredComponents = [];
				this.allComponentsReadyResolveMethod = null;
			}
		},
		/**
		 * @public
		 * @method handleAllComponentsReady
		 * @description When all the transition components within this component are loaded this method will be
		 * triggered. This is usually the point where the transition controller is setup.
		 * @returns {void}
		 */
		handleAllComponentsReady() {
		},
		/**
		 * @public
		 * @method watchAsyncComponentChange
		 * @description Method that watches for async component changes, this means it will create a new promise
		 * that will be resolved when the "new" children are ready
		 * @returns
		 */
		watchAsyncComponentsChange() {
			// Store the components before change
			const beforeChange = this.registrableComponents.map(child => child._uid);
			// Reset the array
			this.registeredComponents = [];
			// Create a new promise for notify'ing about the change
			this.asyncComponentsReady = new Promise((resolve) => {
				this.allComponentsReadyResolveMethod = resolve;
			});

			// Return a new method that will mark the DOM as "modified"
			return () => {
				// Wait for the next tick
				this.$nextTick(() => {
					// Update the list of registrable components
					this.$_updateRegistrableComponents();
					// Find the new components after the change
					const afterChange = this.registrableComponents.map(child => child._uid);
					// Store the id's of the new components
					this.newRegisteredComponents = afterChange.filter(child => beforeChange.indexOf(child) === -1);
					// Restore the components that were not modified
					this.registeredComponents = afterChange.filter(child => beforeChange.indexOf(child) > -1);
					// There might be no change so trigger the resolve method right away!
					if (
						beforeChange === afterChange ||
						(this.newRegisteredComponents.length === 0 && afterChange.length < beforeChange.length)
					) {
						this.allComponentsReadyResolveMethod(this.newRegisteredComponents);
					}
				});

				// Return the promise
				return this.asyncComponentsReady;
			};
		},
		/**
		 * @private
		 * @method checkComponentsReady
		 * @description This method checks if all components are loaded on init, overwrite if you need multiple checks!
		 * @param component
		 * @returns {void}
		 */
		$_checkComponentsReady() {
			if (this.registrableComponents.length === 0) {
				this.allComponentsReadyResolveMethod();
			}
		},
		/**
		 * @private
		 * @method update RegistrableComponents
		 * @description Update the array of registrableComponents
		 */
		$_updateRegistrableComponents() {
			this.registrableComponents = this.$children.filter(childComponent => childComponent[COMPONENT_ID] !== undefined);
		},
	},
	mounted() {
		this.$_updateRegistrableComponents();
		// On init everything is new
		this.newRegisteredComponents = this.registrableComponents.map(child => child._uid);

		this.allComponentsReady
		.then(() => this.handleAllComponentsReady())
		.catch(result => setTimeout(() => {
			// Add a timeout to allow error throwing in the promise chain!
			throw result;
		}));

		// We wait for the next tick otherwise the $children might not be set when you use a v-for loop
		this.$nextTick(() => this.$_checkComponentsReady());
	},
	beforeDestroy() {
		this.componentType = null;
		if (this.registeredComponents) {
			this.registeredComponents.length = 0;
			this.registeredComponents = null;
		}
	},
};
