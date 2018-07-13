<template>
	<section style="position: relative;">
		<ul class="c_content">
			<li><div class="layer"></div></li>
		</ul>
		<div>
			<ul class="c_optBtn">
				<li @click="upComponent">上移</li>
				<li>下移</li>
				<li>删除</li>
			</ul>
		</div>
	</section>
</template>
<script>
  export default {
    data() {
      return {
        searchWord: '',
        isLoading: false,
        tipInfo: '',
        // showChoices: []
      }
    },
    props: {
      upComponent: {
        required: false,
        type: Function,
        default: () => {
          console.log('back');
        }
      },

    },
    methods: {


    },

    computed: {

    },
    mounted() {

    },
  }

</script>

<style lang="scss" scoped>
	.c_content{
		height: 240px;
		width: 380px;
		text-align: center;
		display: flex;
		box-sizing: border-box;
		padding: 2.5px 5px;
		li{
			float: left;
			height: 235px;
			width: 380px;
			position: relative;
			cursor: pointer;
			background:url(../../../../../assets/images/store/imgimg.png) no-repeat 50% 50% ;
			background-size:cover ;
			.layer{
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				background: rgba(150,150,150,0.5);
				display: none;
			}
		}
		li:hover .layer{
			display: block;
		}	

	}
	.c_optBtn{
		position: absolute;
		top: 5px;
		right: 0;
		height: 25px;
		width: 200px;
		li{
			height: 25px;
			width: 60px;
			text-align: center;
			line-height: 25px;
			text-align: center;
			float: left;
			z-index: 50;
			cursor: pointer;
		}
	}
	
</style>