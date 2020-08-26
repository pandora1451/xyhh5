import {root } from "./const"
import { CID } from './const'
var INTERFACE_URL = process.env.VUE_APP_BASE_URL;
console.log('INTERFACE_URL',INTERFACE_URL)
export function getValidateCode(openId) {
    return get(`${API_PREFIX}/book/home/v2`, { openId })
}