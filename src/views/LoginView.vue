<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user.js'
import { safeRedirect } from '@/utils/auth.js'
const user = useUserStore()
const route = useRoute()
const router = useRouter()
const formRef = ref()
const loading = ref(false)
const form = reactive({ username: '', password: '' })
const rules = {
  username: [{ required: true, whitespace: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}
async function submit() {
  if (loading.value || !(await formRef.value.validate().catch(() => false))) return
  loading.value = true
  try {
    await user.login({ username: form.username.trim(), password: form.password })
    ElMessage.success('登录成功')
    await router.replace(safeRedirect(route.query.redirect))
  } catch (error) {
    // 网络和业务错误已由 request 提示；本地数据校验错误单独提示。
    if (!error.config && !error.response) ElMessage.error(error.message)
  } finally { loading.value = false }
}
</script>

<template>
  <el-card class="auth-card" shadow="never">
    <h1>欢迎回来</h1>
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top" @submit.prevent="submit">
      <el-form-item label="用户名" prop="username"><el-input v-model="form.username" autocomplete="username" /></el-form-item>
      <el-form-item label="密码" prop="password"><el-input v-model="form.password" type="password" show-password autocomplete="current-password" /></el-form-item>
      <el-button class="full-width" type="primary" native-type="submit" :loading="loading">登录</el-button>
    </el-form>
    <p>还没有账号？<RouterLink to="/register">立即注册</RouterLink></p>
  </el-card>
</template>
