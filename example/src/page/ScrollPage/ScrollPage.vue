<script src="./ScrollPage.js">
</script>

<template>
  <div class="scroll-page">
    <DummyScrollComponentA
      @isReady="handleScrollComponentReady"
      ref="ref1"
    />

    <DummyScrollComponentA
      @isReady="handleScrollComponentReady"
      ref="ref2"
    />

    <DummyScrollComponentA
      @isReady="handleScrollComponentReady"
      ref="ref3"
    />

    <DummyScrollComponentA
      @isReady="handleScrollComponentReady"
      ref="ref4"
    />

    <DummyScrollComponentA
      @isReady="handleScrollComponentReady"
      ref="ref5"
    />

    <DummyScrollComponentA
      @isReady="handleScrollComponentReady"
      ref="ref6"
    />
  </div>
</template>
