<script setup>
import { computed, ref, watch, nextTick, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  categories,
  channels,
  feedTabs,
  goods,
  filterGoods,
} from "@/data/market.js";
import MarketIcon from "@/components/MarketIcon.vue";
import ProductArt from "@/components/ProductArt.vue";
import GoodsCard from "@/components/GoodsCard.vue";
import FloatingDock from "@/components/FloatingDock.vue";
import CategoryNav from "@/components/CategoryNav.vue";
import { getTypeName } from "@/data/categoryTypes.js";
const route = useRoute();
const router = useRouter();
const feedRef = ref();
const activeTab = computed(() =>
  typeof route.query.category === "string" ? route.query.category : "all",
);
const keyword = computed(() =>
  typeof route.query.q === "string" ? route.query.q : "",
);
const activeType = computed(() =>
  typeof route.query.type === "string" ? route.query.type : "",
);
const typeName = computed(() => getTypeName(activeTab.value, activeType.value));
const filtered = computed(() =>
  filterGoods({
    query: keyword.value,
    category: activeTab.value,
    type: activeType.value,
  }),
);
const columnCount = ref(5);
function updateColumns() {
  const width = window.innerWidth;
  columnCount.value = width > 1100 ? 5 : width > 800 ? 4 : width > 600 ? 3 : 2;
}
onMounted(() => {
  updateColumns();
  window.addEventListener("resize", updateColumns);
});
onUnmounted(() => window.removeEventListener("resize", updateColumns));
// Grid 管理列宽，每列独立堆叠，避免不同图片高度带来的行间空白。
const feedColumns = computed(() => {
  const columns = Array.from({ length: columnCount.value }, () => []);
  filtered.value.forEach((item, index) =>
    columns[index % columnCount.value].push(item),
  );
  return columns;
});
const isFiltered = computed(
  () =>
    Boolean(keyword.value) ||
    activeTab.value !== "all" ||
    Boolean(activeType.value),
);
const currentCategory = computed(
  () =>
    categories.find((item) => item.id === activeTab.value)?.name ||
    feedTabs.find((item) => item.id === activeTab.value)?.name ||
    "全部商品",
);
const byId = (id) => goods.find((item) => item.id === id);
function selectCategory(id) {
  router.push({
    path: "/",
    query: {
      ...route.query,
      category: id === "all" ? undefined : id,
      type: undefined,
    },
  });
}
async function showFeed(id = "all", type) {
  await router.push({
    path: "/",
    query: { category: id === "all" ? undefined : id, type },
  });
  await nextTick();
  feedRef.value?.scrollIntoView({ behavior: "smooth", block: "start" });
}
watch(
  () => route.query.q,
  async (value) => {
    if (value) {
      await nextTick();
      feedRef.value?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  },
);
</script>

<template>
  <div class="market-home">
    <div class="section-eyebrow">
      <span><i></i> GOOD FINDS, SECOND LIFE</span
      ><span>闲置里的小惊喜，今天也在这里</span>
    </div>
    <section class="discovery" aria-label="发现好物">
      <CategoryNav
        :active-category="activeTab"
        :active-type="activeType"
        @select="({ category, type }) => showFeed(category, type)"
      />
      <div class="recommendations">
        <div class="recommend-heading">
          <h1>好物不贵，快乐加倍<span>精选好物 · 值得再爱一次</span></h1>
          <button @click="showFeed()">
            发现更多 <MarketIcon name="arrow" :size="15" />
          </button>
        </div>
        <div class="recommend-matrix">
          <article class="feature-banner">
            <span class="banner-label">拾光精选 / DAILY PICKS</span>
            <h2>闲置抄底<br />好物<span>。</span></h2>
            <p>给好物第二次心动<br />给生活多一点可能</p>
            <button class="banner-button" @click="showFeed()">
              去看看 <MarketIcon name="arrow" :size="18" /></button
            ><span class="banner-vertical">PRE-LOVED. RE-LOVED.</span>
            <div class="banner-orbit"></div>
            <div class="banner-art">
              <ProductArt kind="camera" color="#ff9971" accent="#e6dfd1" />
            </div>
            <span class="banner-sticker">好物<br /><b>低至 3 折</b></span>
            <div class="banner-bottom">
              <span>每一份闲置，都藏着一份惊喜</span><span>01 — 04</span>
            </div>
          </article>
          <div class="channel-grid">
            <article
              v-for="channel in channels"
              :key="channel.id"
              class="channel-card"
              :style="{ background: channel.color }"
            >
              <button class="channel-title" @click="showFeed(channel.id)">
                <span>{{ channel.title }}</span
                ><MarketIcon name="arrow" :size="15" />
              </button>
              <p>{{ channel.subtitle }}</p>
              <div class="channel-content">
                <button
                  class="channel-decoration"
                  :aria-label="`浏览${channel.title}`"
                  @click="showFeed(channel.id)"
                >
                  <ProductArt
                    :kind="channel.kind"
                    :color="channel.color"
                    :accent="channel.accent"
                  /></button
                ><RouterLink
                  v-for="id in channel.products"
                  :key="id"
                  class="mini-product"
                  :to="`/goods/${id}`"
                  :aria-label="byId(id).title"
                  ><div class="mini-image">
                    <ProductArt
                      :kind="byId(id).kind"
                      :color="byId(id).color"
                      :accent="byId(id).accent"
                    />
                  </div>
                  <span
                    ><small>¥</small>{{ byId(id).price.toLocaleString() }}</span
                  ></RouterLink
                >
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
    <div class="trust-strip">
      <span><MarketIcon name="shield" :size="17" /><b>好物值得信赖</b></span
      ><span>个人闲置，真实分享</span><i></i><span>循环利用，让好物再发光</span
      ><i></i><span>理性消费，轻盈生活</span
      ><span class="trust-note"
        >每一件闲置，都有它的故事 <MarketIcon name="heart" :size="14"
      /></span>
    </div>
    <section ref="feedRef" class="feed-section" aria-label="推荐商品">
      <div class="feed-heading">
        <h2>为你发现<span>总有一件，刚好是你想要的</span></h2>
        <span class="feed-counter"
          >{{ filtered.length }} 件心动好物 <span class="red-dot"></span
        ></span>
      </div>
      <div class="feed-tabs" role="group" aria-label="筛选商品分类">
        <button
          v-for="tab in feedTabs"
          :key="tab.id"
          :class="{ selected: activeTab === tab.id }"
          :aria-pressed="activeTab === tab.id"
          @click="selectCategory(tab.id)"
        >
          <MarketIcon v-if="tab.id === 'all'" name="spark" :size="15" />{{
            tab.name
          }}
        </button>
      </div>
      <div v-if="isFiltered" class="filter-summary">
        <span
          >{{
            keyword
              ? `“${keyword}” 的搜索结果`
              : [currentCategory, typeName].filter(Boolean).join(" / ")
          }}
          · {{ filtered.length }} 件</span
        ><button @click="router.push('/')">清除筛选 ×</button>
      </div>
      <div
        v-if="filtered.length"
        class="goods-feed"
        :style="{ '--feed-columns': columnCount }"
      >
        <div
          v-for="(column, index) in feedColumns"
          :key="index"
          class="goods-column"
        >
          <GoodsCard v-for="item in column" :key="item.id" :goods="item" />
        </div>
      </div>
      <el-empty v-else description="暂时没找到这件好物，换个关键词试试吧"
        ><el-button @click="router.push('/')">看看全部好物</el-button></el-empty
      >
      <div class="feed-end"><span></span>好物还会再相遇<span></span></div>
    </section>
    <footer class="market-footer">
      <RouterLink to="/">拾光闲置<span>.</span></RouterLink
      ><span>让每一件好物，都有新的故事。</span
      ><small>MOCK 展示 · 商品与价格均为示例</small>
    </footer>
    <FloatingDock />
  </div>
</template>

<style scoped>
.section-eyebrow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  color: #a1a0a9;
  font-size: 10px;
}
.section-eyebrow > span:first-child {
  letter-spacing: 1.8px;
  color: #7e7d87;
  display: flex;
  align-items: center;
  gap: 7px;
}
.section-eyebrow i {
  width: 5px;
  height: 5px;
  background: #ee4841;
  border-radius: 50%;
}
.discovery {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 20px;
}
.recommend-heading {
  height: 42px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
.recommend-heading h1 {
  font-size: 20px;
  letter-spacing: -0.4px;
  margin: 0;
}
.recommend-heading h1 span {
  font-size: 10px;
  color: #aaa9b1;
  font-weight: 400;
  margin-left: 14px;
  letter-spacing: 0;
}
.recommend-heading > button {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  color: #8e8d96;
}
.recommend-matrix {
  display: grid;
  grid-template-columns: minmax(210px, 0.82fr) minmax(0, 1.7fr);
  gap: 15px;
  height: calc(100% - 42px);
}
.feature-banner {
  position: relative;
  border-radius: 16px;
  background: linear-gradient(145deg, #fc683f, #f14537 60%, #e6372e);
  color: white;
  padding: 25px 22px;
  overflow: hidden;
  min-height: 385px;
}
.banner-label {
  font-size: 9px;
  letter-spacing: 1.4px;
  color: #ffe1d4;
}
.feature-banner h2 {
  font-size: 36px;
  line-height: 1.18;
  letter-spacing: -1px;
  margin: 19px 0 12px;
  position: relative;
  z-index: 2;
}
.feature-banner h2 span {
  color: #ffdf9e;
}
.feature-banner p {
  font-size: 11px;
  color: #ffdbd2;
  line-height: 1.9;
  position: relative;
  z-index: 2;
}
.banner-button {
  display: flex;
  align-items: center;
  gap: 18px;
  font-size: 12px;
  font-weight: 600;
  background: #fff4de;
  color: #d8442f;
  border-radius: 30px;
  padding: 10px 17px;
  position: relative;
  z-index: 3;
}
.banner-button:hover {
  background: white;
}
.banner-vertical {
  position: absolute;
  right: 14px;
  top: 35px;
  writing-mode: vertical-rl;
  font-size: 8px;
  letter-spacing: 2px;
  color: #ffc2ad;
}
.banner-art {
  position: absolute;
  width: 205px;
  height: 205px;
  right: -6px;
  bottom: 23px;
  transform: rotate(-10deg);
}
.banner-art :deep(svg) {
  border-radius: 50%;
}
.banner-orbit {
  position: absolute;
  width: 300px;
  height: 190px;
  border: 1px solid #ffc9b83b;
  border-radius: 50%;
  right: -47px;
  bottom: 29px;
  transform: rotate(-29deg);
}
.banner-sticker {
  position: absolute;
  bottom: 50px;
  left: 18px;
  z-index: 2;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #ffe7a2;
  color: #ad462d;
  display: grid;
  align-content: center;
  text-align: center;
  font-size: 10px;
  transform: rotate(-14deg);
  border: 3px solid #ffbd79;
}
.banner-sticker b {
  font-size: 11px;
  margin-top: 3px;
}
.banner-bottom {
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 13px;
  left: 20px;
  right: 20px;
  font-size: 8px;
  color: #ffd1bf;
}
.channel-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}
.channel-card {
  padding: 17px 14px 11px;
  border-radius: 14px;
  overflow: hidden;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}
.channel-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 22px #2422380b;
}
.channel-title {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  font-size: 16px;
  font-weight: 650;
}
.channel-title svg {
  color: #8b8188;
}
.channel-card > p {
  font-size: 9px;
  color: #928991;
  margin: 6px 0 12px;
}
.channel-content {
  display: grid;
  grid-template-columns: 0.85fr 1fr 1fr;
  align-items: end;
  gap: 7px;
}
.channel-decoration {
  padding: 0;
  height: 89px;
  margin-left: -5px;
}
.channel-decoration :deep(svg) {
  mix-blend-mode: multiply;
}
.mini-product {
  background: #ffffffc9;
  border: 1px solid #ffffffbd;
  border-radius: 8px;
  overflow: hidden;
  padding: 4px 4px 5px;
  text-align: center;
  transition: transform 0.2s;
}
.mini-product:hover {
  transform: translateY(-3px);
}
.mini-image {
  aspect-ratio: 1;
  border-radius: 5px;
  overflow: hidden;
}
.mini-product > span {
  display: block;
  font-size: 12px;
  color: #ef4741;
  font-weight: 700;
  margin-top: 5px;
}
.mini-product small {
  font-size: 9px;
  margin-right: 1px;
}
.trust-strip {
  display: flex;
  gap: 22px;
  align-items: center;
  padding: 18px 8px;
  font-size: 10px;
  color: #9998a0;
  border-bottom: 1px solid #e8e8ec;
  margin-bottom: 29px;
}
.trust-strip > span {
  display: flex;
  gap: 6px;
  align-items: center;
}
.trust-strip b {
  font-size: 11px;
  color: #74727d;
  font-weight: 500;
}
.trust-strip svg {
  color: #c58272;
}
.trust-strip i {
  width: 1px;
  height: 9px;
  background: #dddce2;
}
.trust-note {
  margin-left: auto;
}
.feed-section {
  scroll-margin-top: 24px;
}
.feed-heading {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 18px;
}
.feed-heading h2 {
  font-size: 22px;
  margin: 0;
  letter-spacing: -0.5px;
}
.feed-heading h2 > span {
  font-size: 11px;
  font-weight: 400;
  color: #a2a1aa;
  margin-left: 15px;
  letter-spacing: 0;
}
.feed-counter {
  color: #a7a6af;
  font-size: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.red-dot {
  width: 5px;
  height: 5px;
  background: #ee4741;
  border-radius: 50%;
}
.feed-tabs {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 1px 1px 20px;
  scrollbar-width: none;
}
.feed-tabs > button {
  border-radius: 22px;
  padding: 10px 21px;
  white-space: nowrap;
  background: white;
  font-size: 12px;
  border: 1px solid #eae9ee;
  display: flex;
  gap: 5px;
  align-items: center;
  transition: background 0.2s;
}
.feed-tabs > button:hover {
  background: #fff0ee;
}
.feed-tabs > button.selected {
  background: #ffdc62;
  color: #493b18;
  border-color: #ffdc62;
  font-weight: 650;
}
.goods-feed {
  display: grid;
  grid-template-columns: repeat(var(--feed-columns), minmax(0, 1fr));
  align-items: start;
  column-gap: 18px;
}
.goods-column {
  min-width: 0;
}
.filter-summary {
  margin: 0 0 18px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #7a7885;
}
.filter-summary button {
  color: #ef4741;
}
.feed-end {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: #b0afb7;
  font-size: 11px;
  padding: 30px 0 38px;
}
.feed-end span {
  height: 1px;
  width: 55px;
  background: #dedee4;
}
.market-footer {
  display: flex;
  align-items: center;
  gap: 16px;
  border-top: 1px solid #e5e5ea;
  padding: 24px 0 0;
  font-size: 11px;
  color: #a4a3ac;
}
.market-footer > a {
  font-size: 17px;
  font-weight: 700;
  color: #65636e;
}
.market-footer > a span {
  color: #ef4741;
}
.market-footer small {
  margin-left: auto;
  font-size: 9px;
}
@media (max-width: 1100px) {
  .discovery {
    grid-template-columns: 195px minmax(0, 1fr);
    gap: 15px;
  }
  .recommend-matrix {
    grid-template-columns: 0.8fr 1.6fr;
    gap: 10px;
  }
  .feature-banner {
    padding: 24px 17px;
  }
  .feature-banner h2 {
    font-size: 32px;
  }
  .channel-grid {
    gap: 10px;
  }
  .channel-card {
    padding: 16px 10px 12px;
  }
  .channel-content {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .channel-decoration {
    display: none;
  }
  .recommend-heading h1 span {
    display: none;
  }
  .trust-strip {
    gap: 13px;
  }
  .trust-note {
    display: none !important;
  }
}
@media (max-width: 800px) {
  .discovery {
    grid-template-columns: 1fr;
  }
  .recommend-matrix {
    height: auto;
    grid-template-columns: 0.8fr 1.6fr;
  }
  .recommend-heading {
    height: 45px;
  }
  .feature-banner {
    min-height: 365px;
  }
  .trust-strip {
    justify-content: center;
  }
  .trust-strip > span:nth-last-child(2),
  .trust-strip > i:nth-last-child(3) {
    display: none;
  }
  .section-eyebrow > span:last-child {
    display: none;
  }
}
@media (max-width: 600px) {
  .recommend-matrix {
    grid-template-columns: 1fr;
  }
  .feature-banner {
    min-height: 280px;
  }
  .feature-banner h2 {
    font-size: 34px;
    margin-top: 15px;
  }
  .feature-banner p {
    margin-bottom: 15px;
  }
  .banner-art {
    width: 240px;
    height: 240px;
    right: 0;
    bottom: 13px;
  }
  .banner-sticker {
    left: auto;
    right: 10px;
    bottom: 40px;
  }
  .banner-orbit {
    right: -8px;
  }
  .channel-card {
    min-height: 166px;
  }
  .channel-title {
    font-size: 14px;
  }
  .mini-image {
    max-height: 92px;
  }
  .goods-feed {
    column-gap: 12px;
  }
  .feed-heading h2 > span {
    display: block;
    margin: 8px 0 0;
  }
  .feed-counter {
    font-size: 9px;
  }
  .feed-tabs > button {
    padding: 9px 16px;
  }
  .trust-strip {
    font-size: 9px;
    gap: 12px;
  }
  .trust-strip > span:nth-child(4),
  .trust-strip > i {
    display: none;
  }
  .market-footer {
    gap: 8px;
    flex-wrap: wrap;
  }
  .market-footer small {
    width: 100%;
    margin-left: 0;
  }
  .recommend-heading h1 {
    font-size: 18px;
  }
}
</style>
