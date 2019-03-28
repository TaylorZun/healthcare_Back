/*
 * @Description: 用户管理相关的
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2018-10-20 22:18:49
 * @LastEditTime: 2019-03-27 08:25:16
 */

import request from '@/utils/request';
import { stringify } from 'qs'

export async function queryUser(params) {
  return request(`/api/user/userlist`, {
    method: 'POST',
    body:{
      params
    }
  });
}

export async function removeUser(params) {
  return request('/api/user/removeuser', {
    method:'POST',
    body:{
    params,
      // method: 'delete',
    },
  });
}

export async function addUser(params) {
  return request(`/api/user/adduser`, {
    method: 'POST',
    body:{
      params
    }
  });
}

/**
 * 
 * @param {下面这个更新是正确的  注意在服务端取值时有 post ('params')} params 
 */
export async function updateUser(params) {
  return request(`/api/user/updateuser`,{
    method: 'POST',
    body: {
      params,
    }
  });
}

/**
 * 点击某个用户，显示该用户所有血压值
 */
export async function getbloodpressure(params) {
  return request(`/api/user/blood`, {
    method: 'POST',
    body: {
      params
    }
  });

}

export async function sugardata(params) {
  return request(`/api/user/sugardata`, {
    method: 'POST',
    body:{
      params
    }
  });
}

export async function gettiezi() {
  return  request('/api/user/gettiezi');
}



// export async function updateUser(params) {
//   return request('/api/user/updateuser', {
//     method: 'POST',
//     body: {
//       ...params,
//       method:'update',
//     },
//   });
// }

export async function queryCurrent() {
  return request('/api/currentUser');
}
