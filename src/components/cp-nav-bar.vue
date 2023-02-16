<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps<{
  title?: string
  rightText?: string
}>()

const router = useRouter()
const onClickLeft = () => {
  if (history.state.back) {
    router.back()
  } else {
    router.push('/')
  }
}

const emits = defineEmits<{
  (e: 'click-right'): void
}>()

const onClickRight = () => {
  emits('click-right')
}
</script>
<template>
  <van-nav-bar
    :title="title"
    fixed
    :right-text="rightText"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
</template>

<style lang="scss" scoped>
:deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }
    &__text {
      font-size: 15px;
    }
  }
}
</style>
