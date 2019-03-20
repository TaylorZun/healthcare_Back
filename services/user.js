import request from '@/utils/request';
import { stringify } from 'qs'

export async function queryUser(params) {
  console.log(params)
  return request(`/api/user/userlist?${stringify(params)}`);
}

export async function removeUser(params) {
  return request('/api/user/removeuser', {
    method:'POST',
    body:{
      ...params,
      method: 'delete',
    },
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


export async function getbloodpressure() {
  return request(`/api/user/blood`);

}

export async function sugardata() {
  return request('/api/user/sugardata');
}

export async function gettiezi() {
  return  request('api/user/gettiezi');
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
