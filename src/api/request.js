import Axios from 'axios'
const baseUrl = 'https://mallapi.duyiedu.com/goods/'
const appkey = ''
const ins = Axios.create({
    baseUrl,
    params:{
        appkey
    }
})
ins.interceptors.response.use(function(resp){
    return resp.data
})