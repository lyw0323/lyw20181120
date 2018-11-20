<template>
    <el-container>
        <el-main>
            <div class="inputBox">
                <h3>企业用户登陆</h3>
                <div class="demo-input-suffix">
                    <el-input v-model="input" placeholder="superadmin"></el-input>
                </div>
                <div class="demo-input-suffix">
                    <el-input v-model="password" placeholder="admin1" type="password"></el-input>
                </div>
                <el-button type="primary" plain @click="getLogin">登陆</el-button>
            </div>

        </el-main>
    </el-container>
</template>
<script>
import { login, getTest } from '@/api/home'
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      input: '',
      password: ''
    }
  },
  methods: {
    // 登陆
    async getLogin () {
      const response = await login({})
      if (response.data.code === 200) {
        Cookies.set('TT_TICKET', response.data.data.TICKET_)
        console.log('登录信息')
        console.log(response)
        // this.$router.replace('/order')
        this.$router.push({name: 'index'})
      }
    }
  },
  mounted () {

  }
}

</script>
<style>
    .inputBox{
        width: 500px;
        padding: 20px 40px 40px;
        background: rgba(255,255,255,0.8);
        position: absolute;
        top: 25%;
        left: 50%;
        margin-left: -250px;
        border-radius: 10px;
        z-index: 1000;
        box-shadow: 2px 2px 10px #356cbe;
        text-align: center;
    }
    .inputBox .el-input{
        margin-bottom: 15px;
        padding: 20px 5px;
    }
    .inputBox .el-button{
        width: 100%;
        color: #fff;
        background-color: #1b62c2;
        border-color: #1b62c2;
        padding: 10px 16px;
        font-size: 18px;
        line-height: 1.3333333;
        border-radius: 6px;
    }
</style>
