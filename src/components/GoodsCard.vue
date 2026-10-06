<script setup>
import ProductArt from "./ProductArt.vue";
defineProps({ goods: { type: Object, required: true } });
</script>
<template>
  <RouterLink class="goods-card" :to="`/goods/${goods.id}`">
    <div class="goods-image" :style="{ '--image-height': `${goods.height}px` }">
      <ProductArt
        :kind="goods.kind"
        :color="goods.color"
        :accent="goods.accent"
      /><span class="condition">{{ goods.condition }}</span
      ><span class="image-badge">个人闲置</span>
    </div>
    <div class="goods-body">
      <h3>{{ goods.title }}</h3>
      <div class="price-row">
        <span class="price"
          ><small>¥</small>{{ goods.price.toLocaleString() }}</span
        ><span class="wanted">{{ goods.wanted }}人想要</span>
      </div>
      <div class="seller">
        <span class="seller-avatar" :style="{ background: goods.avatar }">{{
          goods.seller.slice(0, 1)
        }}</span
        ><span class="seller-name">{{ goods.seller }}</span
        ><span class="seller-location">{{ goods.location }}</span>
      </div>
    </div>
  </RouterLink>
</template>
<style scoped>
.goods-card {
  display: block;
  background: white;
  overflow: hidden;
  border-radius: 14px;
  margin-bottom: 18px;
  break-inside: avoid;
  transition:
    transform 0.22s,
    box-shadow 0.22s;
  border: 1px solid #eeeef1;
  color: #29282f;
}
.goods-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 28px #22223512;
}
.goods-image {
  position: relative;
  height: var(--image-height);
  overflow: hidden;
}
.goods-image :deep(svg) {
  transition: transform 0.35s;
}
.goods-card:hover .goods-image :deep(svg) {
  transform: scale(1.045);
}
.condition {
  position: absolute;
  top: 11px;
  left: 11px;
  font-size: 10px;
  font-weight: 600;
  background: #ffffffdd;
  border: 1px solid #ffffffa0;
  padding: 4px 7px;
  border-radius: 5px;
  color: #505058;
}
.image-badge {
  position: absolute;
  right: 10px;
  bottom: 10px;
  background: #ffffffb0;
  border-radius: 5px;
  padding: 3px 6px;
  font-size: 9px;
  color: #68656a;
}
.goods-body {
  padding: 13px 14px 14px;
}
h3 {
  font-size: 13px;
  font-weight: 500;
  line-height: 1.7;
  margin: 0 0 9px;
  height: 44px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.price-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 4px;
}
.price {
  color: #ed443e;
  font-size: 23px;
  font-weight: 750;
  letter-spacing: -0.7px;
}
.price small {
  font-size: 13px;
  margin-right: 3px;
}
.wanted {
  color: #aaa9b0;
  font-size: 10px;
  white-space: nowrap;
}
.seller {
  margin-top: 14px;
  padding-top: 11px;
  border-top: 1px solid #f3f3f5;
  display: flex;
  gap: 6px;
  align-items: center;
  font-size: 10px;
  color: #8a8992;
}
.seller-avatar {
  width: 23px;
  height: 23px;
  flex-shrink: 0;
  border-radius: 50%;
  color: #746760;
  display: grid;
  place-items: center;
  font-size: 10px;
}
.seller-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.seller-location {
  margin-left: auto;
  flex-shrink: 0;
}
@media (max-width: 520px) {
  .goods-image {
    height: 180px;
  }
  .goods-body {
    padding: 10px;
  }
  .price {
    font-size: 20px;
  }
  .wanted,
  .seller-location {
    display: none;
  }
}
</style>
