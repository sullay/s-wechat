import CryptoJS from 'crypto-js'
import Vue from 'vue'
// des加密
const encryptDes = (message, key = require('../config/index').SECRET) => {
  const keyHex = CryptoJS.enc.Utf8.parse(key)
  const encrypted = CryptoJS.DES.encrypt(JSON.stringify(message), keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}
// 解密
const decryptDes = (ciphertext, key = require('../config/index').SECRET) => {
  const keyHex = CryptoJS.enc.Utf8.parse(key)
  // direct decrypt ciphertext
  if (!ciphertext) {
    return ''
  }
  const decrypted = CryptoJS.DES.decrypt({
    ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
  }, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
}

const install = function (Vue, options) {
  Vue.prototype.$encDes = encryptDes
  Vue.prototype.$decDes = decryptDes
}

Vue.use(install)

export default {
  decryptDes
}
