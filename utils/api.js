var INTERFACE_URL = process.env.VUE_APP_BASE_URL;
console.log('INTERFACE_URL',INTERFACE_URL)
var HOST_URL='';
let root = {
    interFace: {
        getWechatCode:INTERFACE_URL+'/customer/getWechatInfoByCode',//微信授权
        getValidateCode:INTERFACE_URL+'/customer/send_validate_code',//获取手机验证码
        login:INTERFACE_URL+'/small/h5/login',//登录
        regist:INTERFACE_URL+'/small/h5/regist'//申请入驻
    },
}

export {root}