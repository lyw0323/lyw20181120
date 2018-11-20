<template>
    <div  class="bjColor">
        <div class="clearFix">
            <div class="fl xinxibox" :model="carForm">
                <p>车辆信息</p>
                <ul >
                    <li>车牌号<el-input  placeholder=""  v-model="carForm.carNumber"></el-input></li>
                    <li>车架号：<el-input  placeholder=""   v-model="carForm.carFrameNumber"></el-input></li>
                    <li>车辆型号：<el-input  placeholder=""  v-model="carForm.carModelNumber"></el-input></li>
                    <li>报案号：<el-input  placeholder=""  v-model="carForm.reportNo"></el-input></li>
                </ul>
            </div>
            <div class="fl xinxibox">
                <p>取件信息</p>
                <ul >
                    <li>取件联系人：<el-input  placeholder="" v-model="carForm.takeCarContacts" ></el-input></li>
                    <li>联系人电话：<el-input  placeholder=""  v-model="carForm.takeCarContactNumber"></el-input></li>
                    <li>取件时间：
                        <div class="block">
                            <el-date-picker
                            type="datetime"
                            v-model="carForm.date"
                            placeholder="选择日期时间"
                            default-time="12:00:00">
                            </el-date-picker>
                        </div>
                    </li>
                    <li>取件地址：
                        <div id="all">
                            <el-input type="text" id="suggestId" name="address_detail" placeholder="地址" v-model="carForm.takeCarAddress" class="input_style"></el-input>
                            <div id="allmap"></div>
                        </div>
                    </li>
                    <li style="margin-top:10px;font-weight:blod;">您当前选择的城市为 <span style="color:#409EFF;">北京</span> ，取车地址只能为北京</li>
                </ul>
            </div>
        </div>
         <div>
            <div style="margin-bottom:10px;margin-top:50px;" class="clearFix">
                <span>配件信息</span>
                <el-button type="primary" round class="fr"  @click="dialogFormVisible = true">+增加配件</el-button>
            </div>
            <el-table
                border
                :data="formData"
                style="width: 100%">
                <el-table-column
                label="配件分类">
                 <template slot-scope="scope">
                    <span v-if="scope.row.fenlei == 1">外饰</span>
                </template>
                </el-table-column>
                <el-table-column
                label="配件名称">
                 <template slot-scope="scope">
                    <span v-if="scope.row.partsType == 1">车外饰及车身结构件</span>
                    <span v-if="scope.row.partsType == 2">车身</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="partsNum"
                label="配件编号">
                </el-table-column>
                <el-table-column
                prop="remark"
                label="备注">
                </el-table-column>
                <el-table-column
                prop=""
                label="配件照片">
                </el-table-column>
                <el-table-column
                label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="primary"
                        icon="el-icon-delete"
                        plain @click=" Delete(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 增加配件的弹窗 -->
        <el-dialog title="配件信息" :visible.sync="dialogFormVisible" class="dialogTan">
            <el-form :model="form"  >
                <el-form-item label="配件分类" >
                    <el-select v-model="form.fenlei" placeholder="请选择配件分类">
                        <el-option label="外饰" value="1" ></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="配件名称" >
                    <el-select v-model="form.partsType" placeholder="请选择配件名称">
                        <el-option label="车外饰及车身结构件" value="1" ></el-option>
                        <el-option label="车身" value="2"></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="配件编号" >
                    <el-input v-model="form.partsNum" ></el-input>
                </el-form-item>
                <el-form-item label="备注" >
                    <el-input v-model="form.remark" ></el-input>
                </el-form-item>
                <el-form-item label="配件照片" style="width:300px;">

                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm()" >确 定</el-button>
            </div>
        </el-dialog>
        <div>
            <el-button type="primary" style="margin-top:30px;"  @click="submit()">提交</el-button>
            <el-button type="primary" style="margin-top:30px;" @click="$router.push('/order')">返回</el-button>
        </div>
    </div>
</template>
<script>
import { addAllOrder } from '@/api/order'
export default {
  data () {
    return {
        carForm: [],
        date: '',
        form: {
            partsType: '', //配件类型
            attachmentId: '', // 图片存储id
            partsNum: '', // 配件编号
            remark: '', // 备注
            fenlei: '' //配件分类
        },
        formData: [],
        userlocation: {lng: '', lat: ''},
        dialogFormVisible: false,
        fileList: [],
        ss:''
    }
  },
  methods: {
    // 提交
    async submit () {
      this.carForm.carScrapOrderAutopartsList = this.formData
      console.log(this.formData)
      let data = {
        reportNo: this.carForm.reportNo,
        carNumber: this.carForm.carNumber,
        carFrameNumber: this.carForm.carFrameNumber,
        carModelNumber: this.carForm.carModelNumber,
        orderType: 2,
        takeCarContacts: this.carForm.takeCarContacts,
        takeCarContactNumber: this.carForm.takeCarContactNumber,
        takeCarTime: this.carForm.date,
        takeCarAddress: this.carForm.takeCarAddress
        // carScrapOrderAutopartsList: [pictures[1, attachmentId], 1, partsNum, remark]
      }
      const response = await addAllOrder(data)
      if (response.data.code === 200) {
            this.$message({
                message: '新增成功',
                type: 'success'
            })
            this.$router.push('/order')
      } else {
        console.log('已处理订单列表获取失败')
      }
    },
    // 弹窗确定 增加列表
    async confirm () {
      this.dialogFormVisible = false
      // 自定义id
      this.form.id = this.formData.length + 1
      this.formData.push(this.form)
      this.ss = {
        pictures:[{
            pritureType: '1',
            attachmentId:[{}]
        }],
        partsType:this.formData.partsType,
        partsNum:this.formData.partsNum,
        remark:this.formData.remark
        }
      console.log(this.formData.partsType)
      console.log(this.ss)
      // 将input中的数据重置
      this.form = {}
    },
    // 弹窗删除
    async Delete (id) {
      var obj = this
      this.formData.some(function (item, index) {
        if (item.id == id) {
          obj.formData.splice(index, 1)
          obj.$message({
            message: '删除成功',
            type: 'success'
          })
          return true
        }
      })
    }
  },
  mounted () {
    // 百度地图
    this.$nextTick(function () {
      var th = this
      // 创建Map实例
      var map = new BMap.Map('allmap')
      // 初始化地图,设置中心点坐标，
      var point = new BMap.Point(121.160724, 31.173277) // 创建点坐标，汉得公司的经纬度坐标
      map.centerAndZoom(point, 15)
      map.enableScrollWheelZoom()
      var ac = new BMap.Autocomplete( // 建立一个自动完成的对象
        {
          'input': 'suggestId',
          'location': map
        })
      var myValue
      ac.addEventListener('onconfirm', function (e) { // 鼠标点击下拉列表后的事件
        var _value = e.item.value
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business
        this.takeCarAddress = myValue
        setPlace()
      })

      function setPlace () {
        map.clearOverlays() // 清除地图上所有覆盖物
        function myFun () {
          th.userlocation = local.getResults().getPoi(0).point // 获取第一个智能搜索的结果
          map.centerAndZoom(th.userlocation, 18)
          map.addOverlay(new BMap.Marker(th.userlocation)) // 添加标注
        }

        var local = new BMap.LocalSearch(map, { // 智能搜索
          onSearchComplete: myFun
        })
        local.search(myValue)

        // 测试输出坐标（指的是输入框最后确定地点的经纬度）
        map.addEventListener('click', function (e) {
          // 经度
          console.log(th.userlocation.lng)
          // 维度
          console.log(th.userlocation.lat)
        })
      }
    })
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
    .xinxibox .el-input{
        display: inline-block;
    }
    /* .el-main{
        background: #fff;
    } */
    #allmap{
        width: 350px;
        height: 200px;
        font-family: "微软雅黑";
        border:1px solid green;
    }
    .input_style{
        margin-bottom:10px;
    }
    .dialogTan .el-input{
        width: 300px;
    }
    .el-form-item{
        display: inline-block
    }
    .el-dialog{
        height: 500px;
        overflow-y:auto;
    }
</style>
