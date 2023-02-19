import type {
  CodeType,
  UserInfo,
  User,
  PatientList,
  Patient
} from '@/types/user'
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

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return request<UserInfo>('/patient/myUser')
}

/**
 * 获取信息列
 */
export const getPatientList = () => {
  return request<PatientList>('/patient/mylist')
}

/**
 * 添加患者信息
 * @param patient
 */
export const addPatient = (patient: Patient) => {
  return request('/patient/add', 'POST', patient)
}

/**
 * 编辑患者信息
 * @param patient
 */
export const editPatient = (patient: Patient) => {
  return request('/patient/update', 'PUT', patient)
}

/**
 * 删除患者
 * @param id
 */
export const delPatient = (id: string) => {
  return request(`/patient/del/${id}`, 'DELETE')
}
