<style src="./App.scss" module lang="scss"></style>
<script src="./App.js"></script>

<template>
  <div>
    <transition
      :css="false"
      @leave="onLeave"
    >
      <router-view />
    </transition>
  </div>
</template>
