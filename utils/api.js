var INTERFACE_URL = process.env.VUE_APP_BASE_URL;
console.log('INTERFACE_URL',INTERFACE_URL)
var HOST_URL='';
let root = {
    interFace: {
        getWechatCode:INTERFACE_URL+'/customer/getWechatInfoByCode',//微信授权
    },
}

export {root}