import Vue from 'vue'
import Vuex from 'vuex'
import sideBar from './sideBar'
Vue.use(Vuex)

const store  =  new Vuex.Store({
    strict:true,
    modules:{
        sideBar
    }
})

export default store