import request from '@/utils/request.js'
// 这个文件暂时无用


export async function getUsers(params) {
    return request('/api/zixun/getdoctorlist', {
        method: 'POST',
        body: params,
    })
}

export async function updateUsers(params) {
    return request('/api/zixun/updateusers', {
      method: 'POST',
      body: {
        ...params,
        method: 'update',
      },
    });
  }
