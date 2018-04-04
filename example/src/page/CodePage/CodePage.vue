<script src="./CodePage.js"></script>

<template>
  <div>
    <div class="wrapper">
      <div class="page-header">
        <h2>Using a transition component within your page</h2>
      </div>
      <DummyComponentA ref="infoBoxA"/>
      <DummyComponentB ref="infoBoxB"/>
      <DummyComponentC />
    </div>

    <div class="wrapper">
      <div class="page-header">
        <h2>Code example</h2>
      </div>
      <h4>CodePage.js</h4>
      <pre class="jsx">import { AbstractPageTransitionComponent } from 'vue-transition-component';
import CodepageTransitionController from './CodepageTransitionController';
import DummyComponentA from '../../component/DummyComponentA';
import DummyComponentB from '../../component/DummyComponentB';

export default {
  name: 'CodePage',
  extends: AbstractPageTransitionComponent,
  components: {
    DummyComponentA,
    DummyComponentB,
  },
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new CodepageTransitionController(this);
      this.isReady();
    },
  },
};
</pre>
    </div>
    <div class="wrapper">
      <h4>CodePage.vue</h4>
      <pre class="html">
&#60;div class="wrapper"&#62;
  &#60;div class="page-header"&#62;
    &#60;h2&#62Using a transition component within your page&#60;/h2&#62;
  &#60;/div&#62;
  &#60;DummyComponentA ref="infoBoxA"/&#62;
  &#60;DummyComponentB ref="infoBoxB"/&#62;
  &#60;DummyComponentC /&#62;
&#60;/div&#62</pre>
    </div>
    <div class="wrapper">
      <h4>CodePageTransitionController.ts</h4>
      <pre>import { TimelineLite, TimelineMax, Expo } from 'gsap';
import AbstractVueTransitionController from "../../../../src/lib/util/AbstractVueTransitionController";
import IAbstractTransitionComponent from "../../../../src/lib/interface/IAbstractTransitionComponent";

export default class CodepageTransitionController extends AbstractVueTransitionController {
  /**
   * @public
   * @method setupTransitionInTimeline
   * @param {gsap.TimelineLite | gsap.TimelineMax} timeline
   */
  public setupTransitionInTimeline(timeline: TimelineLite | TimelineMax): void {
    timeline.fromTo(
      this.parentController.$el,
      0.5,
      {
        autoAlpha: 0,
        scale: 0,
      },
      {
        autoAlpha: 1,
        scale: 1,
        ease: Expo.easeOut,
      },
    );
    // if a ref is provided you can use this to retrieve the subTimeline
    timeline.add(this.getSubTimeline('infoBoxA'))
    // You can also retrieve the subTimeline by providing a reference to the TransitionComponent
    timeline.add(this.getSubTimeline(&#60;IAbstractTransitionComponent&#62;this.parentController.$refs.infoBoxB))
    // If no ref is provided you can fetch the component by the ComponentName
    timeline.add(this.getSubTimeline('DummyComponentC'))
  }

  /**
   * @public
   * @method setupTransitionOutTimeline
   * @param {gsap.TimelineLite | gsap.TimelineMax} timeline
   */
  public setupTransitionOutTimeline(timeline: TimelineLite | TimelineMax): void {
    timeline.to(
      this.parentController.$el,
      0.5,
      {
        scale: 2,
        autoAlpha: 0,
        ease: Expo.easeIn,
      },
    );
  }
}
</pre>
    </div>
  </div>
</template>
