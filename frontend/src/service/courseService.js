import { Api } from "@/utils/api/api";
import axiosInstance from "@/utils/axios";

export const getCourse=axiosInstance.post(Api.homepage.course)