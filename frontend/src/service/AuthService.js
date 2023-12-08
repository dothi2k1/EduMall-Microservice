import { Api } from "@/utils/api/api";
import axiosInstance from "@/utils/axios";
import axios from "axios";

export const login = async (body) => {
          let res;
          try {
                    res = await axios.post("http://localhost:9000"+Api.auth.login, body);
                    return res;
          } catch (err) {
                    return err.response
                    
          }
}