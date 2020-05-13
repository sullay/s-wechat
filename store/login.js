import api from '../service'
// import md5 from 'md5'
const actions = {
  async login ({ commit }, { userName, password }) {
    const result = await api.login.login({ userName, password })
    return result
  }
}
export default {
  actions
}
