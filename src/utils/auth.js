const TOKEN_KEY = 'market_token'
const USER_KEY = 'market_user'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || ''
}

export function getUserInfo() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || 'null')
  } catch {
    localStorage.removeItem(USER_KEY)
    return null
  }
}

export function saveSession(token, userInfo) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(userInfo))
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

// 只允许站内路径，且避免登录页相互跳转造成循环。
export function safeRedirect(value) {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//') || /[\\\u0000-\u0020]/.test(value)) return '/'
  if (/^\/(login|register)(?:[/?#]|$)/.test(value)) return '/'
  return value
}
