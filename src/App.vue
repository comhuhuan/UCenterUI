<template>
    <div id="app">
        <!-- <img src="./assets/logo.png"> -->
        <transition name="fade" mode="out-in">
            <!--内容，都会被自动替换-->
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import {
    mapActions,
    mapGetters,
    mapMutations
} from 'vuex'

export default {
    name: 'app',
    created() {
        this.updateTabsList()
    },
    watch: {
        '$route': {
            handler(newValue, oldValue) {
                console.log(newValue)
                if (newValue.matched.length === 0) { //如果未匹配到路由
                    this.$router.push('/404') //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
                }
                if (this.is_location) {
                    this.updateTabsList()
                }
                this.setIsLocation()
            },
            deep: true
        },
    },
    computed: {
        ...mapGetters([
            'is_location'
        ])
    },
    methods: {
        ...mapActions([
            'add_tabs'
        ]),
        ...mapMutations({
            setIsLocation: 'SET_IS_LOCATION'
        }),
        updateTabsList() {
            const routes = this.$router.options.routes
            const route = this.$route
            // console.log(route.matched[0])
            if (!route.matched[0]) return
            const rootPath = route.matched[0].path
            const path = route.path
            // console.log(routes, rootPath, path, route.matched[0])
            routes.forEach(items => {
                // && item.hidden
                // console.log(items.path)
                if (items.path === rootPath || rootPath === '' && items.path === '/') {
                    items.children.forEach(item => {
                        if (item.path === path) {
                            this.add_tabs(item)
                        }
                    })
                }
            })
        },
    }
}
</script>


<style lang="less" src="static/css/elementui.less"></style>
<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100vw;
    height: 100vh;
}
</style>
<style lang="less">
@import "../static/theme/skin-black/skin.less";
@import "../static/theme/skin-green/skin.less";
@import "../static/theme/skin-blue/skin.less";
</style>
