/**
 * 用户信息
 */
export type User = {
  id: string
  token: string
  avatar: string
  account: string
  mobile: string
}

// 短信验证码类型，登录|注册|修改手机号|忘记密码|绑定手机号
export type CodeType =
  | 'login'
  | 'register'
  | 'changeMobile'
  | 'forgetPassword'
  | 'bindMobile'
