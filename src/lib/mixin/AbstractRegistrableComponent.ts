import { Promise } from 'es6-promise';
import * as find from 'array.prototype.find';
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
	computed: {
		components() {
			return this.$children.filter(childComponent => childComponent[COMPONENT_ID] !== undefined);
		},
	},
	beforeCreate() {
		this.componentType = ComponentType.REGISTRABLE_COMPONENT;
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
			const child = find(this.$children, child => child[COMPONENT_ID] === componentId);
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
			const child = find(this.$children, child => child[COMPONENT_ID] === componentId);

			if (child) {
				if (componentType !== void 0) {
					if (child.componentType === componentType) {
						return child;
					} else {
						throw new Error('Requested component is not of type: ' + ComponentType[componentType]);
					}
				} else if (child.componentType !== void 0) {
					return child;
				}
			}

			throw new Error(`Requested component [${componentId}] is not found within [${this.componentId}]`);
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
		this.allComponentsReady
			.then(() => this.handleAllComponentsReady())
			.catch(result => setTimeout(() => {
				// Add a timeout to allow error throwing in the promise chain!
				throw result;
			}));

		// We wait for the next tick otherwise the $children might not be set when you use a v-for loop
		this.$nextTick(this.checkComponentsReady.bind(this));
	},
	beforeDestroy() {
		this.componentType = null;
		if (this.registeredComponents) {
			this.registeredComponents.length = 0;
			this.registeredComponents = null;
		}
	},
};
