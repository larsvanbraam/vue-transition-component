import { Promise } from 'es6-promise';
import * as find from 'array.prototype.find';
import ComponentType from '../enum/ComponentType';

export const COMPONENT_ID = 'componentId';

export default {
	name: 'AbstractRegistrableComponent',
	props: [COMPONENT_ID],
	computed: {
		components() {
			return this.$children.filter(childComponent => childComponent[COMPONENT_ID] !== undefined);
		},
	},
	beforeCreate() {
		this.componentType = ComponentType.REGISTRABLE_COMPONENT
		this.registeredComponents = [];
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
			if (this.$parent) {
				this.$parent['componentReady'](this);
			}
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
			const child = find(this.$children, child => child[COMPONENT_ID] === componentId);

			if (componentType !== void 0) {
				if (child.componentType === componentType) {
					return child;
				} else {
					throw new Error('Requested component is not of type: ' + ComponentType[componentType])
				}
			} else if (child.componentType !== void 0) {
				return child;
			} else {
				throw new Error('Requested component is not of type: ' + ComponentType[ComponentType.REGISTRABLE_COMPONENT])
			}

		},
		/**
		 * @public
		 * @method checkComponentsReady
		 * @description This method checks if all components are loaded on init, overwrite if you need multiple checks!
		 * @param component
		 * @returns {void}
		 */
		checkComponentsReady() {
			if (this.components.length === 0) {
				this.allComponentsReadyResolveMethod();
			}
		},
		/**
		 * @public
		 * @method componentReady
		 * @description This method is called by the child component so we can keep track of components that are loaded.
		 * @param component
		 * @returns {void}
		 */
		componentReady(component) {
			// Store the reference
			this.registeredComponents.push(component);
			// Check if we reached the total amount of transition components
			if (this.components.length === this.registeredComponents.length) {
				this.allComponentsReadyResolveMethod();
			}
		},
		/**
		 * @public
		 * @method handleAllComponentsReady
		 * @description When all the transition components within this component are loaded this method will be
		 * triggered. This is usually the point where the transition controller is setup.
		 * @returns {void}
		 */
		handleAllComponentsReady() {},
	},
	mounted() {
		// We wait for the next tick otherwise the $children might not be set when you use a v-for loop
		this.$nextTick(() => {
			// Add a set timeout to break out of the promise chain and allow errors to be thrown!
			this.allComponentsReady
				.then(setTimeout(this.handleAllComponentsReady.bind(this)));
			// Check for components initially, there might be none!
			this.checkComponentsReady();
		});
	},
	beforeDestroy() {
		if (this.registeredComponents) {
			this.registeredComponents.length = 0;
			this.registeredComponents = null;
		}
	},
};
