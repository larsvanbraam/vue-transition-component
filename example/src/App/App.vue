<script src="./App.js">
</script>

<template>
  <div class="app">

    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" @click="handleToggleMenu">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link :to="{name: 'home'}" class="navbar-brand">vue-transition-component</router-link>
        </div>

        <div :class="['collapse', 'navbar-collapse', {'collapse in': mobileMenuActive}]" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li :class="[{'active': pageName === 'home'}]">
              <router-link :to="{name: 'home'}">Home</router-link>
            </li>
            <li :class="[{'active': pageName === 'scroll'}]">
              <router-link :to="{name: 'scroll'}">Scroll</router-link>
            </li>
            <li :class="[{'active': pageName === 'code'}]">
              <router-link :to="{name: 'code'}">Code</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div
      ref="container"
      class="container">
      <transition @leave="onLeave" v-bind:css="false">
        <router-view></router-view>
      </transition>
    </div>

  </div>
</template>
