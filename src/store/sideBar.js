import { getSideBar } from '@/api/goods'
export default {
    namespaced: true,
    state: {
        sideBarList: []
    },
    mutations: {
        setSideBarList(state, payLoad) {
            state.sideBarList = payLoad
        }
    },
    actions: {
        async getSideBar({ commit }, type) {
            let resp = await getSideBar(type)
            commit('setSideBarList',resp)
        }
    }
}