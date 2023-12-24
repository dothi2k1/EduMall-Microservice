import { Api } from "@/utils/api/api"
import axiosInstance from "@/utils/axios"

export const getAllCate = (page, name) => {
          try {
                    let res = axiosInstance.get(Api.category.getAll + `?page=${page}&name=${name}`);
                    return res;
          }
          catch (err) {
                    return err;
          }
}