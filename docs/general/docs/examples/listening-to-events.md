# Listening to events
The [transition-controller](https://github.com/larsvanbraam/transition-controller) extends the [seng-event](https://github.com/mediamonks/seng-event) module so it can dispatch events, it will dispatch transition events for all states of your animation. 

## Example

```javascript
...
import { TransitionEvent } from 'vue-transition-component';
...

...
handleAllComponentsReady() {
  this.transitionController = new DummyComponentTransition(this);
  this.transitionController.addEventListener(TransitionEvent.TRANSITION_IN_START, () => {
    console.log('transition in start');
  });
  this.transitionController.addEventListener(TransitionEvent.TRANSITION_IN_COMPLETE, () => {
    console.log('transition in complete');
  });
  this.transitionController.addEventListener(TransitionEvent.TRANSITION_OUT_START, () => {
    console.log('transition out start');
  });
  this.transitionController.addEventListener(TransitionEvent.TRANSITION_OUT_COMPLETE, () => {
    console.log('transition out complete');
  });
  this.isReady();
},
...
```