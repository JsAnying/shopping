import { expect, it } from 'vitest'
import { scrollBehavior } from './scrollBehavior.js'

it('商品流切换分类、子类型或清除筛选时保持当前位置', () => {
  const from = { path: '/', hash: '', query: { category: 'digital' } }
  for (const query of [{ category: 'fashion' }, { category: 'digital', type: 'phone' }, {}]) {
    expect(scrollBehavior({ path: '/', hash: '', query }, from, null)).toBe(false)
  }
})

it('前进后退优先恢复历史滚动位置', () => {
  const position = { left: 0, top: 640 }
  expect(scrollBehavior({ path: '/', hash: '' }, { path: '/', hash: '' }, position)).toBe(position)
})

it('切换到商品详情等不同页面仍回到顶部', () => {
  expect(scrollBehavior({ path: '/goods/1', hash: '' }, { path: '/', hash: '' }, null)).toEqual({ top: 0 })
})
