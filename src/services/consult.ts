import type {
  DoctorPage,
  KnowledgePage,
  KnowledgeParams,
  PageParams,
  FollowType,
  Image,
  TopDep,
  ConsultOrderPreParams,
  PartialConsult,
  ConsultOrderPreData,
  ConsultOrderItem
} from '@/types/consult'
import { request } from './request'

export const getKnowledgePage = (data: KnowledgeParams) => {
  return request<KnowledgePage>('/patient/home/knowledge', 'GET', data)
}

export const getDoctorPage = (params: PageParams) => {
  return request<DoctorPage>('/home/page/doc', 'GET', params)
}

export const followOrUnfollow = (id: string, type: FollowType = 'doc') =>
  request('/like', 'POST', { id, type })

/**
 * 获取菜单栏
 */
export const getAllDep = () => request<TopDep[]>('/dep/all')

/**
 * 上传图片
 * @param file
 */
export const uploadImage = (file: File) => {
  const fd = new FormData()
  fd.append('file', file)
  return request<Image>('/upload', 'POST', fd)
}

// 拉取预支付订单信息
export const getConsultOrderPre = (params: ConsultOrderPreParams) =>
  request<ConsultOrderPreData>('/patient/consult/order/pre', 'GET', params)

// 生成订单
export const createConsultOrder = (data: PartialConsult) =>
  request<{ id: string }>('/patient/consult/order', 'POST', data)

// 获取支付地址  0 是微信  1 支付宝
export const getConsultOrderPayUrl = (params: {
  paymentMethod: 0 | 1
  orderId: string
  payCallback: string
}) => request<{ payUrl: string }>('/patient/consult/pay', 'POST', params)

/**
 *
 * @param orderId
 * @returns
 */
export const getConsultOrderDetail = (orderId: string) =>
  request<ConsultOrderItem>('/patient/consult/order/detail', 'GET', { orderId })
