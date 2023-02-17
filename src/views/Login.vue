<script setup lang="ts">
import { loginByMobile, loginByPassword, sendMobileCode } from '@/services/user'
import { useUserStore } from '@/stores'
import { mobileRules, passwordRules, codeRules } from '@/utils/rule'
import { Toast, type FormInstance } from 'vant'
import { $ref } from 'vue/macros'
import { reactive, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface IForm {
  mobile: string
  password: string
  agree: boolean
}

const isPass = $ref(true)
const show = $ref(false)
const code = $ref('')
let time = $ref(0)
const timer = $ref<number>()
const form = $ref<FormInstance>()

const loginForm: IForm = reactive({
  mobile: '13230000001',
  password: 'abc12345',
  agree: false
})

const route = useRoute()
const router = useRouter()
const store = useUserStore()

// 登录
const login = async () => {
  if (!loginForm.agree) return Toast('请勾选')
  const res = isPass
    ? await loginByPassword(loginForm.mobile, loginForm.password)
    : await loginByMobile(loginForm.mobile, code)
  store.setUser(res.data)
  router.push((route.query.returnUrl as string) || '/user')
  Toast.success('登陆成功')
}

// 获取验证码
const getcode = async () => {
  if (time > 0) return
  await form?.validate('mobile')
  await sendMobileCode(loginForm.mobile, 'login')
  time = 60
  Toast.success('发送成功')
  clearInterval(timer)
  setInterval(() => {
    time--
    if (time <= 0) window.clearInterval(timer)
  }, 1000)
}

onUnmounted(() => {
  window.clearInterval(timer)
})
</script>

<template>
  <div class="login-page">
    <cp-nav-bar
      right-text="注册"
      @click-right="$router.push('/register')"
    ></cp-nav-bar>
    <!-- 头部 -->
    <div class="login-head">
      <h3>{{ isPass ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="javascript:;" @click="isPass = !isPass">
        <span>{{ !isPass ? '密码登录' : '短信验证码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 表单 -->
    <van-form autocomplete="off" ref="form" @submit="login">
      <van-field
        placeholder="请输入手机号"
        type="tel"
        name="mobile"
        v-model="loginForm.mobile"
        :rules="mobileRules"
      ></van-field>
      <van-field
        v-if="isPass"
        v-model="loginForm.password"
        placeholder="请输入密码"
        :type="show ? 'text' : 'password'"
        :rules="passwordRules"
      >
        <template #button>
          <cpIcon
            @click="show = !show"
            :name="`login-eye-${show ? 'on' : 'off'}`"
          ></cpIcon>
        </template>
      </van-field>
      <van-field
        v-else
        v-model="code"
        :rules="codeRules"
        placeholder="短信验证码"
      >
        <template #button>
          <span class="btn-send" @click="getcode">
            {{ time > 0 ? `${time}s后再次发送` : '发送验证码' }}</span
          >
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="loginForm.agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit"
          >登 录</van-button
        >
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-page {
    padding-top: 46px;
  }

  &-head {
    display: flex;
    padding: 30px 30px 50px;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;

    h3 {
      font-weight: normal;
      font-size: 24px;
    }

    a {
      font-size: 15px;
    }
  }

  &-other {
    margin-top: 60px;
    padding: 0 30px;

    .icon {
      display: flex;
      justify-content: center;

      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}

.van-form {
  padding: 0 14px;

  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }

  .btn-send {
    color: var(--cp-primary);

    &.active {
      color: rgba(22, 194, 163, 0.5);
    }
  }
}
</style>
