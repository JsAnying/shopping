import request from '@/utils/request.js'

export const loginApi = (credentials) => request.post('/auth/login', credentials, {
  skipAuth: true, authFailureRedirect: false,
})
export const registerApi = (data) => request.post('/auth/register', data, {
  skipAuth: true, authFailureRedirect: false,
})
