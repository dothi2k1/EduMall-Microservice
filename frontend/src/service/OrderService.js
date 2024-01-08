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

export const updatecart = async (id,body) => {
  try {
    let res = await axiosInstance.post(Api.order.updateInfo+id,body);
    return res;
  } catch (err) {
    return err;
  }
};
export const createOrder = async (body) => {
  try {
    let res = await axiosInstance.post(Api.order.create,body);
    return res;
  } catch (err) {
    return err;
  }
};
export const removeItem = async (id) => {
  try {
    let res = await axiosInstance.delete(Api.order.removeItem+id);
    return res;
  } catch (err) {
    return err;
  }
};