import { beforeEach, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
vi.mock('@/api/user.js', () => ({ loginApi: vi.fn() }))
import { loginApi } from '@/api/user.js'
import { useUserStore } from './user.js'

beforeEach(() => {
  const values = new Map()
  vi.stubGlobal('localStorage', {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key),
  })
  setActivePinia(createPinia())
})

it('登录持久化并能从新 Pinia 实例恢复，退出清除所有状态', async () => {
  loginApi.mockResolvedValue({ token: 'abc', userInfo: { username: 'demo' } })
  const user = useUserStore()
  await user.login({ username: 'demo', password: 'secret' })
  expect(user.isLoggedIn).toBe(true)
  setActivePinia(createPinia())
  const restored = useUserStore()
  expect(restored.token).toBe('abc')
  expect(restored.userInfo).toEqual({ username: 'demo' })
  restored.logout()
  expect(restored.isLoggedIn).toBe(false)
  expect(restored.userInfo).toBeNull()
  expect(localStorage.getItem('market_token')).toBeNull()
  expect(localStorage.getItem('market_user')).toBeNull()
})

it('缺少 token 的响应不能成为已登录状态', async () => {
  loginApi.mockResolvedValue({ userInfo: {} })
  const user = useUserStore()
  await expect(user.login({})).rejects.toThrow('Token')
  expect(user.isLoggedIn).toBe(false)
})

it('损坏的持久化用户资料不会阻止启动', () => {
  localStorage.setItem('market_user', '{invalid')
  expect(useUserStore().userInfo).toBeNull()
  expect(localStorage.getItem('market_user')).toBeNull()
})
