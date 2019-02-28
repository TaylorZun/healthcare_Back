import request from '@/utils/request';
import { stringify } from 'qs'

export async function queryDoctor() {
  return request(`/api/zixun/getdoctorlist`);
}

export async function queryDoctor1(params){
  return request(`/api/zixun/getdoctorlist1?${stringify(params)}`);

}

