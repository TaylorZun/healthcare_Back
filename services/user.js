import request from '@/utils/request';
import { stringify } from 'qs'

export async function queryUser(params) {
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

export async function updateUser(params) {
  return request('/api/user/updateuser', {
    method: 'POST',
    body: {
      ...params,
      method:'update',
    },
  });
}

export async function queryCurrent() {
  return request('/api/currentUser');
}
