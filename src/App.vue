<script setup lang="ts">
// import { RouterView } from 'vue-router'
import { request } from './services/request'
import { useUserStore } from './stores'
const store = useUserStore()

// request('/', 'get')
</script>

<template>
  {{ store.user }}

  <hr />

  <van-button
    type="primary"
    @click="
      store.setUser({
        id: '1',
        avatar: 'aa',
        token: '1',
        account: '1',
        mobile: '1'
      })
    "
    >设置</van-button
  >

  <van-button type="primary" @click="store.delUser()">删除</van-button>
  <!-- <RouterView />/ -->
</template>
