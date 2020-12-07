<template>
  <div class="login">
    <el-form
      class="login-form"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      label-position="top"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" :loading="loginLoading" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { login } from '@/services/user'

export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      loginLoading: false,
      form: {
        phone: '15510792995',
        password: '111111'
      },
      rules: {
        phone: [
          { require: true, message: '请输入手机号', trigger: 'blur' },
          // 1开头，后面跟10位数字
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' },
        ],
        password: [
          { require: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        await (this.$refs.form as Form).validate()
        this.loginLoading = true
        const { data } = await login(this.form)
        if (data.state !== 1) {
          return this.$message.error(data.message)
        } else {
          this.$message.success(data.message)
        }
        this.$router.push({ name: 'home' })
      } catch (error) {
        console.log('登录失败', error)
      } finally {
        this.loginLoading = false
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    width: 300px;
    padding: 20px;
    background: #fff;
    border: 1px solid #fff;
    border-radius: 5px;
    .login-btn {
      width: 100%;
    }
  }
}
</style>
