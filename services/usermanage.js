import request from '@/utils/request.js'

export async function getUsers(params) {
    return request('/api/zixun/getdoctorlist', {
        method: 'POST',
        body: params,
    })
}