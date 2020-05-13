<template>
  <div>
    <nuxt />
  </div>
</template>
<script>
import axios from '../plugins/axios'
export default {
  created () {
    axios.interceptors.response.use(
      (response) => {
        console.log(response.config.url, response)
        // 未登录/登录过期
        if (response.data.code === 401) {
          if (process.client) {
            localStorage.setItem('userInfo', '')
          }
          this.$router.push('/login')
        }
        if (response.data.code !== 200) {
          this.$message.error(response.data.msg)
        }
        return response
      },
      (error) => {
        // Do something with response error
        return Promise.reject(error)
      }
    )
  }
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
