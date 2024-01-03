import axiosInstance from "@/utils/axios"

export const getListRoute = async (id) => {
          try {
                    let res = await axiosInstance("api/sv2/route/get-list-route-detail?id=" + id);
                    return res
          } catch (err) {
                    return err
          }
}