<template>
    <div class="bjColor">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item >首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单列表</el-breadcrumb-item>
            <el-breadcrumb-item>订单详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="margin-top:20px;margin-bottom:20px;" class="clearFix">
            <el-input  placeholder="订单编号/车牌号/车架号/描述/联系人/联系电话" style="width:330px;"></el-input>
            <el-button type="primary">搜索</el-button>
            <el-button type="primary" class="fr" @click="$router.push('/addAllOrder')">添加新订单</el-button>
        </div>
        <el-row :style="{marginBottom: '10px' }">
            <el-button type="primary" plain @click="allOrderList">全部</el-button>
            <el-button type="primary" plain @click="unprocessed">未接单</el-button>
            <el-button type="primary" plain @click="wait">等待取回</el-button>
            <el-button type="primary" plain @click="waitgrant">等待发放残值</el-button>
            <el-button type="primary" plain @click="finished">已经完成</el-button>
            <el-button type="primary" plain @click="abnormal">异常订单</el-button>
        </el-row>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%; font-size:12px;">
            <el-table-column
                label="订单编号">
                <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
                <template slot-scope="scope">
                <span>{{ scope.row.orderNo }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="订单时间"  width="150">
                <template slot-scope="scope">
                <span>{{ scope.row.orderTime }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="报案号">
                <template slot-scope="scope">
                <span>{{ scope.row.reportNo }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="车牌号">
                <template slot-scope="scope">
                <span>{{ scope.row.carNumber }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="车架号"  width="150">
                <template slot-scope="scope">
                <span>{{ scope.row.carFrameNumber }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="描述" width="180">
                <template slot-scope="scope">
                <span>{{ scope.row.carModelNumberName }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="配件数量"
                width="80">
                <template slot-scope="scope">
                <span>{{ scope.row.totalPartsCount }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="已取回数量"
                width="80">
                <template slot-scope="scope">
                <span>{{ scope.row.receivedCount }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="残值价格" width="80">
                <template slot-scope="scope">
                <span>{{ scope.row.amount }}</span>
                </template>
            </el-table-column>
            <el-table-column
            label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.orderStatus === 1">未接单</span>
                    <span v-if="scope.row.orderStatus === 2">已接单</span>
                    <span v-if="scope.row.orderStatus === 3">已接收</span>
                    <span v-if="scope.row.orderStatus === 4">已入场</span>
                    <span v-if="scope.row.orderStatus === 5">已出库</span>
                    <span v-if="scope.row.orderStatus === 6">已结算</span>
                    <span v-if="scope.row.orderStatus === 7">结算</span>
                    <span v-if="scope.row.orderStatus === 8">订单异常</span>
                </template>
            </el-table-column>
            <el-table-column
            label="操作">
            <template slot-scope="scope">
                <span @click="OrderListDetails (scope.row.id)" class="ChaKan">查看</span>
                <span @click="DeleteOrderList (scope.row.id)" class="ChaKan">删除</span>
            </template>
        </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { getHistoryOrderList, getAllOrderList, getDetails, DeleteOrderList } from '@/api/order'
export default {
  data () {
    return {
      // 判定当前所要查询的订单状态,默认1为未接单,2为等待取回列表,3，4，5，6为等待发放残值，7已完成，8异常列表
      orderStatus: 1,
      tableData: []
    }
  },
  methods: {
    // 未接单
    async unprocessed () {
      this.orderStatus = 1
      let data = {
        page: 1,
        rows: 10,
        orderStatus: 1,
        orderType: 2
      }
      const response = await getHistoryOrderList(data)
      if (response.data.code === 200) {
        console.log(response.data.data.rows)
        this.tableData = response.data.data.rows
        this.total = response.data.total
      } else {
        console.log('已处理订单列表获取失败')
      }
    },
    // 等待取回
    async wait () {
      this.orderStatus = 2
      let data = {
        page: 1,
        rows: 10,
        orderStatus: 2,
        orderType: 2
      }
      const response = await getHistoryOrderList(data)
      if (response.data.code === 200) {
        console.log(response.data.data.rows)
        this.tableData = response.data.data.rows
        this.total = response.data.total
      } else {
        console.log('已处理订单列表获取失败')
      }
    },
    // 等待发放残值
    async waitgrant () {
      this.orderStatus = 3, 4, 5, 6
      let data = {
        page: 1,
        rows: 10,
        orderStatus: '3,4,5,6',
        orderType: 2
      }
      const response = await getHistoryOrderList(data)
      if (response.data.code === 200) {
        console.log(response.data.data.rows)
        this.tableData = response.data.data.rows
        this.total = response.data.total
      } else {
        console.log('已处理订单列表获取失败')
      }
    },
    // 已完成
    async finished () {
      this.orderStatus = 7
      let data = {
        page: 1,
        rows: 10,
        orderStatus: 7,
        orderType: 2
      }
      const response = await getHistoryOrderList(data)
      if (response.data.code === 200) {
        console.log(response.data.data.rows)
        this.tableData = response.data.data.rows
        this.total = response.data.total
      } else {
        console.log('已处理订单列表获取失败')
      }
    },
    // 异常
    async abnormal () {
      this.orderStatus = 8
      let data = {
        page: 1,
        rows: 10,
        orderStatus: 8,
        orderType: 2
      }
      const response = await getHistoryOrderList(data)
      if (response.data.code === 200) {
        console.log(response.data.data.rows)
        this.tableData = response.data.data.rows
        this.total = response.data.total
      } else {
        console.log('异常订单列表获取失败')
      }
    },
    // 全部订单
    async allOrderList () {
      // alert(111)
      let data = {
        page: 1,
        rows: 10,
        orderType: 2
      }
      const response = await getAllOrderList(data)
      if (response.data.code === 200) {
        console.log(response.data.data.rows)
        this.tableData = response.data.data.rows
        this.total = response.data.total
      } else {
        console.log('全部订单列表获取失败')
      }
    },
    // 查看详情
    async OrderListDetails (id) {
      // 之所以用query是因为params传参一刷新就没有了，query就不会
      // 这个路径是要把父级加上的
      this.$router.push({path: '/orderDetails', query: {id: id}})
    },
    // 删除订单
    async DeleteOrderList (id) {
      let data = {
        id: id
      }
      const response = await DeleteOrderList(data)
      if (response.data.code === 200) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.$router.push('/emptyPage')
      } else {
        this.$message.error('删除失败')
      }
    }
  },
  mounted () {
    //   alert(222)
    this.allOrderList()
  }
}
</script>
<style>
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
    /* .el-main{
        background: #fff;
    } */
</style>
