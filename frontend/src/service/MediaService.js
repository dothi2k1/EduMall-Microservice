import { Api } from "@/utils/api/api"
import axios from "axios"

export const uploads = async (data) => {
          try {
                    let res=await axios.post('https://cloud.tyzuu.com/upload/images', data)
                    return res;
          }
          catch (err) {
                    return err;
          }
}