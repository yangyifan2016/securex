<template>
  <el-dialog
    title="资产授权"
    v-model="state.visible"
    width="1100px"
  >
    <el-form :model="state.form" :rules="state.rules" ref="formRef" label-position="top">
      <div v-for="(item, index) in state.form" class="formLine" :key="index">
        <el-form-item class="item" :prop="index+'.type'" :rules="state.rules.type">
          <span>数据库类型</span>
          <el-select v-model="item.type" placeholder="请选择">
            <el-option label="类型1" value="1"></el-option>
            <el-option label="类型2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="item" :prop="index+'.system'" :rules="state.rules.system">
          <span>所属系统名称</span>
          <el-input type="text" v-model="item.system"></el-input>
        </el-form-item>
        <el-form-item class="item" :prop="index+'.base'" :rules="state.rules.base">
          <span>库名称</span>
          <el-input type="text" v-model="item.base"></el-input>
        </el-form-item>
        <el-form-item class="item" :prop="index+'.port'" :rules="state.rules.port">
          <span>端口</span>
          <el-input type="text" v-model="item.port"></el-input>
        </el-form-item>
        <el-form-item class="item" :prop="index+'.username'" :rules="state.rules.username">
          <span>用户名</span>
          <el-input type="text" v-model="item.username"></el-input>
        </el-form-item>
        <el-form-item class="item" :prop="index+'.password'" :rules="state.rules.password">
          <span>密码</span>
          <el-input type="text" v-model="item.password"></el-input>
        </el-form-item>
        <el-icon class="pointer" @click="handleFormDelete(index)"><CircleCloseFilled /></el-icon>
      </div>
      <el-button type="text" @click="handleFormAdd()">+添加数据库</el-button>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="state.visible = false">取 消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { CircleCloseFilled } from '@element-plus/icons-vue'
import axios from '@/utils/axios'
import { ElMessage } from 'element-plus'
const props = defineProps({
  reload: Function
})
const formRef = ref(null)
const state = reactive({
  visible: false,
  baseForm: JSON.stringify({
    type: '',
    system: '',
    base: '',
    port: '',
    username: '',
    password: ''
  }),
  form: [{
    type: '',
    system: '',
    base: '',
    port: '',
    username: '',
    password: ''
  }],
  rules: {
    type: [
      { required: 'true', message: '请选择数据库类型', trigger: ['change'] }
    ],
    system: [
      { required: 'true', message: '所属系统名称不能为空', trigger: ['blur'] }
    ],
    base: [
      { required: 'true', message: '库名称不能为空', trigger: ['blur'] }
    ],
    port: [
      { required: 'true', message: '端口不能为空', trigger: ['blur'] }
    ],
    username: [
      { required: 'true', message: '用户名不能为空', trigger: ['blur'] }
    ],
    password: [
      { required: 'true', message: '密码不能为空', trigger: ['blur'] }
    ],
  }
})
// 添加数据库
const handleFormAdd = () => {
  state.form.push(JSON.parse(state.baseForm))
}
// 删除行
const handleFormDelete = index => {
  state.form.splice(index, 1)
  formRef.value.validate()
}
// 开启弹窗
const open = () => {
  state.visible = true
  
}
// 关闭弹窗
const close = () => {
  state.visible = false
}
const submitForm = () => {
  formRef.value.validate((valid) => {
    console.log(valid)
    return
    if (valid) {
      axios.post('/', {
        
      }).then(() => {
        ElMessage.success('添加成功')
        state.visible = false
        // 接口回调之后，运行重新获取列表方法 reload
        if (props.reload) props.reload()
      })
    }
  })
}
defineExpose({ open, close })
</script>
<style scoped>
.formLine {
  display: flex;
  flex-direction: row;
}
.formLine .item {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 4px;
}
.formLine .item .el-input, .formLine .item .el-select {
  width: 152px;
}
.formLine .el-icon {
  margin-top:44px;
}
.pointer {
  cursor: pointer;
}
</style>