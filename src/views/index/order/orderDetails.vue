<template>
    <div class="bjColor">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item @click="$router.push('/')">首页</el-breadcrumb-item>
            <el-breadcrumb-item @click="$router.push('/orderDetails')">订单列表</el-breadcrumb-item>
            <el-breadcrumb-item>订单详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="clearFix" :data="tableData">
            <div class="fl xinxibox">
                <p>车辆信息</p>
                <ul >
                    <li>订单编号：{{ tableData.orderNo }}</li>
                    <li>车牌号：{{ tableData.carNumber }}</li>
                    <li>车架号：{{ tableData.carFrameNumber }}</li>
                    <li>车辆型号：{{ tableData.carModelNumber }}</li>
                    <li>报案号：{{ tableData.reportNo }}</li>
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
        </div>
        <div>
            <p>配件信息</p>
            <el-table
                :data="tableData.carScrapOrderAutopartsList"
                stripe
                style="width: 100%;font-size:12px;">
                <el-table-column
                prop="partsTypeName"
                label="配件分类"
                width="180">
                </el-table-column>
                <el-table-column
                prop="partsName"
                label="配件名称"
                width="100">
                </el-table-column>
                <el-table-column
                prop="partsNum"
                label="零件编号">
                </el-table-column>
                <el-table-column
                prop="amount"
                label="残值金额"
                width="80">
                </el-table-column>
                <el-table-column
                prop="receiveTime"
                label="取回时间"
                width="180">
                </el-table-column>
                <el-table-column
                prop="remark"
                label="备注"
                width="100">
                </el-table-column>
                <el-table-column
                prop=""
                label="配件照片">
                    <template slot-scope="scope">
                        <span v-for="item in scope.row.autoPartsPictures" :key="item">
                            <img :src="item.url" width="120" height="90"/>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <el-button type="primary" style="margin-top:30px;" @click="$router.push('/order')">返回</el-button>
        </div>
    </div>
</template>
<script>
import { getDetails } from '@/api/order'
export default {
  data () {
    return {
      tableData: '',
      id: ''
    }
  },
  methods: {
    // 查看详情
    async OrderListDetails (id) {
      let data = {
        id: id
      }
      const response = await getDetails(data)
      if (response.data.code === 200) {
        this.tableData = response.data.data
        console.log(this.tableData.carScrapOrderAutopartsList)
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
        margin: 0 100px;
    }
    /* .el-main{
        background: #fff;
    } */
</style>
