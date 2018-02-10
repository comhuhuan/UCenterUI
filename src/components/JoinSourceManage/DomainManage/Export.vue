<template>
    <section id="idcExport">
        <PanelHead :options="panelOpt">
            <span slot="icon">
                <a class="el-icon-back icon" href="javascript:;" title="返回" @click="returnEvt"></a>
            </span>
        </PanelHead>
        <br>
        <fieldset>
            <legend>域名管理--导出</legend>
            <el-form  ref="addRuleForm" label-width="180px">

                <el-form-item label="导出字段："  class="fields">
                    <span class="field" v-for="field in fields" :key="field" v-html="field"></span>
                </el-form-item>

                <el-form-item >
                    <el-button-group>
                        <el-button type="primary" @click="submitForm">确定</el-button>
                        <el-button type="primary" @click="returnEvt">返回</el-button>
                    </el-button-group>
                </el-form-item>
            </el-form>
        </fieldset>
    </section>
</template>

<script>
    import PanelHead from 'components/Common/PanelHead'
    export default {
        name: 'Add',
        components: {
            PanelHead
        },
        props: {
            tabName: {
                type: String,
                required: true
            }
        },
        data () {
        return {
            fields:["机房名称","网站域名","发现时间","最后活跃时间","备案状态","备案号"],
            panelOpt: {
                title: '域名管理',
                hasIcon: true
            },
        }
    },
    methods: {
        returnEvt () {
            this.$emit("cancelTab", this.tabName)
        },
        submitForm () {

        },
    }
    }
</script>

<style lang="less">
    #idcExport{
    .el-form{
        width: 55%;
        margin: 0 auto;
    }
    fieldset {
        border: 1px solid #06f;
        padding: 10px 10px 0px 10px;
        overflow: hidden;
        transition: all 0.3s ease;
    legend {
        border: none;
        width: auto;
        font-size: 14px;
        padding: 0 5px;
        cursor: pointer;
        color: #06f;
        margin: 0;
    }
    }
    .el-form-item {
    &.fields {
    .field {
        display: inline-block;

    &:not(:last-child)::after {
         content: "|";
         display: inline-block;
         padding: 0 6px;
     }
    }
    }
    }
    }
</style>
