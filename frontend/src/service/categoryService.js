import { Api } from "@/utils/api/api"
import axiosInstance from "@/utils/axios"

export const getAllCate = (page, sort) => {
          try {
                    let res = axiosInstance.post(Api.category.getAll + `?page=${page}&sort=${sort}`);
                    return res;
          }
          catch (err) {
                    return err;
          }
}