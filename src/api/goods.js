import request from './request'

export async function getSideBar(type) {
    return await request.get('/getsidebar', {
        params: {
            type
        }
    })
}

export async function getGoodList(type, page, sort = 'all', size = 10) {
    return await request.get('/getGoodsList', {
        params: {
            type,
            size,
            sort,
            page
        }
    })
}