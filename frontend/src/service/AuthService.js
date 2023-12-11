import { Api } from '@/utils/api/api';
import axiosInstance from '@/utils/axios';

export const login = async body => {
  let res;
  try {
    res = await axiosInstance.post(Api.auth.login, body);
    return res;
  } catch (err) {
    return err.response;
  }
};
