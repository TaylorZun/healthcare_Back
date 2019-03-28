/*
 * @Description: 查询医生管理接口
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-02-24 00:51:47
 * @LastEditTime: 2019-03-27 07:32:46
 */

import request from '@/utils/request';
import { stringify } from 'qs'


/**
 * 获取医生列表
 */
export async function queryDoctor() {
  return request(`/api/zixun/getdoctorlist`);
}

/**
 * 
 * @param {*} params 搜索专用
 */
export async function queryDoctor1(params){
  return request(`/api/zixun/querydoctor`,{
    method:'POST',
    body: {
      params
    }
  });

}

export async function addDoctor(params) {
  return request(`/api/zixun/adddoctor`, {
    method: 'POST',
    body:{
      params
    }
  });
}

/**
 * 获取业务列表
 */
export async function fetchbusiness() {
  return request(`/api/zixun/getbusiness`);
}

export async function updatebusiness(params) {
  return request(`/api/zixun/updatebusiness`, {
    method: 'POST',
    body:{
      params
    }
  });
}
