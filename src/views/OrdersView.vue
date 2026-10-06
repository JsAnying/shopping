<script setup>
import { ref } from 'vue'
const tab = ref('buy')
</script>
<template>
  <el-card shadow="never">
    <h1>我的订单</h1>
    <el-tabs v-model="tab">
      <el-tab-pane label="我买到的" name="buy"><el-empty description="买入记录待接入后端 API" /></el-tab-pane>
      <el-tab-pane label="我卖出的" name="sell"><el-empty description="卖出记录待接入后端 API" /></el-tab-pane>
    </el-tabs>
  </el-card>
</template>
