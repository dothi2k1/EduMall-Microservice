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
export const getAll = async (page,sort) => {
  try {
    let res = await axiosInstance.get(Api.homepage.course + `?page=${page}&sort=${sort}`);
    return res;
  } catch (err) {
    return err;
  }
};
export const getById = async (id) => {
  try {
    let res = await axiosInstance.get(Api.course.getById + id);
    return res;
  } catch (err) {
    return err;
  }
};

export const getImage = async (body) => {
  try {
    let res = await axiosInstance.post(Api.course.getImage, body);
    return res
  } catch (err)
  {
    return err
  }
}