<style src="./App.scss" module lang="scss"></style>
<script src="./App.js"></script>

<template>
	<div>
		<transition @leave="onLeave" v-bind:css="false">
			<router-view></router-view>
		</transition>
	</div>
</template>
