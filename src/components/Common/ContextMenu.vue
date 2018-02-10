<template>
	<section class="contextMenu">
		<ul>
			<li v-for="(item, index) in menuList" :class="item.class" :key="index" :id="item.id" @click="triggerEvent(item.contentText)" v-if="!item.hidden">
				<i v-if="item.icon" :class="item.icon"></i>{{item.contentText}}
			</li>
		</ul>
	</section>
</template>

<script>
	export default {
		name: 'ContextMenu',
		props: {
			menuList: {
				type: Array,
				default() {
					return {}
				}
			},
			parent: {
				type: String,
                defalut: ''
			}

		},
		data() {
			return {
				elem: '',

			}
		},
		methods: {
			init() {

			},
			showMenu(elem, evt) {
				// $(elem).on('contextmenu', function(e) {
		    	// console.log(this.parent)
		    	// console.log($(this.parent + ' .contextMenu ul'))
		    	const $menu = $('.contextMenu ul')
		    	$menu.hide()
		    	// console.log(this.menuList)
                const $oneMenu = this.parent ? $(this.parent + ' .contextMenu ul') : $menu
	    		$oneMenu.show().css({
	    			left: evt.clientX + 'px',
	    			top: evt.clientY + 'px'
	    		})
	    		$(':not(.contextMenu ul)').on('click', function() {
	    			$menu.hide()
	    		})
	    		this.elem = elem
			},
			triggerEvent(text) {
				this.menuList.forEach(item => {

					if(item.contentText === text) {
						// console.log(item.event)
						// this.$emit('clickMenu', text, this.elem)
						this.$emit('clickMenu', text, this.elem)
					}

				})
			}

		},
		created() {

		},
		mounted() {
			this.$nextTick(function () {
		        /*this.$on('showmenu', function () {
		          	console.log('show')
		        })*/
		    })
		}
	}
</script>

<style lang="less">
	.contextMenu {
		ul {
			width: 140px;
			list-style: none;
			border: 1px solid #aaa;
			box-shadow: 2px 2px 4px #999;
			margin: 0;
			padding: 0;
			background-color: #fff;
			position: fixed;
			z-index: 999;
			display: none;
			left: 0px;
			top: 0px;

			li {
				height: 30px;
				line-height: 30px;
				font-size: 14px;
				color: #000;
				cursor: default;
				padding: 0 10px;
				background-color: #fff;

				i {
					display: inline-block;
					padding-left: 10px;
					padding-right: 10px;
				}

				&:hover {
					background-color: #dedede;
				}
			}
		}
	}
</style>
