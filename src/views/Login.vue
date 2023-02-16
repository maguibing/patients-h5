<script setup lang="ts"></script>
<template>
  <div class="login">
    <cp-nav-bar
      title="登录"
      rightText="注册"
      @click-right="$router.push('/register')"
    ></cp-nav-bar>
  </div>
</template>

<style lang="scss" scoped></style>
