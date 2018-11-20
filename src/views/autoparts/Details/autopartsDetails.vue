<template>
    <div  class="bjColor">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item @click="$router.push('/')">首页</el-breadcrumb-item>
            <el-breadcrumb-item @click="$router.push('/autoparts')">订单列表</el-breadcrumb-item>
            <el-breadcrumb-item>订单详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="clearFix" :data="tableData">
            <div class="fl xinxibox">
                <p>配件信息</p>
                <ul >
                    <li>配件分类：{{ tableData.partsCaregoryName }}</li>
                    <li>配件名称：{{ tableData.partsTypeName }}</li>
                    <li>零件编号：{{ tableData.partsNum }}</li>
                    <li>备注：{{ tableData.remark }}</li>
                    <li>残值金额：{{ tableData.reportNo }}</li>
                    <!-- <li>残值金额：{{ tableData.carScrapOrderAutopartsList.amount }}</li> -->
                </ul>
            </div>
            <div class="fl xinxibox">
                <p>取件信息</p>
                <ul >
                    <li>取件联系人：{{ tableData.takeCarContacts }}</li>
                    <li>联系人电话：{{ tableData.takeCarContactNumber }}</li>
                    <li>取件时间：{{ tableData.takeCarTime }}</li>
                    <li>取件地址：{{ tableData.takeCarAddress }}</li>
                </ul>
            </div>
            <div class="fl xinxibox">
                <p>车辆信息</p>
                <ul >
                    <li>订单编号：{{ tableData.orderNo }}</li>
                    <li>车牌号：{{ tableData.carNumber }}</li>
                    <li>车架号：{{ tableData.carFrameNumber }}</li>
                    <li>车辆型号：{{ tableData.carModelNumberName }}</li>
                    <li>报案号：{{ tableData.reportNo }}</li>
                </ul>
            </div>
        </div>
        <div class="clearFix">
            <p>配件照片</p>
            <div style="margin:20px 0;" class="fl">
                <span v-for="item in tableData.autoPartsPictures" :key="item" style="margin:0 10px;">
                    <img :src="item.url" width="120" height="90"/>
                </span>
                <!-- <img :src="tableData.autoPartsPictures" width="120" height="90"/> -->
            </div>
            <div class="fr" style="margin-right:400px;">
                <ul >
                    <li>接收日期：{{ tableData.acceptTime }}</li>
                    <li>出库日期：{{ tableData.outageTime }}</li>
                    <li>返款日期：{{ tableData.repaymentTime }}</li>
                </ul>
            </div>
        </div>
        <div>
            <el-button type="primary" style="margin-top:30px;" @click="$router.push('/autoparts')">返回</el-button>
        </div>
    </div>
</template>
<script>
import { getautopartsDetails } from '@/api/order'
export default {
  data () {
    return {
      tableData: [],
      id: ''
    }
  },
  methods: {
    // 查看详情
    async OrderListDetails (id) {
      let data = {
        id: id
      }
      const response = await getautopartsDetails(data)
      if (response.data.code === 200) {
        this.tableData = response.data.data
        console.log(response.data.data)
      } else {
        console.log('全部订单列表获取失败')
      }
    }
  },
  mounted () {
    var id = this.$route.query.id
    console.log(this.$route.query.id)
    // this.id = this.$route.query.id;
    this.OrderListDetails(id)
  }

}
</script>
<style>
    ul{margin: 0;padding:0;}
    li{list-style: none;}
    .fl{
        float: left;
    }
    .fr{
        float: right;
    }
    .clearFix:after{
        clear: both;
        content: "";
        display: block;
    }
    .xinxibox{
        margin: 0 80px;
    }
    /* .el-main{
        background: #fff;
    } */
</style>
