import Axios from 'axios'
const baseURL = 'https://mallapi.duyiedu.com/goods/'
const appkey = 'dd_1597654682810'
const ins = Axios.create({
    baseURL,
    params:{
        appkey
    }
})
ins.interceptors.response.use(function(resp){
    return resp.data
})

export default ins