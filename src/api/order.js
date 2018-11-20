import axios from '@/libs/axiosRequest'
// 旧件回收
export const getHistoryOrderList = (getData) => {
  const data = {
    page: getData.page,
    rows: getData.rows,
    orderStatus: getData.orderStatus,
    orderType: getData.orderType
  }
  return axios.request({
    url: 'carscraporder-web/order',
    data,
    method: 'get'
  })
}
// 旧件回收全部
export const getAllOrderList = (getData) => {
  const data = {
    page: getData.page,
    rows: getData.rows,
    orderType: getData.orderType
  }
  return axios.request({
    url: 'carscraporder-web/order',
    data,
    method: 'get'
  })
}
// 旧件查看详情
export const getDetails = (getData) => {
  return axios.request({
    url: 'carscraporder-web/order/' + getData.id,
    method: 'get'
  })
}
// 旧件删除
export const DeleteOrderList = (getData) => {
  return axios.request({
    url: 'carscraporder-web/order/' + getData.id,
    method: 'get'
  })
}
// 旧件增加
export const addAllOrder = (getData) => {
  const data = {
    reportNo: getData.reportNo,
    carNumber: getData.carNumber,
    carFrameNumber: getData.carFrameNumber,
    carModelNumber: getData.carModelNumber,
    orderType: getData.orderType,
    takeCarContacts: getData.takeCarContacts,
    takeCarContactNumber: getData.takeCarContactNumber,
    takeCarTime: getData.takeCarTime,
    takeCarAddress: getData.takeCarAddress,
    // carScrapOrderAutopartsList: {pictures: [pritureType, attachmentId], partsType, partsNum, remark}

  }
  return axios.request({
    url: 'carscraporder-web/order',
    data,
    method: 'post'
  })
}
// 旧件删除
// export const DeleteOrderList = (getData) => {
//   return axios.request({
//     url: 'carscraporder-web/order/' + getData.id,
//     method: 'get'
//   })
// }
// 配件订单
export const getHistoryautoparts = (getData) => {
  const data = {
    page: getData.page,
    rows: getData.rows,
    orderStatus: getData.orderStatus,
    orderType: getData.orderType
  }
  return axios.request({
    url: 'carscraporder-web/autoparts',
    data,
    method: 'get'
  })
}
// 配件订单全部
export const getAllautoparts = (getData) => {
  const data = {
    page: getData.page,
    rows: getData.rows,
    orderType: getData.orderType
  }
  return axios.request({
    url: 'carscraporder-web/autoparts',
    data,
    method: 'get'
  })
}
// 配件查看详情
export const getautopartsDetails = (getData) => {
  return axios.request({
    url: 'carscraporder-web/autoparts/' + getData.id + '/detail',
    method: 'get'
  })
}
