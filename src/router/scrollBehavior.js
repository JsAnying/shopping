export function scrollBehavior(to, from, savedPosition) {
  // 浏览器前进/后退时恢复该历史记录的滚动位置。
  if (savedPosition) return savedPosition

  // 同一页面切换查询参数（如商品分类）时，保留当前滚动位置。
  if (to.path === from.path && to.hash === from.hash) return false

  return { top: 0 }
}
