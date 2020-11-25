<template>
	<div class="container-nav">
		<div class="left" @click="back">返回</div>
		<div class="middle">标题</div>
		<div class="right">设置</div>
	</div>
</template>

<script>
	export default {
	  data() {
	    return {
	    };
	  },
	  async created() {

	  },
	  methods: {
	    back(){
				// console.log(1234)
	      this.$router.back();
	    }
	  },
	};
</script>

<style>
	.container-nav{
		height: 40px;
		width: 100%;
		box-sizing: border-box;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10px;
	}
</style>
