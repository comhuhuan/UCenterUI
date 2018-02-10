<template lang="html">
    <section class="importTpl">
        <PanelHead :options="panelOpt">
            <span slot="icon">
                <a class="el-icon-back icon" href="javascript:void(0);" title="返回" @click="backHandle"></a>
            </span>
        </PanelHead>
        <el-form label-width="120px" class="commonForm" :model="formFilter" :rules="formRules" ref="formFilter">
            <fieldset class="expand active">
                <legend>导入</legend>
                <el-form-item label="模板：" class="tpl">
                    <a href="static/template/机房信息.xls">下载模板</a>
                </el-form-item>
                <el-form-item label="违法网站名称：" prop="name" :rules="{required: true, trigger: 'blur', message: '请输入违法网站名称'}">
                    <el-input size="mini" v-model="formFilter.name" placeholder="请输入违法网站名称"></el-input>
                </el-form-item>
                <el-form-item label="违法网站原因：" prop="reason" :rules="{required: true, trigger: 'blur', message: '请输入违法网站原因'}">
                    <el-input size="mini" v-model="formFilter.reason" placeholder="请输入违法网站原因"></el-input>
                </el-form-item>
                <el-form-item label="违法违规情况：" prop="illegalType" :rules="{required: true, trigger: 'change', message: '请选择违法违规情况'}">
                    <el-select size="mini" v-model="formFilter.illegalType" placeholder="请选择违法违规情况">
                                <el-option v-for="item in parentData.illegalTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                </el-form-item>
                <el-form-item label="违法网站类型：" prop="type" :rules="{required: true, message: '请选择违法网站类型', trigger: 'change'}">
                    <el-radio-group v-model="formFilter.type" size="mini">
                                <el-radio-button label="域名"></el-radio-button>
                                <el-radio-button label="IP"></el-radio-button>
                            </el-radio-group>
                </el-form-item>
                <el-form-item label="过期时间：" prop="expiredTime">
                    <el-date-picker size="mini" v-model="formFilter.expiredTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="路径：" class="url" prop="url"
                    :rules="[{required: true, message: '请选择要上传的文件', }, {validator: validateUploadFile} ]"
                >
                    <el-upload class="upload"
                        ref="upload"
                        drag multiple
                        v-model="formFilter.url"
                        :data="formFilter"
                        action="/act-idc-web/baseData/houseManage/import.do"
                        accept="application/vnd.ms-excel"
                        :auto-upload="false"
                        :onError="uploadError"
                        :onSuccess="uploadSuccess"
                        :onChange="uploadChange"
                        :onRemove="upLoadRemove"
                    >
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传xls/xlsx文件</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="格式说明：">
                    xls 或xlsx 文档 (支持Excel 97-2003 工作簿 和 Excel 2007)
                </el-form-item>
                <el-form-item class="operate">
                    <el-button type="primary" @click="importHandle">导入</el-button>
                    <el-button type="primary" @click="backHandle">返回</el-button>
                </el-form-item>
            </fieldset>
        </el-form>
    </section>
</template>

<script>
import formMixin from "@/mixins/formMixin";
import uploadMixin from "@/mixins/uploadMixin";
import PanelHead from "components/Common/PanelHead";

export default {
  name: "import",
  mixins: [formMixin, uploadMixin],
  components: {
    PanelHead
  },
  props: {
    parentData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      panelOpt: {
        title: this.parentData.name,
        hasIcon: true
      },
      formFilter: {
        name: "",
        reason: "",
        illegalType:"",
        type:"",
        expiredTime: "",
        url: ""
      },
      formRules: {

      },
    };
  },
  created(){
    console.log(this.parentData)
  },
  methods: {
    importHandle() {
      this.validateHandle("formFilter", _ => {
        // console.log(this.$refs.upload)
        this.$refs.upload.submit();
      });
    },
    backHandle() {
      this.$emit("removeTab", this.parentData.name);
    }
  }
};
</script>

<style lang="less">
.importTpl {
  max-height: 100%;
  overflow: auto;
  margin-top: -10px;
  // background-color: #f5f7fa;
  // padding-bottom: 10px;
  .commonForm {
    margin: 10px;
  }
}
</style>
