import { ref } from 'vue'
import { followOrUnfollow } from '@/services/consult'
import type { Doctor, FollowType } from '@/types/consult'
/**
 * 关注的钩子
 */
export const useFollow = (type: FollowType = 'doc') => {
  const loading = ref(false)
  const follow = async (item: { id: string; likeFlag: 1 | 0 }) => {
    loading.value = true
    try {
      await followOrUnfollow(item.id, type)
      item.likeFlag = item.likeFlag === 1 ? 0 : 1
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    follow
  }
}
