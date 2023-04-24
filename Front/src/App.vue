<template>
	<div>
		<Main/>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import Main from './components/Main.vue';

	export default defineComponent({
		name: 'App',
		components: {
			Main
		}
	});
</script>

<style lang="scss">
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #000000;
		height: 100%;
	
		.ant-card-extra { // В компоненте эти стили почему-то не работали.
			display: flex;
			flex-direction: row;
		}
	}
</style>
