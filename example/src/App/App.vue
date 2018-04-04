<script src="./App.js"></script>

<template>
  <div>
    <h1>App.vue</h1>
    <transition @leave="onLeave" v-bind:css="false">
      <router-view></router-view>
    </transition>
  </div>
</template>
