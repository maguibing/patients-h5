import type { User } from '@/types/user'
import { request } from './request'

/**
 * 密码登陆
 * @param mobile
 * @param password
 */
export const loginByPassword = (mobile: string, password: string) => {
  return request<User>('/login/password', 'POST', { mobile, password })
}
