<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { registerApi } from '@/api/user.js'
const router = useRouter()
const formRef = ref()
const loading = ref(false)
const form = reactive({ username: '', password: '', confirmPassword: '' })
const rules = {
  username: [{ required: true, whitespace: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, min: 6, message: '请输入至少 6 位密码', trigger: 'blur' }],
  confirmPassword: [{ validator: (_, value, callback) => callback(value && value === form.password ? undefined : new Error('两次密码不一致')), trigger: 'blur' }],
}
async function submit() {
  if (loading.value || !(await formRef.value.validate().catch(() => false))) return
  loading.value = true
  try {
    await registerApi({ username: form.username.trim(), password: form.password })
    ElMessage.success('注册成功，请登录')
    await router.replace('/login')
  } catch { /* request 已统一提示错误 */ }
  finally { loading.value = false }
}
</script>

<template>
  <el-card class="auth-card" shadow="never">
    <h1>注册账号</h1>
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top" @submit.prevent="submit">
      <el-form-item label="用户名" prop="username"><el-input v-model="form.username" autocomplete="username" /></el-form-item>
      <el-form-item label="密码" prop="password"><el-input v-model="form.password" type="password" show-password autocomplete="new-password" /></el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword"><el-input v-model="form.confirmPassword" type="password" show-password autocomplete="new-password" /></el-form-item>
      <el-button class="full-width" type="primary" native-type="submit" :loading="loading">注册</el-button>
    </el-form>
    <p>已有账号？<RouterLink to="/login">去登录</RouterLink></p>
  </el-card>
</template>
