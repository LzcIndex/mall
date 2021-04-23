import { getSideBar, getGoodList } from '@/api/goods'
import Vue from 'vue'
export default {
    namespaced: true,
    state: {
        sideBarList: [],
        goodsList: [],
        goosTotal: 0,
        isLoading: false,
        currentSideBar: '',//目前选中的一级导航
        counterMap: {} //物品数量统计
    },
    getters: {
        isFinished(state) {
            console.log(state.goodsList.length,state.goosTotal)
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
        resetGoodsList(state) {
            state.goodsList = []
        },
        setGoodsList(state, payLoad) {
            state.goodsList = state.goodsList.concat(payLoad)
        },
        setGoosTotal(state, payLoad) {
            state.goosTotal = payLoad
        },
        setCurrentSideBar(state, payLoad) {
            state.currentSideBar = payLoad
        },
        setCounterMap(state,payLoad){
            state.counterMap = payLoad
        },
        storageChange(state, { id, value }) {
            if (state.counterMap[id]) {
                if (value === -1 && state.counterMap[id] === 1) {
                    Vue.delete(state.counterMap, id)
                } else {
                    Vue.set(state.counterMap, id, state.counterMap[id] + value);
                }
            } else {
                Vue.set(state.counterMap, id, 1);
            }
            localStorage.setItem('goods', JSON.stringify(state.counterMap));

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
            option.cb && option.cb()
            commit('setIsLoading', false)
        }
    }
}