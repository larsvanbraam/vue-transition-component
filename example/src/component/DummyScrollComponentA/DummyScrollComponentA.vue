<script src="./DummyScrollComponentA.js"></script>

<template>
  <section
    class="dummy-scroll-component-a">
      <span
        ref="background"
        class="dummy-foo-bg abs-fill">
        <div
          :style="{
            width: `${progress * 100}%`,
          }"
          ref="percentage" class="progress"/>
      </span>

    <ul class="specs">
      <li>progress: {{`${Math.round(progress * 100)}%`}}</li>
      <li>scroll-direction: {{direction}}</li>
      <li>in-view: {{inView}}</li>
    </ul>

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
