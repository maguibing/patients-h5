<script setup lang="ts">
import { request } from '@/services/request'
import { useUserStore } from '@/stores'
import type { User } from '@/types/user'

const store = useUserStore()

// const login = async () => {
//   const res = await request<User>('/login/password', 'post', {
//     mobile: '13211112222',
//     password: 'abc12345'
//   })

//   store.setUser(res.data)
// }
</script>

<template>
  <main></main>
</template>
