<template>
    <section id="idcExport">
        <PanelHead :options="panelOpt">
            <span slot="icon">
                <a class="el-icon-back icon" href="javascript:;" title="返回" @click="returnEvt"></a>
            </span>
        </PanelHead>
        <br>
        <fieldset>
            <legend>IP域名关系--导出</legend>
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
            fields:["接入域名","顶级域名","IP地址","网站名称","备案号","域名级别","是否备案","所属机房","发现时间","活跃时间"],
            panelOpt: {
                title: 'IP域名关系',
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
