<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const goodsId = computed(() => route.query.id)
</script>
<template>
  <el-card shadow="never">
    <h1>{{ goodsId ? '编辑闲置' : '发布闲置' }}</h1>
    <p v-if="goodsId">商品 ID：{{ goodsId }}</p>
    <el-empty description="预留商品表单、图片上传和保存接口" />
  </el-card>
</template>
