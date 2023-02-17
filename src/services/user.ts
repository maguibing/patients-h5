import type { CodeType, User } from '@/types/user'
import { request } from './request'

/**
 * 密码登陆
 * @param mobile
 * @param password
 */
export const loginByPassword = (mobile: string, password: string) => {
  return request<User>('/login/password', 'POST', { mobile, password })
}

/**
 * 手机号码登录
 * @param mobile
 * @param code
 */
export const loginByMobile = (mobile: string, code: string) => {
  return request<User>('/login', 'POST', { mobile, code })
}

/**
 * 获取短信验证码
 * @param mobile
 * @param type
 */
export const sendMobileCode = (mobile: string, type: CodeType) => {
  return request<{ code: string }>('/code', 'GET', { mobile, type })
}