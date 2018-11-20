<template>
    <el-container>
    <el-aside width="200px">
        <div style="height:60px;"></div>
       <el-row class="tac">
        <el-col :span="24">
            <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#2b8cf5"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1" @click="$router.push('/Order')">
                <span slot="title" >订单管理</span>
            </el-menu-item>
            <el-menu-item index="2" @click="$router.push('/autoparts')">
                <span slot="title" >配件查询</span>
            </el-menu-item>
            </el-menu>
        </el-col>
        </el-row>
    </el-aside>
    <el-container>
        <el-header class="indexHeader">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1" @click="$router.push('/')">首页</el-menu-item>
                <el-menu-item index="2">整车报废</el-menu-item>
                <el-menu-item index="3" @click="$router.push('/Order')">旧件回收</el-menu-item>
                <el-menu-item index="4">配件交易</el-menu-item>
                <el-menu-item index="5">拍卖大厅</el-menu-item>
                <el-menu-item index="6">常见问题</el-menu-item>
                <el-menu-item index="7">关于我们</el-menu-item>
            </el-menu>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
        <el-footer >
            <el-col :span="12"><div class="grid-content bg-purple">Copyright@2018-2020 GG科技有限公司 京ICP备xxxxxxx号 京公网安备 1254653号</div></el-col>
            <el-col :span="4" :offset="8"><div class="grid-content bg-purple">400-000-6766   周一至周日 9:00-17:00</div></el-col>
        </el-footer>
    </el-container>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style>
  .el-header{
    text-align: center;
    line-height: 60px;
    color:#2b8cf5;
  }

  .el-aside {
    height: 100%;
    background-color: #2b8cf5;
    color: #333;
    text-align: center;
    line-height: 200px;
    position: absolute;
    top: 0;
    left: 0;
  }

  .el-main {
    color: #333;
    min-height: 500px;
    max-height: 600px;
    overflow-y: auto;

  }

.el-container {
    margin-bottom: 40px;
    
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .el-footer{
      width: 100%;
      height:40px !important;
      line-height: 40px;
      background-color: #004299;
      color: #fff;
      position: fixed;
      bottom:0;
      left:0;
      z-index:1;
    }
</style>
