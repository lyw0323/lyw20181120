import axios from '@/libs/axiosRequest'
// 调用登陆之后,后台在浏览器种了cookie,有名也有值
export const login = ({name = 'superadmin', password = 'admin1', rememberMe = true}) => {
  const data = {
    username: name,
    password: password,
    rememberMe: rememberMe
  }
  return axios.request({
    url: '/carscraporder-web/user/doLogin',
    data,
    method: 'post'
  })
}

export const getadvertisement = () => {
  return axios.request({
    url: '/carscraporder-web/advertisement',
    method: 'get'
  })
}
