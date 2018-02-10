<template>
    <el-tabs type="border-card" tab-position="bottom" :activeName="activeName">
        <el-tab-pane label="主页" :closable="false" name="主页">
            <section id="myAccount">
                <fieldset>
                    <legend>我的账户</legend>
                    <el-form :model="addRuleForm" :rules="addRule" ref="addRuleForm" label-width="160px">
                        <el-form-item label="用户名：" prop="userid">
                            <el-input size="mini" v-model="addRuleForm.userid" disabled placeholder="请输入用户名"/>
                        </el-form-item>
                        <el-form-item label="姓名：" prop="username">
                            <el-input size="mini" v-model="addRuleForm.username" placeholder="请输入姓名"/>
                        </el-form-item>
                        <el-form-item label="原密码：" prop="oldpasswd">
                            <el-input size="mini" v-model="addRuleForm.oldpasswd" placeholder="请输入原密码"/>
                        </el-form-item>
                        <el-form-item label="新密码：" prop="passwd">
                            <el-tooltip class="item" effect="dark" content='为安全起见，密码长度必须为6-15位且必须含有数字和字母' placement="right">
                                <el-input size="mini" v-model="addRuleForm.passwd" placeholder="请输入新密码"/>
                            </el-tooltip>
                        </el-form-item>
                        <el-form-item label="确认新密码：" prop="passwd2">
                            <el-tooltip class="item" effect="dark" content='为安全起见，密码长度必须为6-15位且必须含有数字和字母' placement="right">
                                <el-input size="mini" v-model="addRuleForm.passwd2" placeholder="请输入确认新密码"/>
                            </el-tooltip>
                        </el-form-item>
                        <el-form-item label="密码保护问题：" prop="qTypeId">
                            <el-select size="mini" v-model="addRuleForm.qTypeId" placeholder="请选择">
                                <el-option
                                    v-for="(value) in questionTypeList"
                                    :key="value"
                                    :label="value"
                                    :value="value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="密码保护答案：" prop="answer">
                            <el-input size="mini" v-model="addRuleForm.answer" placeholder="请输入密码保护答案"/>
                        </el-form-item>
                        <el-form-item label="性别：" prop="sex">
                            <el-select size="mini" v-model="addRuleForm.sex" placeholder="请选择">
                                <el-option
                                    v-for="(value,key) in sexList"
                                    :key="key"
                                    :label="value"
                                    :value="key">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="固定电话：" prop="tel">
                            <el-tooltip class="item" effect="dark" content='格式如:0755-12345678' placement="right">
                                <el-input size="mini" v-model="addRuleForm.tel" placeholder="请输入固定电话"/>
                            </el-tooltip>
                        </el-form-item>
                        <el-form-item label="移动电话：" prop="mobile">
                            <el-tooltip class="item" effect="dark" content='格式如:13612345678' placement="right">
                                <el-input size="mini" v-model="addRuleForm.mobile" placeholder="请输入移动电话"/>
                            </el-tooltip>
                        </el-form-item>
                        <el-form-item label="Email地址：" prop="email">
                            <el-tooltip class="item" effect="dark" content='格式如:abc@163.com' placement="right">
                                <el-input size="mini" v-model="addRuleForm.email" placeholder="请输入Email地址"/>
                            </el-tooltip>
                        </el-form-item>
                        <el-form-item label="">
                            <el-button-group>
                                <el-button type="primary" @click="">确定</el-button>
                                <el-button type="primary" @click="">重置</el-button>
                            </el-button-group>
                        </el-form-item>
                    </el-form>
                </fieldset>
            </section>
        </el-tab-pane>
    </el-tabs>
</template>

<script>

	export default {
		name: 'MyAccount',
		data() {
			return {
			    questionTypeList:[
			        '母亲的出生地点',
                    '儿童时期的最好朋友',
                    '第一个宠物的名字',
                    '最喜欢的老师',
                    '最喜欢的历史人物'
                ],
                activeName: '主页',
                sexList: {
                    1: '男',
                    0: '女'
                },
                addRuleForm: {
                    userid: 'admin',
                    username: '',
                    oldpasswd: '',
                    passwd: '',
                    passwd2: '',
                    qTypeId: '',
                    answer: '',
                    sex: '',
                    mobile: '',
                    tel: '',
                    email: ''
                },
                addRule: {
                    username: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    oldpasswd: [
                        { required: true, message: '请输入原密码', trigger: 'blur' }
                    ],
                    passwd: [
                        { required: true, message: '请输入新密码', trigger: 'blur' }
                    ],
                    passwd2: [
                        { required: true, message: '请输入确认新密码', trigger: 'blur' }
                    ],
                    qTypeId: [
                        { required: true, message: '请选择密码保护问题', trigger: 'blur' }
                    ],
                    answer: [
                        { required: true, message: '请输入密码保护答案', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'blur' }
                    ],
                    tel: [
                        { required: true, message: '请输入固定电话', trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, message: '请输入移动电话', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入Email地址', trigger: 'blur' }
                    ]
                }
			}
		},
		methods: {

		}
	}

</script>

<style lang="less">
    #myAccount{
        .el-form{
            width:50%;
            margin: 0 auto;
        }
        fieldset {
            border: 1px solid #c7c7c7;
            padding: 10px 10px 0px 10px;
            overflow: hidden;
            transition: all 0.3s ease;
            legend {
                border: none;
                width: auto;
                font-size: 14px;
                padding: 0 5px;
                cursor: pointer;
                color: #999999;
                margin: 0;
            }
        }
    }
</style>
