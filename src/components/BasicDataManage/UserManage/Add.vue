<template>
    <section id="userAdd">
        <div class="sectionLeft">
            <ul class="stepList">
                <li :class="{'active':isUser,'big':activeId==1}">
                    <a href="#" v-if="!isUser">用户</a>
                    <a href="#" @click="on_click(1)" v-if="isUser">用户</a>
                    <div class="line"></div>
                </li>
                <li :class="{'active':isServer,'big':activeId==2}">
                    <a href="#" v-if="!isServer">服务</a>
                    <a href="#" @click="on_click(2)" v-if="isServer">服务</a>
                    <div class="line"></div>
                </li>
                <li :class="{'active':isRoom,'big':activeId==3}">
                    <a href="#" v-if="!isRoom">机房</a>
                    <a href="#" @click="on_click(3)" v-if="isRoom">机房</a>
                </li>
            </ul>
        </div>
        <div class="sectionRight">
            <add-one v-show="activeId==1" @saveQuit="saveQuit" @activeServer="ServerShow" @activeRoom="RoomShow" @ServerEvt="ServerEvt" @noServerEvt="noServerEvt"></add-one>
            <add-two v-show="activeId==2" @saveQuit="saveQuit" @activeUser="activeUser" @preEvt="UserShow" @nextEvt="RoomShow"></add-two>
            <add-three v-show="activeId==3" @saveQuit="saveQuit" @activeUser="activeUser" @preEvt="ServerShow" @preEvtFist="UserShow" @activeServer="activeServer" @noActiveServer="noActiveServer"></add-three>
        </div>
    </section>
</template>

<script>
import addOne from "./AddOne";
import addTwo from "./AddTwo";
import addThree from "./AddThree";
import storage from "utils/storage";
import { mapActions, mapState } from "vuex";
export default {
  name: "Add",
  components: { addOne, addTwo, addThree },
  data() {
    return {
      tabList: [
        { value: "0", label: "用户" },
        { value: "1", label: "服务" },
        { value: "2", label: "机房" }
      ]
    };
  },
  computed: {
    ...mapState({
      activeId: state => state.userManage.activeId,
      isUser: state => state.userManage.isUser,
      isServer: state => state.userManage.isServer,
      isRoom: state => state.userManage.isRoom
    })
  },
  created() {
    console.log(this.isUser, this.isServer, this.isRoom);
  },
  mounted() {
    // let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    //  this.$refs.sectionRight.style.height = h - 200 + 'px'
  },
  methods: {
    ...mapActions(["setActive", "setIsUser", "setIsServer", "setIsRoom"]),
    ServerEvt() {
      this.setIsRoom(false);
    },
    noServerEvt() {
      this.setIsServer(false);
    },
    ServerShow() {
      this.setActive(2);
      this.setIsServer(true);
    },
    UserShow() {
      this.setActive(1);
    },
    RoomShow() {
      this.setActive(3);
      this.setIsRoom(true);
    },
    backServer() {
      this.$emit("backServer");
    },
    on_click(e) {
      this.setActive(e);
      console.log(this.activeId);
    },
    //激活用户
    activeUser() {
      this.setIsUser(true);
    },
    //激活服务
    activeServer() {
      this.setIsServer(true);
    },
    //不激活服务
    noActiveServer() {
      this.setIsServer(false);
    },
    saveQuit() {
      this.$emit("saveQuit");
    }
  }
};
</script>

<style lang="less">
#userAdd {
  height: 100%;
  .sectionLeft {
    width: 150px;
    height: 100%;
    text-align: center;
    float: left;
    .stepList {
      margin: 0;
      padding: 0;
      li {
        list-style: none;
        &.active {
          a {
            border: 3px solid #aaedb5;
            color: #aaedb5;
          }
        }
        &.big {
          a {
            border: 3px solid #11c42e;
            color: #11c42e;
          }
        }
        .line {
          width: 4px;
          height: 50px;
          background-color: #ccc;
          margin: 5px auto;
        }
        a {
          display: inline-block;
          width: 40px;
          height: 40px;
          background-color: #fff;
          border: 3px solid #ccc;
          border-radius: 22px;
          line-height: 40px;
          text-align: center;
          font-size: 14px;
          color: #666;
        }
      }
    }
  }
  .sectionRight {
    width: calc(~"100% - 150px");
    height: 100%;
    float: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
}
</style>
