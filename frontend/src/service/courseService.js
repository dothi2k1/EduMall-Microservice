import { Api } from '@/utils/api/api';
import axiosInstance from '@/utils/axios';

export const getHomeCourse = async () => {
  try {
    let res = await axiosInstance.get(Api.homepage.course + '?page=0&sort=id');
    return res;
  } catch (err) {
    return err;
  }
};
