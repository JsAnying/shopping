<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.js";
import { hotSearches } from "@/data/market.js";
import MarketIcon from "./MarketIcon.vue";
const router = useRouter();
const route = useRoute();
const user = useUserStore();
const keyword = ref("");
watch(
  () => route.query.q,
  (value) => {
    keyword.value = typeof value === "string" ? value : "";
  },
  { immediate: true },
);
function search(value = keyword.value) {
  router.push({ path: "/", query: value.trim() ? { q: value.trim() } : {} });
}
function logout() {
  user.logout();
  router.replace("/");
}
</script>

<template>
  <header class="market-header">
    <div class="header-top">
      <div class="header-top-inner">
        <span>让闲置流动，让生活轻盈。</span
        ><span
          >个人好物 · 循环新生
          <span class="top-dot">●</span> 每一件，都有下一位主人</span
        >
      </div>
    </div>
    <div class="header-main">
      <RouterLink class="brand" to="/" aria-label="拾光闲置首页"
        ><span class="brand-mark"
          ><svg
            width="33"
            height="33"
            viewBox="0 0 40 40"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M10 14 6 23l14 10 14-10-4-9-10 7-10-7Z"
              stroke="currentColor"
              stroke-width="3"
              stroke-linejoin="round"
            />
            <path
              d="m11 7 9 6 9-6M20 21v12"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
            /></svg></span
        ><span
          ><strong>拾光闲置<span class="brand-dot">.</span></strong
          ><small>好物有下一站</small></span
        ></RouterLink
      >
      <div class="header-search">
        <form class="search-capsule" role="search" @submit.prevent="search()">
          <MarketIcon name="search" :size="21" /><input
            v-model="keyword"
            aria-label="搜索闲置商品"
            placeholder="搜一搜，发现你的心动闲置"
            type="search"
          /><button type="submit">搜索</button>
        </form>
        <div class="hot-searches">
          <span>大家都在搜</span
          ><button v-for="tag in hotSearches" :key="tag" @click="search(tag)">
            {{ tag }}
          </button>
        </div>
      </div>
      <nav class="user-nav" aria-label="用户导航">
        <div class="account-entry">
          <span class="avatar-placeholder"
            ><MarketIcon name="user" :size="21"
          /></span>
          <div v-if="!user.isLoggedIn">
            <RouterLink to="/login">登录</RouterLink
            ><span class="divider">/</span
            ><RouterLink to="/register">注册</RouterLink
            ><small>发现更多好物</small>
          </div>
          <div v-else>
            <span>{{
              user.userInfo?.nickname || user.userInfo?.username || "拾光用户"
            }}</span
            ><button class="logout-link" @click="logout">退出登录</button>
          </div>
        </div>
        <RouterLink class="orders-entry" to="/user/orders"
          ><MarketIcon name="order" :size="23" /><span
            >我的订单</span
          ></RouterLink
        >
      </nav>
    </div>
  </header>
</template>

<style scoped>
.market-header {
  background: white;
}
.header-top {
  background: #fafafa;
  border-bottom: 1px solid #f0f0f2;
  font-size: 11px;
  color: #94949c;
}
.header-top-inner {
  max-width: 1200px;
  margin: auto;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.top-dot {
  color: #ee4c43;
  font-size: 7px;
  margin: 0 8px;
}
.header-main {
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr) 240px;
  align-items: center;
  gap: 30px;
  min-height: 124px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}
.brand-mark {
  display: grid;
  place-items: center;
  width: 50px;
  height: 50px;
  border-radius: 16px;
  color: white;
  background: #f1453f;
  transform: rotate(-6deg);
}
.brand strong {
  font-size: 27px;
  color: #26252b;
  letter-spacing: -1px;
}
.brand-dot {
  color: #f1453f;
}
.brand small {
  display: block;
  color: #93939a;
  letter-spacing: 3px;
  font-size: 10px;
  margin-top: 3px;
}
.search-capsule {
  border: 2px solid #ef4741;
  height: 48px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  padding: 4px 4px 4px 17px;
  gap: 10px;
  color: #a6a6ad;
}
.search-capsule input {
  border: 0;
  outline: 0;
  width: 100%;
  min-width: 0;
  background: transparent;
  font-size: 13px;
  color: #29282e;
}
.search-capsule input::placeholder {
  color: #a4a4ab;
}
.search-capsule button {
  background: #ef4741;
  border-radius: 24px;
  color: white;
  width: 82px;
  flex-shrink: 0;
  height: 36px;
  font-weight: 600;
}
.hot-searches {
  display: flex;
  gap: 13px;
  margin: 9px 0 0 15px;
  white-space: nowrap;
  overflow: auto;
  scrollbar-width: none;
  font-size: 10px;
  color: #9999a2;
}
.hot-searches button {
  color: #85858e;
  font-size: inherit;
  padding: 0;
}
.hot-searches button:hover {
  color: #ef4741;
}
.user-nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 25px;
  padding-bottom: 14px;
  font-size: 12px;
}
.account-entry {
  display: flex;
  align-items: center;
  gap: 9px;
}
.avatar-placeholder {
  border: 1px solid #ececef;
  background: #f7f7f8;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  color: #7e7d88;
}
.divider {
  margin: 0 5px;
  color: #aaa;
}
.account-entry small {
  display: block;
  margin-top: 5px;
  color: #a2a2aa;
  font-size: 10px;
}
.orders-entry {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 4px;
}
.logout-link {
  display: block;
  padding: 0;
  margin-top: 4px;
  font-size: 10px;
  color: #92929a;
}
@media (max-width: 1300px) {
  .header-top-inner,
  .header-main {
    margin-left: 28px;
    margin-right: 28px;
  }
  .header-main {
    grid-template-columns: 200px minmax(0, 1fr) 220px;
    gap: 20px;
  }
}
@media (max-width: 900px) {
  .header-main {
    grid-template-columns: 180px 1fr;
    gap: 14px;
    padding: 20px 0;
  }
  .header-search {
    grid-column: 1/-1;
    grid-row: 2;
  }
  .user-nav {
    padding: 0;
  }
  .header-top-inner > span:last-child {
    display: none;
  }
}
@media (max-width: 520px) {
  .header-main,
  .header-top-inner {
    margin-left: 18px;
    margin-right: 18px;
  }
  .brand strong {
    font-size: 22px;
  }
  .brand-mark {
    width: 42px;
    height: 42px;
  }
  .header-main {
    grid-template-columns: 1fr auto;
  }
  .user-nav {
    gap: 14px;
  }
  .account-entry small,
  .avatar-placeholder {
    display: none;
  }
  .hot-searches {
    gap: 14px;
  }
  .orders-entry {
    font-size: 10px;
  }
}
</style>
