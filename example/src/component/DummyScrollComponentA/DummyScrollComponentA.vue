<script src="./DummyScrollComponentA.js"></script>

<template>
  <section
    class="dummy-scroll-component-a">
      <span
        ref="background"
        class="dummy-foo-bg abs-fill">
        <div
          v-html="`${Math.round(progress * 100)}%`"
          :style="{
            width: `${progress * 100}%`,
          }"
          ref="percentage" class="progress"/>
      </span>

    <div
      ref="textContent"
      class="abs-center">
      <h1 class="heading-01">Scroll Transition</h1>

      <h2
        ref="loopingTitle"
        class="looping-animation-title heading-03">Looping Animation</h2>
      <div
        ref="loopingAnimation"
        class="looping-animation"></div>
    </div>
  </section>
</template>
