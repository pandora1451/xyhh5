var INTERFACE_URL = process.env.VUE_APP_BASE_URL;
var HOST_URL='';
let api = {
    interFace: {
        getWechatCode:INTERFACE_URL+'/customer/getWechatInfoByCode',//微信授权
    },
}

export { api }

