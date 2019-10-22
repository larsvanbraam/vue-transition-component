<script src="./DummyScrollComponentA.js"></script>

<template>
  <div class="panel-large panel panel-info">
    <div class="panel-heading">
      <h3 class="panel-title">DummyComponentA</h3>
    </div>
    <div class="panel-body">
      <div ref="progress" class="progress" />

      <p
        class="percentage"
        ref="percentage"
        v-html="`${Math.round(progress * 100)}%`"
      />
    </div>
  </div>
</template>
