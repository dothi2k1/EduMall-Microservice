import { Api } from '@/utils/api/api';
import axiosInstance from '@/utils/axios';

export const getCart = async () => {
  try {
    let res = await axiosInstance.get(Api.order.getCart + JSON.parse(localStorage.getItem('token')).id);
    return res.data;
  } catch (err) {
    return err;
  }
};
