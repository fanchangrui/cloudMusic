import { request,get } from '../index'


/**
 * 用户手机登录
 * @param 
 * @returns 
 */
function cellphoneLogin(params: { phone: string, password: string }) {
  return request({ url: "/login/cellphone", method: 'get', params });
}

function qrKey(){
  return get('/login/qr/key',{timestamp:new Date()})
}
function qrCreate(key:string){
  return get('/login/qr/create',{key,qrimg:true,timestamp:new Date()})
}
function qrCheck(key:string){
  return get('/login/qr/check',{key,timestamp:new Date()})
}
/**
 * 获取用户详情
 * @param {String} uid
 */
function getUserDetails(uid: string) {
  return request({ url: '/user/detail', method: 'get', params: { uid } })
}


/**
 * 导出所有api
 */
export {
  getUserDetails,
  cellphoneLogin,
  qrKey,
  qrCreate,
  qrCheck
}