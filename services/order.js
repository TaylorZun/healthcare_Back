import request from '@/utils/request';
import { stringify } from 'qs'

export async function orderlist() {
  return request(`/api/order/orderlist`);
}