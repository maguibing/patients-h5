<script setup lang="ts">
import RoomStatus from '@/components/room-status.vue'
import RoomAction from '@/components/room-action.vue'
import RoomMessage from '@/components/room-message.vue'
import type { ConsultOrderItem } from '@/types/consult'
import type { Socket } from 'socket.io-client'
import {} from '@/services/consult'
import { io } from 'socket.io-client'
import { onMounted, onUnmounted, ref } from 'vue'
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'
import { getConsultOrderDetail } from '@/services/consult'

import { MsgType } from '@/enum'
import type { Message, TimeMessages } from '@/types/room'

const list = ref<Message[]>([])

const store = useUserStore()
const route = useRoute()

let socket: Socket
onUnmounted(() => {
  socket.close()
})
onMounted(async () => {
  // 建立链接，创建 socket.io 实例
  socket = io('https://consult-api.itheima.net/', {
    auth: {
      token: `Bearer ${store.user?.token}`
    },
    query: {
      orderId: route.query.orderId
    }
  })

  socket.on('connect', () => {
    // 建立连接成功
    console.log('connect')
  })

  // 聊天记录
  socket.on('chatMsgList', ({ data }: { data: TimeMessages[] }) => {
    // 准备转换常规消息列表
    const arr: Message[] = []
    data.forEach((item, i) => {
      arr.push({
        msgType: MsgType.Notify,
        msg: { content: item.createTime },
        createTime: item.createTime,
        id: item.createTime
      })
      arr.push(...item.items)
    })
    // 追加到聊天消息列表
    list.value.unshift(...arr)
    console.log(list.value)
  })

  socket.on('error', (event) => {
    // 错误异常消息
    console.log('error')
  })

  socket.on('disconnect', () => {
    // 已经断开连接
    console.log('disconnect')
  })
})

/* 第二块 */
const consult = ref<ConsultOrderItem>()

onMounted(async () => {
  const res = await getConsultOrderDetail(route.query.orderId as string)
  consult.value = res.data

  // 订单状态 在onMounted注册
  socket.on('statusChange', async () => {
    const res = await getConsultOrderDetail(route.query.orderId as string)
    consult.value = res.data
  })
})
</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="医生问诊室" />
    <room-status :status="consult?.status" :countdown="consult?.countdown" />
    <room-message :list="list" />
    <room-action />
  </div>
</template>

<style lang="scss" scoped>
.room-page {
  padding-top: 90px;
  padding-bottom: 60px;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: var(--cp-bg);

  .van-pull-refresh {
    width: 100%;
    min-height: calc(100vh - 150px);

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
