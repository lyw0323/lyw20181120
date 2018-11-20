<template>
    <el-container>
    <el-header class="topbar">
        <div>
            <el-col :span="4" class="fl"><img src="@/assets/logo.png"></el-col>
            <el-col :span="4" class="fr" style="color:#0c84e0;">咨询热线： 400-000-0000</el-col>
            <div class="topcity fl">
                <b class="fl" style="color:#0c84e0;margin-right: 10px;">北京</b>
                <div class="btn-group fl">
                    <el-dropdown class="fl">
                        <span class="el-dropdown-link">
                            [ 切换城市<i class="el-icon-arrow-down el-icon--right"></i> ]
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>长春</el-dropdown-item>
                            <el-dropdown-item>济南</el-dropdown-item>
                            <el-dropdown-item>上海</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <div class="fl">
                        <a href="" style="margin-left:15px;">长春</a>
                        <a href="" style="margin-left:15px;">济南</a>
                        <a href="" style="margin-left:15px;">上海</a>
                    </div>
                </div>
            </div>
        </div>
    </el-header>
    <el-main>
        <h1 class="indexText">您身边专业的汽车报废专家</h1>
        <div class="tiaozhuan clearFix">
            <div class="tiaozhuanli">
                <el-button type="primary" plain @click="$router.push('/login')">车主报废</el-button>
            </div>
            <div class="tiaozhuanli">
                <el-button type="primary" plain @click="$router.push('/login')" >大客户通道</el-button>
            </div>
            <div class="tiaozhuanli">
                <el-button type="primary" plain @click="$router.push('/login')">旧件回收</el-button>
            </div>
        </div>
        <div class="blockBox">
            <div class="block">
                <el-carousel height="280px" >
                    <el-carousel-item v-for="item in ment" :key="item">
                        <div class="menttitle">
                            <img :src="item.url"/>
                            <h3>{{ item.title }}</h3>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <div class="indexbg"></div>
    </el-main>
    <el-footer >
        <el-col :span="12"><div class="grid-content bg-purple">Copyright@2018-2020 GG科技有限公司 京ICP备xxxxxxx号 京公网安备 1254653号</div></el-col>
        <el-col :span="5" :offset="6"><div class="grid-content bg-purple">400-000-6766   周一至周日 9:00-17:00</div></el-col>
    </el-footer>
    </el-container>
</template>
<script>
import { getadvertisement, login, getTest } from '@/api/home'
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      ment: ''
    }
  },
  methods: {
    // 轮播图
    async advertisement () {
      const response = await getadvertisement()
      console.log(response)
      if (response.data.code === 200) {
        this.ment = response.data.data
      } else {
        console.log('轮播图获取失败')
      }
    }
  },
  mounted () {
    this.advertisement()
  }
}
</script>

<style>
    .indexbg{
        position:fixed;
        width:100%;
        height:60%;
        bottom:0; 
        background:url('../assets/bg.jpg') center top no-repeat;
        z-index:-10;
    } 
    .tiaozhuanli{
        width: 240px;
        height: 83px;
        margin: 0 30px;
        background: url('../assets/indexbtn.png') 0 14px no-repeat;
        float: left;
    }
</style>
