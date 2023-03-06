<script setup lang="ts">
import type {
  KnowledgeList,
  KnowledgeParams,
  KnowledgeType
} from '@/types/consult'
import { ref } from 'vue'
import { getKnowledgePage } from '@/services/consult'
const props = defineProps<{
  type: KnowledgeType
}>()

// 获取用户信息

const list = ref<KnowledgeList>([])
const loading = ref(false)
const finished = ref(false)

const reqParams = ref<KnowledgeParams>({
  current: 1,
  pageSize: 10,
  type: props.type
})

const onLoad = async () => {
  // 加载数据
  const res = await getKnowledgePage(reqParams.value)
  list.value.push(...res.data.rows)
  if (reqParams.value.current >= res.data.pageTotal) {
    finished.value = true
  } else {
    reqParams.value.current++
  }
  loading.value = false
}
</script>

<template>
  <div class="knowledge-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <knowledge-card v-for="(item, i) in list" :key="i" :item="item" />
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
