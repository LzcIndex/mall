import request from './request'

export async function getSideBar(type){
    return await request.get('/getsidebar',{
        params:{
            type
        }
    }) 
}