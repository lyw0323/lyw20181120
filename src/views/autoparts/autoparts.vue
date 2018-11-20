<template>
    <div  class="bjColor">
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
            style="width: 100%;font-size:12px;">
            <el-table-column
                label="配件分类" width="100px">
                <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
                <template slot-scope="scope">
                <span>{{ scope.row.partsCaregoryName }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="配件名称">
                <template slot-scope="scope">
                <span>{{ scope.row.partsTypeName }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="车型" width="180px">
                <template slot-scope="scope">
                <span>{{ scope.row.carModelNumberName }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="车架号">
                <template slot-scope="scope">
                <span>{{ scope.row.carFrameNumber }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="车牌号" width="100px">
                <template slot-scope="scope">
                <span>{{ scope.row.carNumber }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="残值价格"  width="80">
                <template slot-scope="scope">
                <span>{{ scope.row.amount }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="订单时间">
                <template slot-scope="scope">
                <span>{{ scope.row.orderTime }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="报案号">
                <template slot-scope="scope">
                <span>{{ scope.row.orderNo }}</span>
                </template>
            </el-table-column>
            <el-table-column
            label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.orderStatus === 1">未接单</span>
                    <span v-if="scope.row.orderStatus === 2">已接单</span>
                    <span v-if="scope.row.orderStatus === 3">已接收</span>
                    <span v-if="scope.row.orderStatus === 4">无法接收</span>
                    <span v-if="scope.row.orderStatus === 5">配件入库</span>
                    <span v-if="scope.row.orderStatus === 6">配件出库</span>
                    <span v-if="scope.row.orderStatus === 7">结算</span>
                    <span v-if="scope.row.orderStatus === 8">结束</span>
                    <span v-if="scope.row.orderStatus === 8">配件异常</span>
                </template>
            </el-table-column>
            <el-table-column
            label="操作"
            >
            <template slot-scope="scope">
              <span @click="OrderListDetails (scope.row.id)" class="ChaKan">查看</span>
            </template>
        </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { getHistoryautoparts, getAllautoparts, getautopartsDetails} from '@/api/order'
// import { getHistoryautoparts , getAllautoparts , getautopartsDetails} from '@/api/order'
export default {
  data () {
    return {
      // 判定当前所要查询的订单状态,默认1:未接单 2：已接单 3:已接收 4：已入场 5：已出库 6：已结算 7结算 8：订单异常
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
      const response = await getHistoryautoparts(data)
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
      const response = await getHistoryautoparts(data)
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
      const response = await getHistoryautoparts(data)
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
      const response = await getHistoryautoparts(data)
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
      const response = await getHistoryautoparts(data)
      if (response.data.code === 200) {
        console.log(response.data.data.rows)
        this.tableData = response.data.data.rows
        this.total = response.data.total
      } else {
        console.log('已处理订单列表获取失败')
      }
    },
    // 全部订单
    async allOrderList () {
      let data = {
        page: 1,
        rows: 10,
        orderType: 2
      }
      const response = await getAllautoparts(data)
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
      this.$router.push({path: '/autopartsDetails', query: {id: id}})
    }
  },
  mounted () {
    this.allOrderList()
  }
}
</script>
<style>
/* .el-main{
        background: #fff;
    } */
</style>
