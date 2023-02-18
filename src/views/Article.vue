<script setup lang="ts">
import cpRadioBtn from '@/components/cp-radio-btn.vue'
import { ref } from 'vue'
const options = [
  { label: '女', value: 0 },
  { label: '男', value: 1 }
]

const defaults = ref(1)
</script>

<template>
  <div class="article-page">
    <cpRadioBtn :options="options" v-model="defaults"></cpRadioBtn>
  </div>
</template>

<style lang="scss" scoped></style>
