<template lang="html">
    <section class="collapse-container"
        :class="[{'common-collapse': curCollapse}, 'collapse__' + position]"
        :style="{width: !curCollapse ? width : 0, 'min-width': !curCollapse ? minWidth : 0}"
    >
        <div class="collapse-content">
            <slot name="content"></slot>
        </div>
        <div class="toggle-collapse"
            :class="[collapseClass, shape]"
            @click="collapseHandle"
        >
            <div class="collapse-bg" :class="bgStyle">
                <i :class="'el-icon-d-arrow-' + reversePos"></i>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'ToggleCollapse',
    props: {
        isCollapse: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            defalut: '200px'
        },
        minWidth: {
            type: String,
            default: ''
        },
        collapseClass: {
            type: String,
            default: ''
        },
        shape: {
            type: String,
            default: 'trapezoid' // rectangle
        },
        position: {
            type: String,
            default: 'right-middle'
            // [
            // 'right-top', 'right-middle', 'right-bottom'
            // 'left-top, left-middle', 'left-bottom',
            // 'top-left', 'top-center', 'top-right', 暂不支持
            // 'bottom-left', 'bottom-center', 'bottom-right', 暂不支持
            // ]
        }
    },
    data() {
        return {
            pos: '',
            reversePos: '',
            curCollapse: this.isCollapse || false
        }
    },
    watch: {
        isCollapse(value) {
            this.curCollapse = value
        }
    },
    computed: {
        bgStyle() {
            return !this.curCollapse ? `collapse-bg__${this.pos}` : `collapse-bg__${this.reversePos}`
        }
    },
    created() {
        this.pos = this.position.substring(0, this.position.indexOf('-'))
        this.reversePos = this.pos === 'left' ? 'right' : 'left'
    },
    methods: {
        collapseHandle() {
            this.curCollapse = !this.curCollapse
            this.$emit("collapse-click", this.curCollapse)
        },
        /*getIsCollapse() {
            return this.curCollapse
        }*/
    }
}
</script>

<style lang="less" scoped>
.collapse-container {
    position: relative;
    height: 100%;
    transition: all 0.3s linear;

    @BgPrimary: #4d4d4d;
    @BgHover: #404040;


    .collapse-content {
        height: 100%;
        overflow: hidden;
    }
    .toggle-collapse {
        position: absolute;
        cursor: pointer;
        z-index: 10;
        transition: all 0.1s ease,0.1s ease;

        .collapse-bg {
            // width: 0;
            // height: 32px;
            // line-height: 32px;
            transition: all 0.1s ease,0.1s ease;
            i {
                transition: all 0.1s ease,0.1s ease;
                color: #ccc;
            }
            &:hover {
                i {
                    color: #fff;
                }
            }
        }
    }

    .trapezoid {
        .collapse-bg {
            width: 0;
            height: 32px;
            line-height: 32px;
        }
        // trapezoid 梯形css
        .collapse-bg__left, .collapse-bg__right {
            border-bottom: 9px solid transparent;
            border-top: 9px solid transparent;
        }
        .collapse-bg__left {
            border-left: 13px solid @BgPrimary;
            i {
                margin-left: -13px;
            }
            &:hover {
                border-left-width: 17px;
                border-left-color:  @BgHover;
            }
        }
        .collapse-bg__right {
            border-right: 13px solid @BgPrimary;
            &:hover {
                border-right-width: 17px;
                border-right-color:  @BgHover;
            }
        }

    }
    .rectangle {
        .collapse-bg {
            width: 16px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            background-color: @BgPrimary;
            &:hover {
                background-color: @BgHover;
            }
        }
        .collapse-bg__right {
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
        }
        .collapse-bg__left {
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
        }
    }


    &.collapse__left-top {
        .toggle-collapse {
            left: 0;
            top: 0;
        }
    }

    &.collapse__left-middle {
        .toggle-collapse {
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }
    }
    &.collapse__left-bottom {
        .toggle-collapse {
            left: 0;
            bottom: 0;
        }
    }
    &.collapse__right-top {
        .toggle-collapse {
            right: 0;
            top: 0;
        }
    }
    &.collapse__right-middle {
        .toggle-collapse {
            right: 0;
            top: 50%;
            transform: translateY(-50%);
        }
    }
    &.collapse__right-bottom {
        .toggle-collapse {
            right: 0;
            bottom: 0;
        }
    }

    &.common-collapse {
        &.collapse__right-top, &.collapse__right-middle, &.collapse__right-bottom {
            .toggle-collapse {
                left: 0;
                .collapse-bg-right {
                    i {
                        margin-left: -13px;
                        transform: rotate(180deg);
                    }
                }
            }
        }
        &.collapse__left-top, &.collapse__left-middle, &.collapse__left-bottom {
            .toggle-collapse {
                left: -13px;
                .collapse-bg-left {
                    i {

                        transform: rotate(180deg);
                    }
                }

                &.trapezoid {
                    &:hover {
                        left: -17px;
                    }
                }
                &.rectangle {
                    left: -16px;
                    &:hover {
                        left: -16px;
                    }
                }
            }

        }
    }

}


</style>
