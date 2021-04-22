import { getSideBar, getGoodList } from '@/api/goods'
export default {
    namespaced: true,
    state: {
        sideBarList: [],
        goodsList: [],
        isLoading: false
    },
    mutations: {
        setSideBarList(state, payLoad) {
            state.sideBarList = payLoad
        },
        setIsLoading(state, payLoad) {
            state.isLoading = payLoad
        },
        setGoodsList(state, payLoad) {
            state.goodsList = payLoad
        }
    },
    actions: {
        //获取二级菜单侧边栏
        async getSideBar({ commit }, type) {
            commit('setIsLoading', true)
            let sideBarResp = await getSideBar(type)
            let goodsListResp = await getGoodList(sideBarResp[0],1)
            commit('setSideBarList', sideBarResp)
            commit('setGoodsList', goodsListResp.list)
            commit('setIsLoading', false)
        },
        //获取商品列表
        async getGoodList({ commit }, option) {
            let { type, page, sort = 'all', size = 10 } = option
            commit('setIsLoading', true)
            let resp = await getGoodList(type, page, sort, size)
            commit('setGoodsList', resp.list)
            commit('setIsLoading', false)
        }
    }
}