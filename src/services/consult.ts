import type {
  DoctorPage,
  KnowledgePage,
  KnowledgeParams,
  PageParams,
  FollowType
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
