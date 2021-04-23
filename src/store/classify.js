import { getSideBar, getGoodList } from '@/api/goods'
export default {
    namespaced: true,
    state: {
        sideBarList: [],
        goodsList: [],
        goosTotal:0,
        isLoading: false,
        currentSideBar: '',//目前选中的一级导航
    },
    getters:{
        isFinished(state){
            return state.goodsList.length >= state.goosTotal
        }
    },
    mutations: {
        setSideBarList(state, payLoad) {
            state.sideBarList = payLoad
        },
        setIsLoading(state, payLoad) {
            state.isLoading = payLoad
        },
        //重置商品列表
        resetGoodsList(state){
            state.goodsList = []
        },
        setGoodsList(state, payLoad) {
            state.goodsList =  state.goodsList.concat(payLoad)
        },
        setGoosTotal(state, payLoad) {
            state.goosTotal = payLoad
        },
        setCurrentSideBar(state, payLoad) {
            state.currentSideBar = payLoad
        }
    },
    actions: {
        //获取二级菜单侧边栏
        async getSideBar({ commit }, type) {
            commit('setIsLoading', true)
            let sideBarResp = await getSideBar(type)
            let goodsListResp = await getGoodList(sideBarResp[0], 1)
            commit('setSideBarList', sideBarResp)
            commit('setCurrentSideBar', sideBarResp[0])
            commit('setGoodsList', goodsListResp.list)
            commit('setGoosTotal', goodsListResp.total)
            commit('setIsLoading', false)
        },
        //获取商品列表
        async getGoodList({ commit, state }, option) {
            let { page, type = state.currentSideBar, sort = 'all', size = 5 } = option
            commit('setIsLoading', true)
            let resp = await getGoodList(type, page, sort, size)
            commit('setGoodsList', resp.list)
            commit('setGoosTotal', resp.total)
            option.cb &&  option.cb()
            commit('setIsLoading', false)
        }
    }
}