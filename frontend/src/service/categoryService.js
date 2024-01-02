import { Api } from "@/utils/api/api"
import axiosInstance from "@/utils/axios"

export const getAllCate = async (page, name) => {
          try {
                    let res = await axiosInstance.get(Api.category.getAll + `?page=${page}&name=${name}`);
                    return res;
          }
          catch (err) {
                    return err;
          }
}