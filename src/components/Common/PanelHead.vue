<template>
	<section class="panel-head">
		<div class="panel-text" :class="{hasIcon: options.hasIcon}">
			<!-- <i class="el-icon-back" v-if="options.hasBack" @click=""></i>{{options.title}} -->
			<slot name="icon"></slot>{{options.title}}
		</div>
		<div class="operate">
			<slot name="btnGroup"></slot>
		</div>
	</section>
</template>
<script>

export default {
	name: 'PanelHead',
	props: {
		options: {
			type: Object
		},
	}
}
</script>
<style scoped lang="less">

	.panel-head {
		@height: 28px;
		// height: 62px;
		// line-height: 31px;
		border-bottom: 1px solid #E4E4E4;
		padding: 6px;
		height: @height;
		line-height: @height;

		.panel-text {
			display: inline-block;
		    border-left: 2px solid #00A1CC;
		    padding: 0 0 0 8px;
		    font-size: 16px;
			// font-weight: bold;

			&.hasIcon {
				border: none;
				padding: 0;
				.icon {
					padding: 0 7px;
					margin-right: 5px;
					height: @height;
					line-height: @height;
					color: #00A1CC;
					font-weight: bold;

					&:hover {
						color: #0cf;
						background-color: #eee;
					}
				}

			}
		}
		.operate {
			float: right;
			padding: 0;
		}
	}
</style>
