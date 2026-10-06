<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import MarketIcon from "./MarketIcon.vue";
const panel = ref("");
const feedback = ref("");
const submitted = ref(false);
function openPanel(name) {
  panel.value = name;
  submitted.value = false;
}
function submitFeedback() {
  if (!feedback.value.trim()) {
    ElMessage.warning("请先填写你的建议");
    return;
  }
  try {
    const previous = JSON.parse(
      localStorage.getItem("market_feedback") || "[]",
    );
    const entries = Array.isArray(previous) ? previous : [];
    localStorage.setItem(
      "market_feedback",
      JSON.stringify([
        ...entries,
        { content: feedback.value.trim(), createdAt: new Date().toISOString() },
      ]),
    );
    feedback.value = "";
    submitted.value = true;
  } catch {
    ElMessage.error("本地保存失败，请检查浏览器存储设置");
  }
}
function backToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>
<template>
  <aside class="floating-dock" aria-label="快捷操作">
    <RouterLink class="dock-publish" to="/publish"
      ><span><MarketIcon name="plus" :size="28" /></span
      ><b>发布闲置</b></RouterLink
    >
    <button @click="openPanel('messages')">
      <MarketIcon name="message" /><span>消息</span></button
    ><button @click="openPanel('mobile')">
      <MarketIcon name="phone" /><span>手机端</span></button
    ><button @click="openPanel('feedback')">
      <MarketIcon name="feedback" /><span>反馈</span></button
    ><button class="dock-top" @click="backToTop">
      <MarketIcon name="up" /><span>回到顶部</span>
    </button>
  </aside>
  <el-dialog
    :model-value="Boolean(panel)"
    :title="
      {
        messages: '消息中心',
        mobile: '手机也能逛好物',
        feedback: '你的建议，我们在听',
      }[panel]
    "
    width="min(440px, 90vw)"
    @close="panel = ''"
  >
    <template v-if="panel === 'messages'"
      ><el-empty description="暂时没有新消息" :image-size="90" />
      <p class="dialog-note">
        当前为离线展示，聊天消息将在后端接入后开放。
      </p></template
    >
    <template v-if="panel === 'mobile'"
      ><div class="mobile-symbol"><MarketIcon name="phone" :size="64" /></div>
      <p>在手机浏览器打开本站地址，即可使用移动端布局。</p>
      <p class="dialog-note">
        本地开发时，请用
        <code>npm run dev -- --host</code> 启动，并在同一局域网内访问电脑 IP
        与端口。暂无独立 App。
      </p></template
    >
    <template v-if="panel === 'feedback'"
      ><el-result
        v-if="submitted"
        icon="success"
        title="建议已保存在本机"
        sub-title="感谢你的建议！后端接入后可启用在线提交。"
      />
      <form v-else @submit.prevent="submitFeedback">
        <label class="feedback-label" for="feedback-text"
          >你想让拾光变得更好的一点是？</label
        ><el-input
          id="feedback-text"
          v-model="feedback"
          type="textarea"
          :rows="5"
          maxlength="500"
          show-word-limit
          placeholder="页面体验、功能建议，或任何小想法……"
        />
        <p class="dialog-note">此版本仅保存至本机浏览器，不发送至服务器。</p>
        <el-button type="primary" native-type="submit">保存建议</el-button>
      </form></template
    >
  </el-dialog>
</template>
<style scoped>
.floating-dock {
  position: fixed;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: #fff;
  border: 1px solid #efedf0;
  box-shadow: 0 6px 25px #3530400a;
  border-radius: 40px;
  width: 64px;
  padding: 10px 5px;
  z-index: 30;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
}
.floating-dock > button,
.dock-publish {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  font-size: 9px;
  color: #96929b;
  width: 100%;
  padding: 11px 0;
  border-radius: 18px;
  transition:
    background 0.2s,
    color 0.2s;
}
.floating-dock > button:hover {
  background: #fff0ee;
  color: #ef4741;
}
.dock-publish {
  padding: 0 0 9px;
  color: #ef4741;
}
.dock-publish > span {
  background: #ef4741;
  display: grid;
  place-items: center;
  border-radius: 50%;
  height: 47px;
  width: 47px;
  color: white;
  box-shadow: 0 5px 12px #ef474131;
  transition: transform 0.2s;
}
.dock-publish:hover > span {
  transform: rotate(90deg);
}
.dock-publish b {
  font-weight: 550;
  font-size: 9px;
}
.dock-top {
  border-top: 1px solid #f1eef1;
  border-radius: 0 !important;
}
.dialog-note {
  font-size: 12px;
  line-height: 1.8;
  color: #9c97a1;
}
.mobile-symbol {
  display: grid;
  place-items: center;
  color: #ef4741;
  padding: 20px;
}
.feedback-label {
  display: block;
  margin-bottom: 12px;
  font-size: 13px;
}
@media (max-width: 1400px) {
  .floating-dock {
    right: 8px;
    width: 52px;
  }
  .dock-publish > span {
    height: 39px;
    width: 39px;
  }
  .floating-dock {
    opacity: 0.97;
  }
}
@media (max-width: 700px) {
  .floating-dock {
    top: auto;
    bottom: 18px;
    transform: none;
    right: 14px;
    padding: 6px;
    width: 54px;
  }
  .floating-dock > button {
    display: none;
  }
  .dock-publish {
    padding: 0;
  }
  .dock-publish b {
    font-size: 8px;
  }
}
</style>
