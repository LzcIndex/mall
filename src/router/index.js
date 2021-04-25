import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

VueRouter.prototype.back = false
VueRouter.prototype.goBack = function(){
    this.back = true
    this.go(-1)
}


Vue.use(VueRouter)

const router  = new VueRouter({
    routes,
    mode:'history'
})

export default router