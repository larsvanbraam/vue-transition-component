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
  </div>
</template>
