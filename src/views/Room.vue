<script setup lang="ts">
import RoomStatus from '@/components/room-status.vue'
import RoomAction from '@/components/room-action.vue'
import RoomMessage from '@/components/room-message.vue'

import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
import { onMounted, onUnmounted } from 'vue'
// import { baseURL } from '@/utils/request'
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'

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

  socket.on('error', (event) => {
    // 错误异常消息
    console.log('error')
  })

  socket.on('disconnect', () => {
    // 已经断开连接
    console.log('disconnect')
  })
})
</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="医生问诊室" />
    <room-status />
    <room-message />
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
