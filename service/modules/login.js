import axios from '../../plugins/axios'
const login = options => axios.post('/login', options)
export default {
  login
}
