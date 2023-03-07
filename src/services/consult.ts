import type {
  DoctorPage,
  KnowledgePage,
  KnowledgeParams,
  PageParams,
  FollowType,
  Image,
  TopDep
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
